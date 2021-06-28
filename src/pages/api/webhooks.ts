import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log('evento recebido')

  res.status(200).json({ ok: true })
}


/* webhooks
  são endpoints que disponibilizamos em nosso app para que app externos
  consiguam se comunicar com nossa app. No caso do stripe, se um costume deixar 
  de pagar, ou se o cartao ficar invalido, o stripe é quem vai saber disso e 
  avisar nossa app. Então recebemos a info e criamos a regra de negocio para ela.
*/