import Head from 'next/head'
import Header from '@/components/base/Header'
import Footer from '@/components/base/Footer'
import { useState, useEffect } from 'react'
import { fb } from '@/utils/chat-fb'
import WhatsappBubble from './WhatsappBubble'


export default function Layout({children}) {
  const [footerData, setFooterData] = useState('');
  const [whatsappData, setWhatsappData] = useState('');
  useEffect(() => {
    const foot = async () => {
      const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_FOOTER;
      const res = await fetch(url);
      const footer = await res.json();
      setFooterData(footer);
      setWhatsappData(footer.included[4].attributes.redirectLink);
      console.log(footer.included[4].attributes.redirectLink)
    }
    foot();
    
    fb();
  }, []);
  
  return (
    <>
      <main>
        <Header />
          {children}
        <Footer data={footerData} />
        <div
          className="fb-customerchat"
          attribution="setup_tool"
          page_id="212500676154188"
          theme_color="#c7323e"
          logged_in_greeting="¡Hola! ¿Cómo podemos ayudarte?"
          logged_out_greeting="¡Hola! ¿Cómo podemos ayudarte?"
        ></div>
        <WhatsappBubble url={whatsappData ? whatsappData : 'https://api.whatsapp.com/send/?phone=51940648079&text&type=phone_number&app_absent=0'} />
      </main>
    </>
  )
}
