import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb'
import { getSession} from "next-auth/client";
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_custumer_id: string;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST'){ // se for post, criar uma sessao do stripe
    const session = await getSession({ req }) //pega qual usuario esta fazendo a requisicao atraves dos cookies. o next-auth armazena as infos nos cookies
    //não se usa useSession pq isso nao é um component react, no backend usasse o getSession
    
    const user = await fauna.query<User>( //busca o usuario no fauna
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )
    let customerId = user.data.stripe_custumer_id

    if(!customerId) { //ve se o usuario já tem cadastro no stripe da app | se nao tiver cria
      const stripeCustomer = await stripe.customers.create({ //precisamos antes de tudo criar um customer no stripe
        email: session.user.email,
        //metadata
      })

      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_custumer_id: stripeCustomer.id //add o id do stripe no fauna
            }
          }
        )
      )   
      customerId = stripeCustomer.id   
    }


    const stripeCheckoutSessions = await stripe.checkout.sessions.create({
      customer: customerId, //esse id é o ID salvo no stripe quando cria um customer | quem que esta comprando esse pacote
      payment_method_types: ['card'], //acc só card
      billing_address_collection: 'required', //obriga a colocar o endereço
      line_items: [ //quais são os itens
        { price: 'price_1IscGdGnYTGoP9s0AgIczhHl', quantity: 1 }, //só tem 1 
      ],
      mode: 'subscription', //pagamento mensal
      allow_promotion_codes: true, //permite que usuarios usem cupons de codigo
      success_url: process.env.STRIPE_SUCCESS_URL, //quando der sucesso onde o usuario vai ser redirecionado
      cancel_url: process.env.STRIPE_CANCEL_URL //quando não der (page home, nesse caso)
    })

    return res.status(200).json({ sessionId: stripeCheckoutSessions.id })
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}