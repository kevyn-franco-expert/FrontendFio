import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  Container,
  useToast
} from "@chakra-ui/react";
import Cookies from 'js-cookie';
import useInputValidators from "@/hooks/useInputValidators";
import useAPI from "@/hooks/useAPI";

export default function FormUser() {
  const [openModal, setOpenModal] = useState(false);
  const [phoneData, setPhoneData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [infoClient, setInfoClient] = useState("");
  const [fullName, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleOnlyNumbers } = useInputValidators();
  const { errorData, postData } = useAPI();
  const toast = useToast()

  useEffect(() => {
    // const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_INFO_CLIENT + Cookies.get('token') + '/'
    setLoading(true)
    const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_INFO_CLIENT + '9440af7c-4a8b-44f2-948f-ae0f43343a19/'
    try {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const info = data.data.data;
            setInfoClient(info);
            setFullname(info.name + ' ' + info.last_name_father + ' ' + info.last_name_mother)
            setPhoneData(info.mobile)
            setEmailData(info.email)
            setLoading(false)
        })
    } catch (error) {
        console.error(error);
    }
}, []);

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
            uuid: '9440af7c-4a8b-44f2-948f-ae0f43343a19', 
            mobile: phoneData, 
            email: emailData
        }
      postData(url, formData);
      try {
        const result = await postData(url, data);
        // setOpenModal(true);
        console.log(result);
        setLoading(false);
        toast({
            title: '¡Actualizacion Satisfactoria!',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
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
                value={fullName}
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
                value={infoClient.address}
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
            <Button isLoading={loading} colorScheme='blue' type="submit" maxW={300}>Actualizar información</Button>
          </Flex>
        </form>
      </Container>
    </>
  );
}
