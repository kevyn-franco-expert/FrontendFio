import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Container
} from "@chakra-ui/react";
import Cookies from 'js-cookie';
import useInputValidators from "@/hooks/useInputValidators";

export default function FormUser() {
  const [openModal, setOpenModal] = useState(false);
  const [phoneData, setPhoneData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleOnlyNumbers } = useInputValidators();

  const handleInputChange = (event) => {
    if (event.target.name === "phone") {
      setPhoneData(event.target.value);
    } else if (event.target.name === "email") {
      setEmailData(event.target.value);
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (emailData || phoneData) {
        const url = process.env.NEXT_PUBLIC_API_UPDATE_INFO_CLIENT
        const formData = 
        {
            uuid: Cookies.get('token'), 
            mobile: phoneData, 
            email: emailData
        }
      postData(url, formData);
      try {
        const result = await postData(url, data);
        // setOpenModal(true);
        console.log(result);
        setLoading(false);
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Container maxW="8xl">
        <form onSubmit={handleOnSubmit}>
          <Flex p={4} flexDirection="column" gap={6}>
            <FormControl isRequired>
              <FormLabel>
                <Flex className={`input-position fill`}>1</Flex> Nombre Completo
              </FormLabel>
              <Input
                type="text"
                name="fullName"
                value="Nombre completo"
                isDisabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Flex className={`input-position fill`}>2</Flex>
                Dirección
              </FormLabel>
              <Input
                type="text"
                name="address"
                value="Direccion del usuario"
                isDisabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Flex className={`input-position ${phoneData ? "fill" : ""}`}>
                  3
                </Flex>
                Celular
              </FormLabel>
              <Input
                type="tel"
                name="phone"
                value={phoneData}
                onChange={handleInputChange}
                onInput={handleOnlyNumbers}
                maxLength={9}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Flex className={`input-position ${emailData ? "fill" : ""}`}>
                  4
                </Flex>
                Email
              </FormLabel>
              <Input
                type="email"
                name="email"
                value={emailData}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button colorScheme='blue' maxW={300}>Actualizar información</Button>
          </Flex>
        </form>
      </Container>
    </>
  );
}
