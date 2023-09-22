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
    Link,
    HStack,
    PinInput, 
    PinInputField,
    useOutsideClick 
  } from '@chakra-ui/react'
  import Calculator from "./Calculator";
  import React, { useState, useEffect } from "react";
  import { ChevronLeftIcon } from '@chakra-ui/icons'
  const Modals = ({ isOpenit, onCloseit, actionBtn, data = null, type = 'thankyou', sendit = false, isError = false, overlayClick = null}) => {
      const [calculatorData, setCalculatorData] = useState('')
      const [calculatorValues, setCalculatorValues] = useState('')
      const [pinData, setPinData] = useState('')
    //   const ref = React.useRef()

    //   useOutsideClick({
    //     ref: ref,
    //     handler: () => {
    //         if (overlayClick) {
    //             overlayClick()
    //         }
    //     }
    //   })

    if (type === 'pre-register') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
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
                            <Text>
                            {data.subdescription}
                            </Text>
                        </Center>
    
                        <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={actionBtn}>
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
    } else if (type === 'congrats') {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit}>
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
                    <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={actionBtn}>
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
    } else {
        return (
            <>
            <Modal isOpen={isOpenit} size={'xl'} onClose={onCloseit} className='modalcomple'>
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
    
                        <Button size='lg' colorScheme="blue" minW={{base:'80%', sm:'350px'}} borderRadius={20} mr={3} onClick={actionBtn}>
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