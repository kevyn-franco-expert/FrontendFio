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
  FormHelperText,
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
import Calculator from './Calculator';


export default function forms({formType}) {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState('')
  const [numberBank, setNumberBank] = useState('')
  const handleInputChange = (e) => setInput(e.target.value)
  const handleNumberBank = (e) => setNumberBank(e.target.value)
  const isError = input === '';
  const isNumberBankError = numberBank === '';
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

  //form

  const FormPreApproved = () => {
    return (
        <Flex p={4} flexDirection='column' gap={6}>
        <FormControl isRequired>
            <FormLabel><Flex className={`input-position fill`}>1</Flex> Banco </FormLabel>
            <Input onInput={handleOnlyCharacters} placeholder='Banco' name='bank' />
        </FormControl>
           
        <FormControl isRequired>
            <FormLabel><Flex className={`input-position fill`}>2</Flex> Numero de cuenta </FormLabel>
            <Input onInput={handleOnlyNumbers} placeholder='Numero de cuenta' type='tel' name='numberbank' />
        </FormControl>
        
        <Stack>
            <FormLabel position='relative'><Flex className={`input-position fill`}>3</Flex> </FormLabel>
            <Box boxShadow='base' p={6} borderRadius={10}>
                <Calculator  />
            </Box>
        </Stack>
        </Flex>
    )
  }

  return (
    <>
      {
        <FormPreApproved />
      }
    </>
  )
}