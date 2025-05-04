import { Container, Flex, Center, Stack, Text, Heading, Button, Box, Divider } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import Benefits from '@/components/Benefits';

export default function BenefitsPage() {

  return (
    <>
      <HeadTitle title='Beneficios' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Box bg={'#F1F1F1F1'}>
            <Container maxW='8xl' pt={{base: 2, md: 50}} pb={{base: 20, md: 100}}> 
                <Heading className='title-highlight' as='h1' size='2xl' mb={10}>BENEFICIOS</Heading>

                <Flex justifyContent='center' alignItems='center' flexWrap='wrap' gap={5}>
                    <Benefits benefits={benefits} />
                </Flex>
            </Container>
        </Box>
        <Box bg='white'>
            <Container maxW='8xl' pt={{base: 2, md: 50}} pb={{base: 20, md: 100}}>
                <Heading className='title-highlight' as='h1' size='2xl' mb={10}>PASOS PARA ADQUIRIR UN PRÉSTAMO</Heading>
                <Flex justifyContent='center' alignItems='center' flexWrap='wrap' gap={5}>
                    <Box maxW='3xl' display={{base: 'none', md: 'flex'}}></Box>
                    <Benefits cols={4} benefits={howWorks} />
                </Flex>
            </Container>
        </Box>
      </main>
    </>
  )
}

const benefits = [
  {
    image: 'Banco@2x.svg',
  content: 'CRÉDITOS MAYORES QUE LOS BANCOS'
  },
  {
    image: 'Notariales@2x.svg',
    content: <>
    FIRMAS <br/> NOTARIALES
    </>
  },
  {
    image: 'Cheque@2x.svg',
    content: 'PRÉSTAMOS CON CHEQUE DE GERENCIA'
  }
]

const howWorks = [
    {
      image: 'Celu@2x.svg',
      content: 'Contáctanos'
    },
    {
      image: 'Precalifica@2x.svg',
      content: 'Rellena tu solicitud'
    },
    {
      image: 'Documentación@2x.svg',
      content: 'Presenta tu documentación'
    },
    {
      image: 'Desembolso@2x.svg',
      content: 'Espera tu desembolso'
    }
  ]