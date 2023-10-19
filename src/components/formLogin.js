import {
  Box,
  Divider,
  Flex,
  Center,
  Text,
  Input,
  FormControl,
  FormLabel,
  VStack,
  AbsoluteCenter,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import useAPI from '@/hooks/useAPI';
import useInputValidators from "@/hooks/useInputValidators";
import { useRouter } from 'next/navigation'
import { StoreContext } from "@/store/StoreProvider";
import Cookies from "js-cookie";
import { useToast } from '@chakra-ui/react'

export default function formLogin() {
  const toast = useToast()
  const router = useRouter()
  const [dniValue, setDniValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [store] = useContext(StoreContext)
  const { section } = store;
  const { loading, errorData, postData } = useAPI();
  const { handleOnlyNumbers } = useInputValidators();

  useEffect(() => {
    setDniValue(section.document_number || '')
  }, [])

  
  const SetCookie = (name, value) => {
    Cookies.set(name, value, {
      expires: 1,
    });
  };
  
  
  const logIn = async (event) => {
    event.preventDefault();
    if (Cookies.get('loggedIn')) {
      router.push('/mi-cuenta')
    } else {
      try {
        const url = '/api/login/';
        const values = {
          password: passwordValue,
          document_number: dniValue
        }
        const result = await postData(url, values);
        if (result && result.data) {
          SetCookie('loggedIn', true);
          SetCookie('token', result.data.token);
          SetCookie('origin', result.data.origin);
          SetCookie('client', result.data.client_id);
          SetCookie('account', result.data.has_account);

          const JsonResult = {
            token: result.data.token,
            origin: result.data.origin,
            client: result.data.client_id,
            account: result.data.has_account,
            uuid: result.data.uuid,
            min: result.data.get_minimum_amount_withdrawn,
            max: result.data.get_maximum_amount_withdrawn,
            min_days: result.data.get_minimum_days_withdrawn,
            account_data: result.data.account_data ? result.data.account_data : null,
            email_validated: result.data.email_validated,
            dni: dniValue,
            firstDayFive: result.data.first_day_five,
            firstDayTwenty: result.data.first_day_twenty,
            firstMinimumAmountWithdrawn: result.data.get_first_minimum_amount_withdrawn
          };

          SetCookie('user-data', JSON.stringify(JsonResult))
          sessionStorage.setItem("userDataSession", JSON.stringify(JsonResult));
          setErrorLogin('')
          router.push('/mi-cuenta');
        } else if (result && result.errors) {
          setErrorLogin(result.errors.detail)
        }
        
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
      }
      router.push('/mi-cuenta')
    }
  }
  
  const handleInputLoginChange = (event) => {
    if (event.target.name === "DNI") {
      setDniValue(event.target.value);
    } else if (event.target.name === "password") {
      setPasswordValue(event.target.value);
    }
  };

  return (
    <>
      <form className="formik-form">
        <VStack spacing={4} align="flex-start" mb={{base: 10, md: 0}}>
          <FormControl>
            <FormLabel htmlFor="fullName">
              <Flex className={`input-position ${dniValue ? "fill" : ""}`}>
                1
              </Flex>
              DNI
            </FormLabel>
            <Input
              type="tel"
              name="DNI"
              value={dniValue}
              onInput={handleOnlyNumbers}
              onChange={handleInputLoginChange}
              isDisabled={loading}
              maxLength={8}
            />
          </FormControl>
          
          <FormControl>
            <FormLabel>
              <Flex className={`input-position ${passwordValue ? "fill" : ""}`}>
                2
              </Flex>
              Ingresa contraseña *
            </FormLabel>
            <Input
              name="password"
              value={passwordValue}
              onChange={handleInputLoginChange}
              isDisabled={loading}
              type="password"
            />
          </FormControl>
        
          <Center height="50px">
            <Divider />
          </Center>
          <Box position="relative" w="100%">
            <AbsoluteCenter my={6}>
              <Button onClick={logIn} isLoading={loading} minW={{base: '160px', sm: '80%', md: '500px'}} maxW={160} type="submit" colorScheme="blue" >
                  INGRESAR
                </Button>
                <Text color='red' align='center' mt={3}>{errorLogin}</Text>
            </AbsoluteCenter>
          </Box>
        </VStack>
      </form>
    </>
  );
}
