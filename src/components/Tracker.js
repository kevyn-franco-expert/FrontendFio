import { 
    Flex,
    Box,
    Text,
    Spacer,
    Container,
    Tag,
    FormLabel,
    Heading,
    Show } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import React, {useState, useEffect} from 'react'
import { FiClock, FiCheck } from "react-icons/fi";
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Cookies from 'js-cookie';

export default function miCuenta() {
   const [tracking, setTracking] = useState(null);

   useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_TRACKING + Cookies.get('token') + '/'
    try {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const tracker = data;
            setTracking(tracker);
        })
    } catch (error) {
        console.error(error);
    }
}, []);
    return (
    <>
        <HeadTitle title='Mi cuenta' description='Obtén tu línea de efectivo con nosotros' />
        <Container maxW='8xl'>
            <Heading as='h2' size='md' textAlign='center' color='#E2474B'>SEGUIMIENTO SOLICITUD DE DESEMBOLSO</Heading>
        <Flex minWidth={{base:'100%', md:'max-content'}} flexDirection='column' gap='2'>
            {tracking && tracking.map((track) => (
                <Box my={4}>
                    <Flex bg='green.200'  borderRadius={10} px={4} minWidth={{base:'100%', md:'max-content'}} alignItems='center' gap='2'>
                        <Box pb='2'>
                            <FormLabel position='relative' top={2}>
                                    <Flex className={`input-position fill`}>
                                    {track.order}
                                    </Flex> 
                            </FormLabel>
                            <Text as='b'>{track.title}</Text>
                        </Box>
                        <Show above='sm'>
                            <Spacer  />
                        </Show>
                        {track.check ? <FiCheck /> : <FiClock />}
                    </Flex>
                    <Text my={2}>
                        {track.status}
                    </Text>
                    <Text>
                        <ArrowForwardIcon /> {track.observation}
                    </Text>
                </Box>
            ))}

            <Box my={4}>
                <Flex bg='green.200'  borderRadius={10} px={4} minWidth={{base:'100%', md:'max-content'}} alignItems='center' gap='2'>
                    <Box pb='2'>
                        <FormLabel position='relative' top={2}>
                                <Flex className={`input-position fill`}>
                                    1
                                </Flex> 
                        </FormLabel>
                        <Text as='b'>Solicitud en revisión y verificación documentaria</Text>
                    </Box>
                    <Show above='sm'>
                        <Spacer  />
                    </Show>
                    <FiCheck />
                    {/* <FiClock /> */}
                </Flex>
                <Text my={2}>
                 Estado de Solicitud: <Tag>Pre-aprobado</Tag>
                </Text>
                <Text>
                    <ArrowForwardIcon /> En proceso de evaluación 
                </Text>
            </Box>
            <Box my={4}>
                <Flex bg='gray.200' borderRadius={10} px={4} minWidth={{base:'100%', md:'max-content'}} alignItems='center' gap='2'>
                <Box pb='2'>
                    <FormLabel position='relative' top={2}>
                            <Flex className={`input-position fill`}>
                                2
                            </Flex> 
                    </FormLabel>
                    <Text as='b'>Solicitud en revisión y verificación documentaria</Text>
                </Box>
                <Show above='sm'>
                    <Spacer  />
                </Show>
                {/* <FiCheck /> */}
                <FiClock />
                </Flex>
                <Text my={2}>
                 Estado de firma biométrica: <Tag>Pendiente</Tag>
                </Text>
                <Text>
                    <ArrowForwardIcon /> Pendiente validación biométrica
                </Text>
            </Box>
            <Box my={4}>
                <Flex bg='gray.200' width={{base: '250px', md: '100%'}} borderRadius={10} px={4} minWidth={{base:'100%', md:'max-content'}} alignItems='center' gap='2'>
                <Box pb='2'>
                    <FormLabel position='relative' top={2}>
                            <Flex className={`input-position fill`}>
                               3
                            </Flex> 
                    </FormLabel>
                    <Text as='b'>Solicitud en revisión y verificación documentaria</Text>
                </Box>
                <Show above='sm'>
                    <Spacer  />
                </Show>
                {/* <FiCheck /> */}
                <FiClock />
                </Flex>
                <Text my={2}>
                 Evaluación crediticia: <Tag>Pendiente</Tag>
                </Text>
            </Box>
        </Flex>
        </Container>
    </>
  )
}
