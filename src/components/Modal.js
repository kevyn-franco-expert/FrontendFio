import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Button,
    Heading,
    Text,
    Flex,
    Center,
    Link
  } from '@chakra-ui/react'
  import { ChevronLeftIcon } from '@chakra-ui/icons'
const Modals = ({ isOpenit, onCloseit, fullName = 'estimado cliente', email = 'tu@correo.com', type = 'thankyou' }) => {

    if (type === 'pre-register'){

        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Text className='title-red' as='p'>
                            ¡Felicitaciones {fullName}!
                        </Text>
                        <Center>
                            <Text textAlign='center'>
                            Te hemos enviado un correo de verificación a: <br />
                            {email}
                            </Text>
                        </Center>
                        <Center>
                            <Text>
                            En caso no lo hayas recibido, vuelve a solicitarlo aquí:
                            </Text>
                        </Center>
    
                        <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                    Reenviar Correo
                    </Button>
                    <Link
                    color='gray.500'
                    href='/'
                    >
                    <ChevronLeftIcon /> Regresar al inicio
                    </Link>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Text className='title-red' as='p'>
                            ¡Se realizó el registro con éxito!
                        </Text>
                        <Center>
                            <Text textAlign='center'>
                            Gracias por tomarse el tiempo de completar nuestro formulario. Valoramos su opinión y trabajaremos para resolver su problema lo antes posible
                            </Text>
                        </Center>
    
                        <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                    Cerrar
                    </Button>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    }
    };
    
export default Modals;