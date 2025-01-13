import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Button,
    Image,
    Text,
    Flex,
    Center,
    Link,
    HStack,
    PinInput, 
    PinInputField
  } from '@chakra-ui/react'
  import Calculator from "./Calculator";
  import React, { useState } from "react";
  import { ChevronLeftIcon } from '@chakra-ui/icons'
  const Modals = ({ isOpenit, onCloseit, actionBtn, data = null, type = 'thankyou', sendit = false, isError = false, overlayClick = null, ref}) => {
      const [calculatorData, setCalculatorData] = useState('')
      const [calculatorValues, setCalculatorValues] = useState('')
      const [pinData, setPinData] = useState('')

    if (type === 'pre-register') {
        return (
            <>
            <Modal closeOnOverlayClick={false} isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent className='modal-click-outside'>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={5} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Text className='title-red' as='p'>
                            {data.title}
                        </Text>
                        <Center>
                            <Text textAlign='center'>
                            {data.description}
                            </Text>
                        </Center>
                        <Center>
                            <Text>
                            {data.subdescription}
                            </Text>
                        </Center>
    
                    {/*    <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={actionBtn}>*/}
                    {/*Reenviar Correo*/}
                    {/*</Button>*/}
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
    } else if (type === 'congrats') {
        return (
            <>
            <Modal closeOnOverlayClick={false} isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={5} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Text className='title-red' as='p'>
                            {data.title}
                        </Text>
                        <Center>
                            <Text textAlign='center'>
                            {data.description}
                            </Text>
                        </Center>
                        <Center>
                            <Text color='gray.500'>
                            {data.subdescription}
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
    } else if (type === 'nonFieldErrors') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={5} justifyContent='center' flexDirection='column' alignItems='center'> 
                            <Text className='title-red' as='p' mb={0}>
                            {data.title}
                            </Text>
                        <Center mb={4}>
                            <Text textAlign='center'>
                                {data.description}
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
    } else if (type === 'error') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={8} borderRadius={10} gap={5} justifyContent='center' flexDirection='column' alignItems='center'> 
                            <Text className='title-red' as='p' mb={0}>
                                ¡Lo sentimos!
                            </Text>
                        <Center mb={4}>
                            {data && data.map((msg, index) => (
                                <Text key={index} textAlign='center'>
                                    {msg.detail}
                                </Text>
                            ))}
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
    } else if (type === 'update-info') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Center>
                            <Text textAlign='center'>
                            ¡Se actualizó Satisfactoriamente la información!
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
    } else if (type === 'calculator') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Center>
                            {data && <Calculator noChanges={data.no_change} min={data.capital_pending} max={data.capital_pending} title={data.title} payment_day={data.payment_day} defaultValueSlider={data.capital_pending}  calculatorValues={setCalculatorData} calculatorResult={setCalculatorValues} />}
                            {!data && <Calculator calculatorValues={setCalculatorData} calculatorResult={setCalculatorValues} />}
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
    } else if (type === 'pin') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    {!sendit && 
                        <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                            {data && <>
                                <Text className='title-red' as='p' mb={0}>
                                {data.title ? data.title : 'Ingrese su código de 6 dígitos'}
                                </Text>
                                <Center>
                                    <Text textAlign='center'>
                                    {data && 
                                    <>
                                        {data.content ? data.content : 'Ingresa el código que fue enviado a tu whatsapp para realizar la transferencia'}
                                    </>
                                    }
                                        
                                    </Text>
                                </Center>
                            </>}
                            {!data && 
                            <>
                                <Text className='title-red' as='p' mb={0}>
                                    Ingrese su código de 6 dígitos
                                </Text>
                                <Center>
                                    <Text textAlign='center'>
                                    Ingresa el código que fue enviado a tu whatsapp para realizar la transferencia
                                    </Text>
                                </Center>
                            </>
                            }
                            <Center>
                                <HStack>
                                    <PinInput type='number' onChange={setPinData}>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>
                            </Center>
                            <Text display={isError ? '' : 'none'} color='red' textAlign='center'>
                                {(isError && typeof isError !== 'boolean') ? isError : 'El campo Código es obligatorio'}
                            </Text>
                            <Button isDisabled={pinData.length < 6} size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={() => actionBtn(pinData)}>
                                Validar
                            </Button>
                        </Flex>
                    }

                    {sendit && 
                        <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                            <Text className='title-red' as='p' mb={0}>
                                ¡Un paso más!
                            </Text>
                            <Center>
                                <Text textAlign='center'>
                                    Te hemos enviado un código de confirmación a tu Whatsapp. <br />
                                    Ingrésalo desde tu Área de Clientes
                                </Text>
                            </Center>
                            <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                                Cerrar
                            </Button>
                        </Flex>
                    }
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else if (type === 'pin-complete') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
                <ModalOverlay />
                <ModalContent>
                <ModalBody>
                    {!sendit && 
                        <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                            {data && <>
                                <Text className='title-red' as='p' mb={0}>
                                {data.title ? data.title : 'Ingrese su código de 6 dígitos'}
                                </Text>
                                <Center>
                                    <Text textAlign='center'>
                                    {data && 
                                    <>
                                        {data.content ? data.content : 'Ingresa el código que fue enviado a tu whatsapp para realizar la transferencia'}
                                    </>
                                    }
                                        
                                    </Text>
                                </Center>
                            </>}
                            {!data && 
                            <>
                                <Text className='title-red' as='p' mb={0}>
                                    Ingrese su código de 6 dígitos
                                </Text>
                                <Center>
                                    <Text textAlign='center'>
                                    Ingresa el código que fue enviado a tu whatsapp para realizar la transferencia
                                    </Text>
                                </Center>
                            </>
                            }
                            <Center>
                                <HStack>
                                    <PinInput type='number' onChange={setPinData}>
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </HStack>
                            </Center>
                            <Text display={isError ? '' : 'none'} color='red' textAlign='center'>
                                {(isError && typeof isError !== 'boolean') ? isError : 'El campo Código es obligatorio'}
                            </Text>
                            <Button isDisabled={pinData.length < 6} size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={() => actionBtn(pinData)}>
                                Validar
                            </Button>
                        </Flex>
                    }

                    {sendit && 
                        <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                            <Text className='title-red' as='p' mb={0}>
                                ¡Felicitaciones!
                            </Text>
                            <Center>
                                <Text textAlign='center'>
                                    Estamos procesando tu solicitud<br />
                                    Te notificaremos por Whatsapp cuando se haga efectivo el desembolso
                                </Text>
                            </Center>
                            <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                                Cerrar
                            </Button>
                        </Flex>
                    }
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else if (type === 'informativo') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit} className='modalinformativo'>
                <ModalOverlay />
                <ModalContent style={{backgroundColor:'white'}}>
                <ModalCloseButton className="Xbutton" />
                <ModalBody>
                <Flex p={4} borderRadius={10} gap={8} justifyContent='center' flexDirection='row' alignItems='center'> 
                    <Box boxSize="400px" className='logo-watermark'>
                        <Image
                            src={'/fio-logo.jpeg'}
                            alt="carousel image"
                            boxSize="full"
                            backgroundSize="cover"
                        />
                    </Box>
                    <Text className='text-p' as='p'>
                        <b>Obtén tu préstamo en efectivo con garantía hipotecaria</b><br/>

                        ¡Cumple tus sueños hoy mismo con nuestros préstamos en efectivo! <br/><br/>

                        <b>Montos disponibles:</b><br/>
                        Desde $15,000USD<br/><br/>

                        <b>Requisitos:</b><br/>
                        - Título de propiedad como colateral sin gravámenes<br/><br/>

                        <b>Ventajas:</b><br/>
                        - Proceso fácil y rápido el mismo día <br/>
                        - Atención personalizada<br/><br/>

                        <b>Empresa:</b><br/>
                        Fio Perú Sociedad Anonima Cerrada<br/>
                        Registrada en la UIF de la Superintendencia de Banca, Seguros y AFP<br/>
                        Sitio web: www.fio.pe<br/><br/>

                        ¡No esperes más! Solicita tu préstamo ahora y transforma tus proyectos en realidad.
                        <br/>
                        <Center>
                        <Link href='https://wa.me/51978648424?text=Hola%20equipo%20FIO.PE,%20quisiera%20recibir%20mayor%20informaci%C3%B3n%20sobre%20el%20pr%C3%A9stamo%20en%20efectivo%20con%20garant%C3%ADa%20hipotecaria'>
                            <Button size='md' colorScheme="red" minW={{base:'80%', sm:'300px'}} borderRadius={20} mt={3} onClick={onCloseit}>
                            Contáctanos
                            </Button>
                        </Link>
                        </Center>
                    </Text>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    } else {
        return (
            <>
            <Modal closeOnOverlayClick={false}  isOpen={isOpenit} size={'xl'} onClose={onCloseit} className='modalcomple'>
                <ModalOverlay />
                <ModalContent>
                <ModalBody className='body'>
                    <Flex p={4} borderRadius={10} gap={10} justifyContent='center' flexDirection='column' alignItems='center'> 
                        <Text className='title-red' as='p'>
                            ¡Se realizó el registro con éxito!
                        </Text>
                        <Center>
                            <Text textAlign='center'>
                            Gracias por tomarse el tiempo de completar nuestro formulario. Valoramos su opinión y trabajaremos para resolver su problema lo antes posible
                            </Text>
                        </Center>
    
                        <Link href='/'>
                            <Button size='lg' colorScheme="blue" variant={'solid'} minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={onCloseit}>
                            Regresar al Inicio
                            </Button>
                        </Link>
                    </Flex>
                </ModalBody>
        
                </ModalContent>
            </Modal>
            </>
        );
    }
    };
    
export default Modals;