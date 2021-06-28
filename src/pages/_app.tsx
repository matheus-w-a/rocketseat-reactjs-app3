import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Provider as NextAuthProvider } from 'next-auth/client'

//.module.scss só vai interfir no arquivo que importou ele
import '../styles/global.scss' 

function MyApp({ Component, pageProps } : AppProps) {  
  return ( 
  <NextAuthProvider session={pageProps.session}>
    <Header />
    <Component {...pageProps} />
  </NextAuthProvider>
  )
}

export default MyApp
