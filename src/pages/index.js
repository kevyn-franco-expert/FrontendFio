import Carousel from '@/components/Carousel'
import { Container, Flex, Center, Stack, Text, Heading, Button, Box } from '@chakra-ui/react'
import Calculator from '@/components/Calculator';
import DocumentType from '@/components/DocumentType';
import Tips from '@/components/Tips'; 
import HeadTitle from '@/components/base/HeadTitle';
import { useState } from 'react'

export default function Home() {
  const [calculatorCheck, setCalculatorCheck] = useState(false)
  const [tipsCheck, setTipsCheck] = useState(false)

  const calculatorData = (data) => {
    console.log(data)
  };

  function handleButtonClick(section) {
    if (section === 'calculator') {
      setCalculatorCheck(true)
    } else if (section === 'tips') {
    setCalculatorCheck(true);
    setTipsCheck(true);
    } else if (section === 'documentType') {
      alert('Done');
    }
  }
  return (
    <>
      <HeadTitle title='¡Activa tu linea de efectivo con FIO.pe!' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Carousel />
        <Container maxW='8xl' pt={{base: 2, md: 50}} pb={{base: 20, md: 100}}> 
        <Flex flexWrap='wrap' alignItems='start' justify='center' w="full" color='white'>
          <Center w='100%' maxW={600}>
          <Stack spacing={0} mt={10} >
            <Heading className='heading-red'>
            OBTÉN TU LÍNEA DE <br />
            EFECTIVO CON <br /> NOSOTROS
            </Heading>
            <Text as='p' color='black' mt={0}>Lorem ipsum dolor sit amet</Text>
          </Stack>
          </Center>
          <Center w='100%' maxW={700}>
            <Box boxShadow='md' className="home-box" mt={{base: '10', sm: '1'}} maxW='full' borderWidth='1px' borderRadius='lg' bg="white" color="black" p={{base: '2', sm: '5'}} pt={5}>
                { !calculatorCheck && <Calculator calculatorValues={calculatorData} />}
                {(calculatorCheck && !tipsCheck) && <Tips features={features}  />}
                {(calculatorCheck && tipsCheck) && <DocumentType />}
                <Box className='buttons' pt={8}>
                    <Button onClick={() => handleButtonClick('calculator')} display={!calculatorCheck ? 'flex' : 'none'} size='lg' width='full' colorScheme='blue' >SOLICITAR PRÉSTAMO</Button>
                    <Button onClick={() => handleButtonClick('tips')} display={(calculatorCheck && !tipsCheck) ? 'flex' : 'none'} size='lg' width='full' colorScheme='blue' >CONTINUAR</Button>
                    <Button onClick={() => handleButtonClick('documentType')} display={(calculatorCheck && tipsCheck) ? 'flex' : 'none'} size='lg' width='full' colorScheme='blue'>SOLICITAR</Button>
                </Box>
            </Box>
          </Center>
        </Flex>
        </Container>
      </main>
    </>
  )
}

const features = [
  {
    title: 'Cuenta Bancaria',
    image: 'banco.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Documento de identidad',
    image: 'card.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Número de celular',
    image: 'phone.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
]