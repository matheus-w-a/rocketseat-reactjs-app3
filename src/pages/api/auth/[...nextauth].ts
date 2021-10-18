import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],
  callbacks: {  //callbacks sao funcao que sao executadas automaticamente pelo next-auth assim que acontece alguma acao, por exemplo signIn()
    async session(session) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              )
              ,
              q.Match(
                q.Index('subscription_by_status'),
                'active'
              )
            ])
          )
        )

        return { 
          ...session,
          activeSubscription: userActiveSubscription
        }

      } catch (error) {
          return { 
          ...session,
          activeSubscription: null
        }
      }


    },
    
    async signIn(user, account, profile) { //essa funcao acontece de forma automatica, ela só esta declarada aqui pq precisamos acrescentar algumas acoes pra quando o usuario da singIn
      const { email } = user;

      try {
        await fauna.query(
          q.If( //se
            q.Not( //nao
              q.Exists( //existir
                q.Match( // (match == where)
                  q.Index('user_by_email'), // nessa lista
                  q.Casefold(user.email) // um usuario com esse email (casefold - transforma tudo em lowercase)
                )
              )
            ),
            q.Create( // entao cria 
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get( // mas se existir, devolve o usuario que bate com
              q.Match(
                q.Index('user_by_email'), // esse index
                q.Casefold(user.email)
              )
            )          
          )         
        )
        return true
      } catch {
        return false
      }  
    }
  }
})

/* Next Auth - p

 index - indices em Banco de dados

  DB sem index - o DB é obrigado a varrer a tabela inteira até encontrar oq quer
  [
    { "id":1, "name":"matheus", "email": "matheus@gmail.com"},
    { "id":2, "name":"maria", "email": "maria@gmail.com"},
    { "id":3, "name":"joao", "email": "joao@gmail.com"} 
  ]

  DB com index - user_by_email => o DB cria uma outra tabala igual, mas com index, oq facilita e melhora muito a busca
  [
    {
      "matheus@gmail.com":  { "id":1, "name":"matheus", "email": "matheus@gmail.com"},
      "maria@gmail.com": { "id":2, "name":"maria", "email": "maria@gmail.com"},
      "joao@gmail.com":  { "id":3, "name":"joao", "email": "joao@gmail.com"} 
    }
  ]
  */