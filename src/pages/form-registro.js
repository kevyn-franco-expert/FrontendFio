import { Container, Heading, Box, Divider, Flex, Center } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import { useState, useEffect  } from 'react';
import Forms from '@/components/forms';


export default function formRegistro() {

    return (
    <>
      <HeadTitle title='Pre Registro' description='Obtén tu línea de efectivo con nosotros' />
      <main>
        <Container maxW='8xl' pt={{base: 10, md: 50}} pb={{base: 20, md: 100}}> 
            <Flex justifyContent='center' flexDirection='column' alignItems='center'>
                <Heading className='title-black' as='h3' size='xl' mb={10}>Tu solicitud está Pre - aprobada, contínua registrándote</Heading>
                <Center  my={5}>
                    <Divider width='100%' />
                </Center>
                <Box>
                    <Forms formType='preRegister' />
                    <p>asd</p>
                </Box>
            </Flex>
        </Container>
      </main>
    </>
  )
}
