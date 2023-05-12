import Head from 'next/head'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'

export default function Layout({children}) {
  return (
    <>
      <Head>
        <title>Fio</title>
        <meta name="description" content="fio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
          {children}
        <Footer />
      </main>
    </>
  )
}
