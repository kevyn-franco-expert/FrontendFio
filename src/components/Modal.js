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
const Modals = ({ isOpenit, onCloseit, fullName }) => {
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
                        Te hemos enviado un correo de verificación a:
                        xxxxxxx@gmail.com
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
    };
    
export default Modals;