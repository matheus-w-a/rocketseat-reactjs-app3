import { GetStaticProps } from 'next'
import Head from 'next/head' //componete que é anexado ao head do _document
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product } : HomeProps) {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>News about <br/> the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} mouth</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1J7RqKEEOrYiBlEAMVX5baYk', { // pega o preco do produto
    expand: ['product'] // pega as info do produto  
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format((price.unit_amount / 100))
  }
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 * 7
  }
}

