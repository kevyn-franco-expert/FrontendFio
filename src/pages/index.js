import Carousel from '@/components/Carousel'
import { Container, Flex, Center, Stack, Text, Heading, Button, Box } from '@chakra-ui/react'
import Calculator from '@/components/Calculator';
import DocumentType from '@/components/DocumentType';
import Tips from '@/components/Tips'; 
import HeadTitle from '@/components/base/HeadTitle';
import { useState, useEffect, useContext } from 'react'
import { StoreContext } from "@/store/StoreProvider";
import { useRouter } from 'next/navigation'

import useAPI from "@/hooks/useAPI";

export default function Home({data}) {
  const [homeData, setHomeData] = useState(data)
  const [calculatorCheck, setCalculatorCheck] = useState(false)
  const [calculatorData, setCalculatorData] = useState(null)
  const [documentSelected, setDocumentSelected] = useState(false)
  const [documentTypeSeted, setDocumentTypeSeted] = useState(false)
  const [tipsCheck, setTipsCheck] = useState(false)
  const [store, dispatch] = useContext(StoreContext);
  const { postData } = useAPI();
  const router = useRouter()


  useEffect(() => {
    console.log('documentSelected', documentSelected);
    console.log('calculatorData', calculatorData);
    console.log('tipsCheck', tipsCheck);
  }, [documentSelected, calculatorData, tipsCheck])
  
  useEffect(() => {
    dispatch({
      type: "userInformation",
      payload: documentSelected,
    });
  }, [documentSelected]);

  const handleButtonClick = async (section) => {
    if (section === 'calculator') {
      setCalculatorCheck(true)
    } else if (section === 'tips') {
    setCalculatorCheck(true);
    setTipsCheck(true);
    } else if (section === 'documentType' && documentTypeSeted === 'DNI') {
      const data = await postData(process.env.NEXT_PUBLIC_API_SCORES, documentSelected);
      dispatch({
        type: "userDataSentinel",
        payload: data.data.attributes,
      });
      console.log(data);
      router.push('/form-registro')
    } else if (section === 'documentType') {
      router.push('/form-registro')
    }
  }
  return (
    <>
      <HeadTitle title='¡Activa tu linea de efectivo con FIO.pe!' description='Obtén tu línea de efectivo con nosotros' />
      <main>
      {homeData && homeData.map((home) => (
        <>
          <Carousel />
          <Container maxW='8xl' pt={{base: 2, md: 50}} pb={{base: 20, md: 100}}> 
          <Flex flexWrap='wrap' alignItems='start' justify='center' w="full" color='white'>
            <Center w='100%' maxW={600}>
            <Stack spacing={0} mt={10} mb={10} >
              <Heading className='heading-red'>
              {home.attributes.title}
              </Heading>
              <Text as='p' color='black' pt={5} mt={0}>{home.attributes.description}</Text>
            </Stack>
            </Center>
            <Center w='100%' maxW={700}>
              <Box boxShadow='md' className="home-box" mt={{base: '10', sm: '1'}} maxW='full' borderWidth='1px' borderRadius='lg' bg="white" color="black" p={{base: '2', sm: '5'}} pt={5}>
                  { !calculatorCheck && <Calculator calculatorValues={setCalculatorData} />}
                  {(calculatorCheck && !tipsCheck) && <Tips features={features}  />}
                  {(calculatorCheck && tipsCheck) && <DocumentType documentSeted={setDocumentSelected} documentTypeSelected={setDocumentTypeSeted} />}
                  <Box className='buttons' pt={8}>
                      <Button onClick={() => handleButtonClick('calculator')} isDisabled={!calculatorData} display={!calculatorCheck ? 'flex' : 'none'} size='lg' width='full' colorScheme='blue' >SOLICITAR PRÉSTAMO</Button>
                      <Button onClick={() => handleButtonClick('tips')} display={(calculatorCheck && !tipsCheck) ? 'flex' : 'none'} size='lg' width='full' colorScheme='blue' >CONTINUAR</Button>
                      <Button onClick={() => handleButtonClick('documentType')} isDisabled={!documentSelected} display={(calculatorCheck && tipsCheck) ? 'flex' : 'none'} size='lg' width='full' colorScheme='blue'>SOLICITAR</Button>
                  </Box>
              </Box>
            </Center>
          </Flex>
          </Container>
        </>
      ))}
        {!homeData && <><h1>No DATA</h1></>}
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

export async function getServerSideProps() {
  const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_HOME
  const res = await fetch(url)
  const home = await res.json()
  const { data } = home;
  return {
    props: {
      data
    }
  }
}
