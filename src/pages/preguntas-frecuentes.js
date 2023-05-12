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
import { useFetch } from '@/hooks/useFetch';

export default function PreguntasFrecuentes() {
  const { faqs, setFaqs } = useState([]);
  const [paginationPage, setPaginationPage] = useState(1);
  // const url = `https://fio.pe/api/faqs/?page[number]=${paginationPage}`;
  // const { data, loading, error } = useFetch(url);
    const [showOff, setShowOff] = useState(false);
    const showMoreFaqs = () => {
        setPaginationPage(paginationPage + 1);
        if (paginationPage === faqsFio[0].meta.pagination.pages) {
            setShowOff(true);
        } else {
          setShowOff(false);
        }
    }
  return (
    <>
      <HeadTitle title='¡Activa tu linea de efectivo con FIO.pe!' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Container maxW='8xl' pt={{base: 10, md: 50}} pb={{base: 20, md: 100}}> 
            <Heading className='title-highlight' as='h1' size='2xl' mb={10}>PREGUNTAS FRECUENTES</Heading>

            <Accordion allowMultiple>
                {faqsFio[0].data && faqsFio[0].data.map((item, index) => (
                    <AccordionItem py={4} borderTop={index === 0 ? 'none' : '1px solid gray'} key={index}>
                    {({ isExpanded }) => (
                    <>
                        <h2>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left' style={{fontWeight: 'bold'}}>
                            {item.attributes.question}
                            </Box>
                            {isExpanded ? (
                            <MinusIcon fontSize='20px' p={1} border='1px solid' borderRadius={2} />
                            ) : (
                            <AddIcon fontSize='20px'  border='1px solid' borderRadius={2} p={1} />
                            )}
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        {item.attributes.answer}
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



const faqsFio = [
  {
    "links": {
      "first": "https://fio.pe/api/faqs/?page%5Bnumber%5D=1",
      "last": "https://fio.pe/api/faqs/?page%5Bnumber%5D=4",
      "next": "https://fio.pe/api/faqs/?page%5Bnumber%5D=2",
      "prev": null
    },
    "data": [
      {
        "type": "faqs",
        "id": "1",
        "attributes": {
          "question": "¿Quiénes somos?",
          "answer": "Somos FIO.pe y estamos comprometidos en ofrecer a nuestros clientes una alternativa de financiamiento fácil, rápida y segura. Nos gusta pensar que somos esa opción de confianza que está ahí siempre para un imprevisto, una oportunidad de compra o para lo que necesites."
        }
      },
      {
        "type": "faqs",
        "id": "2",
        "attributes": {
          "question": "¿Qué es una línea de efectivo?",
          "answer": "Piénsalo como el saldo disponible mensual de una tarjeta de crédito, pero en efectivo. Retira la cantidad que quieras en el momento que gustes según las características de tu línea ¡Tú tienes el control con FIO.pe!"
        }
      },
      {
        "type": "faqs",
        "id": "3",
        "attributes": {
          "question": "¿Cuáles son los requisitos?",
          "answer": "<ul><li>Disponer de DNI vigente y vivir en el Perú.</li><li>Tener entre 21 y 65 años.</li><li>Contar con un correo electrónico propio activo.</li><li>Disponer de celular activo a nombre del titular o algún tercero que sea verificable.</li><li>Tener una cuenta de ahorros en Soles en BBVA Continental, INTERBANK a nombre del solicitante. No puede estar a nombre de un familiar.</li><li>Contar con un recibo de agua, luz o teléfono para verificar tú domicilio.</li><li>No presentar reportes negativos en Infocorp u otras centrales de riesgo en los últimos 6 meses.</li></ul>"
        }
      }
    ],
    "meta": {
      "pagination": {
        "page": 1,
        "pages": 4,
        "count": 10
      }
    }
  }
]