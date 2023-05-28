import '@/styles/globals.css';
import Head from 'next/head';
import { DM_Sans } from 'next/font/google';
import { Logo } from '@/components/Logo';
import { Menubar } from '@/components/Menubar';


const DM_SANS = DM_Sans({ weight: '400', subsets: ['latin'] })

const App = ({ Component, pageProps }) => {

  const menu_items = [
    { title: 'Home', path: '/' },
    { title: 'Dashboard', path: '/dashboard' }
  ]

  return (
    <>
      <Head>
        <title> Travelopia - travellers form </title>
        <meta name="description" content="Travalopia travellers detiails collection form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={DM_SANS.className} >
        <Logo />
        <Menubar list={menu_items} />
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default App;
