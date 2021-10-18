# ignews - Next.js
![2021-10-18 09 38 27 localhost 7b1de49c43b2](https://user-images.githubusercontent.com/71939413/137733606-8efd900a-f8c7-44f8-89be-9d530364e3ac.jpg)
## 📖 Sobre o projeto
O projeto ignews é um blog onde os usuários podem ter acesso ao conteúdo de cada postagem de acordo com o status de sua assinatura.
- O blog possui um sistema de assinatura integrado com o STRIPE, e após o usuário realizar o pagamento, sua inscrição estará ativa e pronta para visualizar o conteúdo completo de todo o blog. Caso o usuário não deseje optar pela assinatura, ele terá acesso apenas a um preview das postagens. 
- Todos os dados necessários para se fazer verificações de assinaturas ou dados dos usuários, estão salvos no banco de dados FaunaDB.
- As postagens são feitas pelo painel do Prismic CMS e integradas via API diretamente pelo front-end.

A aplicação foi desenvolvida utilizando o framework NextJS aplicando conceitos como consumo de API externas, API Root, Server Side Rendering (SSR), Static Site Generation (SSG), NextAuth para autenticação com Github

O projeto foi desenvolvido como pratica das aulas do modulo 03 do curso Ignite da Rocketseat

## 🖥️ Tecnologias
Tecnologias e ferramentas utilizadas no desenvolvimento do projeto:

- ReactJS
- TypeScript
- NextJS
- Next-Auth
- Stripe
- FaunaDB
- Prismic CMS
- SASS

## ✨ Bonus feature: Deploy na Vercel
  Acesse agora mesmo essa aplicação! [site: ignews](https://ignews-matheus-w-a.vercel.app)
 
- A melhor maneira para colocar uma aplicação Next.js em produção é usar a plataforma da [Vercel](https://vercel.com/), criadores do próprio Next.js. A Vercel é uma plataforma de hospedagem para sites estáticos, aplicativos híbridos e funções serveless.

## 🚀 Como executar
- Clone o repositório
- Instale as dependências com ```yarn```
- Inicie o servidor com ```yarn start```
- Agora é só você acessar http://localhost:3000 do seu navegador.
