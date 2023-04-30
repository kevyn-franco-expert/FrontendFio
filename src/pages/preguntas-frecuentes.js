import { Container, Heading, Box, Flex } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import { useState, useEffect  } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel    
  } from '@chakra-ui/react'
import {
    AddIcon, 
    MinusIcon } from '@chakra-ui/icons';

export default function PreguntasFrecuentes() {
    const [showOff, setShowOff] = useState(false);
    const [visible, setVisible] = useState(3);
    const showMoreFaqs = () => {
        setVisible((prevValue) => prevValue + 3);
        if (visible >= faq.length) {
            setShowOff(true);
        } else {
            setVisible(faq.length);
        }
    }
  return (
    <>
      <HeadTitle title='¡Activa tu linea de efectivo con FIO.pe!' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Container maxW='8xl' pt={{base: 10, md: 50}} pb={{base: 20, md: 100}}> 
            <Heading className='title-highlight' as='h1' size='2xl' mb={10}>PREGUNTAS FRECUENTES</Heading>

            <Accordion allowMultiple>
                {faq && faq.slice(0, visible).map((item, index) => (
                    <AccordionItem py={4} borderTop={index === 0 ? 'none' : '1px solid gray'} key={index}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' style={{fontWeight: 'bold'}}>
                            {item.title}
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='20px' p={1} border='1px solid' borderRadius={2} />
                            ) : (
                            <AddIcon fontSize='20px'  border='1px solid' borderRadius={2} p={1} />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        {item.content}
                        </AccordionPanel>
                    </>
                    )}
                </AccordionItem>
                )) }
            </Accordion>

            <Flex justifyContent='center' mt={10}>
                <button style={{display: showOff ? 'none' : 'flex'}} onClick={showMoreFaqs} type="button" class="show-more">
                    <span class="show-more__text">Ver más</span>
                    <span class="show-more__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                </button>
            </Flex>
        </Container>
      </main>
    </>
  )
}

const faq = [
  {
    title: '¿Quiénes somos?',
    content: 'Somos FIO.pe y estamos comprometidos en ofrecer a nuestros clientes una alternativa de financiamiento fácil, rápida y segura. Nos gusta pensar que somos esa opción de confianza que está ahí siempre para un imprevisto, una oportunidad de compra o para lo que necesites.'
  },
  {
    title: '¿Qué es una línea de efectivo?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: '¿Cuáles son los requisitos?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: '¿Cuáles son los requisitos 2?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: '¿Cuáles son los requisitos 3?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: '¿Cuáles son los requisitos 4?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: '¿Cuáles son los requisitos 5?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]