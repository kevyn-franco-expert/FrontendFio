import React, { useState } from 'react';
import { Field, Formik } from 'formik';
import { Box,
  AbsoluteCenter,
  Button,
  Checkbox,
  Flex,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  Stack,
  Radio, 
  RadioGroup,
  useDisclosure,
  Divider,
  Center
  } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Modals from './Modal';
import * as Yup from 'yup';


export default function forms({formType}) {
  const [openModal, setOpenModal] = useState(false);
  const onlyNumbers = /^[0-9\b]+$/;
  const onlyCharacters = /^[A-Za-z\s]*$/;

  const handleOnlyNumbers = (event) => {
    const regex = /^[0-9\b]+$/;
    const value = event.target.value;
    if (!regex.test(value)) {
      const filteredValue = value
        .split('')
        .filter((char) => regex.test(char))
        .join('');
      event.target.value = filteredValue;
    }
  };

  const handleOnlyCharacters = (event) => {
    const regex = /^[A-Za-z\s]*$/;
    const value = event.target.value;
    if (!regex.test(value)) {
      const filteredValue = value
        .split('')
        .filter((char) => regex.test(char))
        .join('');
      event.target.value = filteredValue;
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    dni: Yup.string()
    .matches(onlyNumbers, 'Solo se permiten numeros')
    .required('Campo requerido'),
    phone: Yup.string()
    .matches(onlyNumbers, 'Solo se permiten numeros')
    .required('Campo requerido'),
    department: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    province: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    district: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    address: Yup.string()
    .required('Campo requerido'),
  });

  const validationSchemaBook = Yup.object().shape({
    fullName: Yup.string()
    .matches(onlyCharacters, 'Solo se permiten caracteres y espacios')
    .required('Campo requerido'),
    dni: Yup.string()
    .matches(onlyNumbers, 'Solo se permiten numeros')
    .required('Campo requerido'),
    phone: Yup.string()
    .matches(onlyNumbers, 'Solo se permiten numeros')
    .required('Campo requerido'),
    email: Yup.string()
    .email('Formato de correo electrónico no válido')
    .required('Campo requerido')
  });

  //forms

  const LoginForm = () => {
    return (
      <Formik
      initialValues={{
        password: '',
        dni: ''
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ handleSubmit, errors, touched, values }) => (
        <form className='formik-form' onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!errors.dni && touched.dni}>
              <FormLabel htmlFor="dni"><Flex className={`input-position ${!errors.dni && touched.dni ? 'fill':''}`}>1</Flex> DNI </FormLabel>
              <Field
                as={Input}
                id="dni"
                name="dni"
                maxLength={8}
                type="tel"
                onInput={handleOnlyNumbers}
                validate={(value) => {
                  let error;

                  if (value.length !== 8) {
                    error = "Debería tener 8 caracteres";
                  }

                  return error;
                }}
              />
              <FormErrorMessage>{errors.dni}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              
              <FormLabel htmlFor="password"><Flex className={`input-position ${!errors.password && touched.password ? 'fill':''}`}>2</Flex> Ingresa contraseña * </FormLabel>
              <Field
                as={Input}
                id="password"
                name="password"
                type="password"
                validate={(value) => {
                  let error;

                  if (value.length < 8) {
                    error = "Debería tener al menos 8 caracteres";
                  }

                  return error;
                }}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            
            <Center height='50px'>
              <Divider />
            </Center>
            <Box position='relative' w='100%'>
              <AbsoluteCenter my={6}>
                <Button  minW={{base: '80%', sm: '80%', md: '500px'}} type="submit" colorScheme="blue" >
                  INGRESAR
                </Button>
              </AbsoluteCenter>
            </Box>
          </VStack>
        </form>
      )}
    </Formik>
  )
  };

  const FormPreRegister = () => {
    return (
        <Formik
        initialValues={{
          fullName: '',
          dni: '',
          phone: '',
          department: '',
          province: '',
          district: '',
          address: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          setOpenModal(true)
        }}
      >
        {({ handleSubmit, errors, touched, values }) => (
          <form className='formik-form' onSubmit={handleSubmit}>
            <Modals fullName={values.fullName} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.fullName && touched.fullName}>
                
                <FormLabel htmlFor="fullName"><Flex className={`input-position ${!errors.fullName && touched.fullName ? 'fill':''}`}>1</Flex> Nombre Completo </FormLabel>
                <Field
                  as={Input}
                  id="fullName"
                  name="fullName"
                  type="text"
                  onInput={handleOnlyCharacters}
                  validate={(value) => {
                    let error;

                    if (value.length < 3) {
                      error = "Debería tener al menos 3 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.dni && touched.dni}>
              
                <FormLabel htmlFor="dni"><Flex className={`input-position ${!errors.dni && touched.dni ? 'fill':''}`}>2</Flex> DNI </FormLabel>
                <Field
                  as={Input}
                  id="dni"
                  name="dni"
                  maxLength={8}
                  type="tel"
                  onInput={handleOnlyNumbers}
                  validate={(value) => {
                    let error;

                    if (value.length !== 8) {
                      error = "Debería tener 8 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.dni}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.phone && touched.phone}>
                
                <FormLabel htmlFor="phone"><Flex className={`input-position ${!errors.phone && touched.phone ? 'fill':''}`}>3</Flex> Celular </FormLabel>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  type="tel"
                  onInput={handleOnlyNumbers}
                  maxLength={9}
                  validate={(value) => {
                    let error;

                    if (value.length < 9) {
                      error = "Debería tener al menos 9 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.department && touched.department}>
                
                <FormLabel htmlFor="department"><Flex className={`input-position ${!errors.department && touched.department ? 'fill':''}`}>4</Flex> Departamento </FormLabel>
                <Field
                  as={Input}
                  id="department"
                  name="department"
                  type="text"
                  onInput={handleOnlyCharacters}
                  validate={(value) => {
                    let error;

                    if (value.length < 2) {
                      error = "Debería tener al menos 3 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.department}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.province && touched.province}>
                
                <FormLabel htmlFor="province"><Flex className={`input-position ${!errors.province && touched.province ? 'fill':''}`}>5</Flex> Provincia </FormLabel>
                <Field
                  as={Input}
                  id="province"
                  name="province"
                  type="text"
                  onInput={handleOnlyCharacters}
                  validate={(value) => {
                    let error;

                    if (value.length < 4) {
                      error = "Debería tener al menos 3 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.province}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.district && touched.district}>
              
                <FormLabel htmlFor="district"><Flex className={`input-position ${!errors.district && touched.district ? 'fill':''}`}>6</Flex> Distrito </FormLabel>
                <Field
                  as={Input}
                  id="district"
                  name="district"
                  type="text"
                  onInput={handleOnlyCharacters}
                  validate={(value) => {
                    let error;

                    if (value.length < 3) {
                      error = "Debería tener al menos 2 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.district}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.address && touched.address}>
              
                <FormLabel htmlFor="address"><Flex className={`input-position ${!errors.address && touched.address ? 'fill':''}`}>7</Flex> Dirección </FormLabel>
                <Field
                  as={Input}
                  id="address"
                  name="address"
                  type="text"
                  validate={(value) => {
                    let error;

                    if (value.length < 4) {
                      error = "Debería tener al menos 3 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>
              <Field
                as={Checkbox}
                id="conditions"
                name="conditions"
                colorScheme="red"
                size='lg'
                my={4}
              >
                Acepto los términos y condiciones
              </Field>
              <Center height='50px'>
                <Divider />
              </Center>
              <Box position='relative' w='100%'>
                <AbsoluteCenter my={6}>
                  <Button minW={{base: '80%', sm: '80%', md: '500px'}} type="submit" colorScheme="blue" >
                    SIGUIENTE <ChevronRightIcon />
                  </Button>
                </AbsoluteCenter>
              </Box>
            </VStack>
          </form>
        )}
      </Formik>
    )
  }

  const CreatePasswordForm = () => {
    return (
        <Formik
        initialValues={{
          password: '',
          passwordagain: ''
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, errors, touched, values }) => (
          <form className='formik-form' onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.password && touched.password}>
                
                <FormLabel htmlFor="password"><Flex className={`input-position ${!errors.password && touched.password ? 'fill':''}`}>1</Flex> Ingresa contraseña * </FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  validate={(value) => {
                    let error;

                    if (value.length < 8) {
                      error = "Debería tener al menos 8 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.passwordagain && touched.passwordagain}>
                
                <FormLabel htmlFor="passwordagain"><Flex className={`input-position ${!errors.passwordagain && touched.passwordagain ? 'fill':''}`}>2</Flex> Repite tu contraseña * </FormLabel>
                <Field
                  as={Input}
                  id="passwordagain"
                  name="passwordagain"
                  type="password"
                  validate={(value) => {
                    let error;

                    if (value !== values.password) {
                      error = "No es igual al campo contraseña";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.passwordagain}</FormErrorMessage>
              </FormControl>
              <Center height='50px'>
                <Divider />
              </Center>
              <Box position='relative' w='100%'>
                <AbsoluteCenter my={6}>
                  <Button  minW={{base: '80%', sm: '80%', md: '500px'}} type="submit" colorScheme="blue" >
                    CREAR
                  </Button>
                </AbsoluteCenter>
              </Box>
            </VStack>
          </form>
        )}
      </Formik>
    )
  }

  const ComplaintsBookForm = () => {
    return (
        <Formik
        initialValues={{
          fullName: '',
          dni: '',
          phone: '',
          email: '',
          type: '',
          detailConsumer: '',
          orderConsumer: ''
        }}
        validationSchema={validationSchemaBook}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, errors, touched, values, setFieldValue }) => (
          <form className='formik-form' onSubmit={handleSubmit}>
            <Modals fullName={values.fullName} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
            <VStack spacing={4} align="flex-start">
              <FormControl isInvalid={!!errors.fullName && touched.fullName}>
                
                <FormLabel htmlFor="fullName"><Flex className={`input-position ${!errors.fullName && touched.fullName ? 'fill':''}`}>1</Flex> Nombre Completo </FormLabel>
                <Field
                  as={Input}
                  id="fullName"
                  name="fullName"
                  type="text"
                  onInput={handleOnlyCharacters}
                  validate={(value) => {
                    let error;

                    if (value.length < 3) {
                      error = "Debería tener al menos 3 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.dni && touched.dni}>
              
                <FormLabel htmlFor="dni"><Flex className={`input-position ${!errors.dni && touched.dni ? 'fill':''}`}>2</Flex> DNI </FormLabel>
                <Field
                  as={Input}
                  id="dni"
                  name="dni"
                  maxLength={8}
                  type="tel"
                  onInput={handleOnlyNumbers}
                  validate={(value) => {
                    let error;

                    if (value.length !== 8) {
                      error = "Debería tener 8 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.dni}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.phone && touched.phone}>
                
                <FormLabel htmlFor="phone"><Flex className={`input-position ${!errors.phone && touched.phone ? 'fill':''}`}>3</Flex> Celular </FormLabel>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  type="tel"
                  onInput={handleOnlyNumbers}
                  maxLength={9}
                  validate={(value) => {
                    let error;

                    if (value.length < 9) {
                      error = "Debería tener al menos 9 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email && touched.email}>
                
                <FormLabel htmlFor="email"><Flex className={`input-position ${!errors.email && touched.email ? 'fill':''}`}>4</Flex> Correo </FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="text"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.type && touched.type}>
                <FormLabel htmlFor="type"><Flex className={`input-position ${!errors.type && touched.type ? 'fill':''}`}>5</Flex> Tipo </FormLabel>
                <RadioGroup
                defaultValue='reclamo' 
                name="type"
                onChange={(value) => setFieldValue("type", value)}
                >
                  <Field
                  as={RadioGroup}
                  id="email"
                  name="email"
                  type="text"
                />
                  <Stack>
                    <Radio size='lg' value='reclamo' colorScheme='red'>
                      Reclamo
                    </Radio>
                    <Radio size='lg' value='queja'  colorScheme='red'>
                      Queja
                    </Radio>
                  </Stack>
                </RadioGroup>
                
                <FormErrorMessage>{errors.type}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.detailConsumer && touched.detailConsumer}>
                <FormLabel htmlFor="detailConsumer"><Flex className={`input-position ${!errors.detailConsumer && touched.detailConsumer ? 'fill':''}`}>6</Flex> Detalle del consumidor </FormLabel>
                <Field
                  as={Input}
                  id="detailConsumer"
                  name="detailConsumer"
                  type="text"
                  validate={(value) => {
                    let error;

                    if (value.length < 3) {
                      error = "Debería tener al menos 2 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.detailConsumer}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.orderConsumer && touched.orderConsumer}>
              
                <FormLabel htmlFor="orderConsumer"><Flex className={`input-position ${!errors.orderConsumer && touched.orderConsumer ? 'fill':''}`}>7</Flex> Pedido del consumidor </FormLabel>
                <Field
                  as={Input}
                  id="orderConsumer"
                  name="orderConsumer"
                  type="text"
                  validate={(value) => {
                    let error;

                    if (value.length < 4) {
                      error = "Debería tener al menos 4 caracteres";
                    }

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.orderConsumer}</FormErrorMessage>
              </FormControl>
              <Center height='50px'>
                <Divider />
              </Center>
              <Box position='relative' w='100%'>
                <AbsoluteCenter my={6}>
                  <Button minW={{base: '80%', sm: '80%', md: '500px'}} type="submit" colorScheme="blue" >
                    ENVIAR
                  </Button>
                </AbsoluteCenter>
              </Box>
            </VStack>
          </form>
        )}
      </Formik>
    )
  }

  const FormDefault = () => {
    return (
      <>
        <Box>
          <p>No Form selected..</p>
        </Box>
      </>
    )
  }

 
  
  const RenderForm = () => {
    if (formType === 'login') {
      return <LoginForm />
    } else if (formType === 'preRegister') {
      return <FormPreRegister />
    } else if (formType === 'complaintsBook') {
      return <ComplaintsBookForm />
    } else if (formType === 'password') {
      return <CreatePasswordForm />
    } else {
      return <FormDefault />
    }
  }
  return (
    <>
      {
        <RenderForm />
      }
    </>
  )
}