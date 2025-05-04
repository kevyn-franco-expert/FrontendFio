import { 
    Image 
} from '@chakra-ui/react'

export default function WhatsappBubble({url = 'https://wa.me/51978648424'}) {
 
    return (
    <div class="whatsapp-bubble">
        <Image onClick={() => window.open(url,'_blank')} src='/BotonWhatsApp.png' alt='whatsapp' width='50px' height='50px' />
    </div>
  )
}
