import { Container, Flex, Center, Stack, Text, Heading, Button, Box } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import Feature from '@/components/Feature';

export default function Home() {

  return (
    <>
      <HeadTitle title='¡Activa tu linea de efectivo con FIO.pe!' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Container maxW='8xl' pt={{base: 2, md: 50}} pb={{base: 20, md: 100}}> 
            <Heading className='title-highlight' as='h1' size='2xl' mb={10}>ACERCA DE NOSOTROS</Heading>

            <Text as='p' textAlign='center' px={5} mb={10}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fug
            </Text>

            <Flex justifyContent='center' alignItems='center' flexWrap='wrap' gap={5}>
                <Feature features={features} />
            </Flex>
        </Container>
      </main>
    </>
  )
}

const features = [
  {
    title: 'Misión',
    image: 'mision.png',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    title: 'Visión',
    image: 'vision.png',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]