import { Client } from 'faunadb'

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY
})

/* fauna é feito principalmente para app serveless pois
utiliza conexao HTTP, entao nao é custoso para se conectar ao DB
toda vez que subir o server (serveless)


PostgreSQL, MongoDB ...
não são utilizados em serveless pois teria que criar conexoes toda vez que subir o server
o que é muito custoso
*/

