import {
  Box,
  Divider,
  Flex,
  Center,
  Select,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
  VStack,
  AbsoluteCenter,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import useUbigeo from "@/hooks/useUbigeo";
import useAPI from '@/hooks/useAPI';
import useInputValidators from "@/hooks/useInputValidators";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Modals from "@/components/Modal";
import { StoreContext } from "@/store/StoreProvider";
import * as Yup from "yup";

export default function formRegistro() {
  const [fullNameData, setFullNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [documentNumberData, setDocumentNumberData] = useState("");
  const [phoneData, setPhoneData] = useState("");
  const [addressData, setAddressData] = useState("");
  const [termsData, setTermsData] = useState("");
  const [UUID, setUUID] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [store] = useContext(StoreContext)
  const { user } = store;
  const {
    departaments,
    provinces,
    districts,
    selectedDepartament,
    setSelectedDepartament,
    selectedProvince,
    setSelectedProvince,
    selectedDistrict,
    setSelectedDistrict,
  } = useUbigeo();

  const { loading, errorData, postData } = useAPI();
  const { handleOnlyNumbers, handleOnlyCharacters } = useInputValidators();

  useEffect(() => {
    if(Object.keys(user).length !== 0 && user.constructor === Object) {
      setFullNameData(user.fullName);
      setDocumentNumberData(user.documentNumber);
      setUUID(user.uuid);
      console.log("clientData", JSON.stringify(user))
    }
  }, [])

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (
      fullNameData &&
      emailData &&
      documentNumberData &&
      phoneData &&
      addressData &&
      termsData
    ) {
        const url = process.env.NEXT_PUBLIC_CLIENTS
        const formData = {
          data:{
            attributes: {
              documentNumber: documentNumberData,
              uuid:"39ae0a2e-e5ac-41d4-bde0-f9412423d84a",
              fullName: fullNameData,
              email: emailData,
              mobile: phoneData,
              district: selectedDistrict,
              address: addressData,
              optIn:"1"
            },
            type:"clients"
        }
      }
      postData(url, formData);
      try {
        const result = await postData(url, data);
        setOpenModal(true);
        console.log(result);
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
      }
    }
  };

  const handleInputChange = (event) => {
    if (event.target.name === "department") {
      setSelectedDepartament(event.target.value);
    } else if (event.target.name === "province") {
      setSelectedProvince(event.target.value);
    } else if (event.target.name === "district") {
      setSelectedDistrict(event.target.value);
    } else if (event.target.name === "fullName") {
      setFullNameData(event.target.value);
    } else if (event.target.name === "DNI") {
      setDocumentNumberData(event.target.value);
    } else if (event.target.name === "address") {
      setAddressData(event.target.value);
    } else if (event.target.name === "phone") {
      setPhoneData(event.target.value);
    } else if (event.target.name === "email") {
      setEmailData(event.target.value);
    } else if (event.target.name === "terms") {
      setTermsData(event.target.checked);
    }
  };

  return (
    <>
      <form className="formik-form" onSubmit={handleOnSubmit}>
        <Modals type="pre-register" fullName={fullNameData} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <FormLabel></FormLabel>
            <FormLabel htmlFor="fullName">
              <Flex className={`input-position ${fullNameData ? "fill" : ""}`}>
                1
              </Flex>
              Nombre Completo
            </FormLabel>
            <Input
              type="text"
              name="fullName"
              value={fullNameData}
              onInput={handleOnlyCharacters}
              onChange={handleInputChange}
              isDisabled={Object.keys(user).length !== 0 && user.constructor === Object}
            />
            {/* <FormErrorMessage>El nombre completo es requerido</FormErrorMessage> */}
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex
                className={`input-position ${emailData ? "fill" : ""}`}
              >
                2
              </Flex>
              Correo
            </FormLabel>
            <Input
              name="email"
              value={emailData}
              onChange={handleInputChange}
              type="tel"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex className={`input-position ${documentNumberData ? "fill" : ""}`}>
                3
              </Flex>
              DNI
            </FormLabel>
            <Input
              name="DNI"
              value={documentNumberData}
              onInput={handleOnlyNumbers}
              onChange={handleInputChange}
              maxLength={8}
              isDisabled={Object.keys(user).length !== 0 && user.constructor === Object}
              type="tel"
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex className={`input-position ${phoneData ? "fill" : ""}`}>
                4
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
            <FormLabel htmlFor="department">
              <Flex
                className={`input-position ${
                  selectedDepartament ? "fill" : ""
                }`}
              >
                5
              </Flex>
              Departamento
            </FormLabel>
            <Select
              id="department"
              name="department"
              className="select-input"
              value={selectedDepartament}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar departamento</option>
              {departaments.map((departamento) => (
                <option
                  key={departamento.coddepartamento}
                  value={departamento.coddepartamento}
                >
                  {departamento.departamento}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="province">
              <Flex
                className={`input-position ${selectedProvince ? "fill" : ""}`}
              >
                6
              </Flex>
              Provincia
            </FormLabel>
            <Select
              id="province"
              name="province"
              className="select-input"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Seleccionar provincia</option>
              {provinces.map((provincia) => (
                <option
                  key={provincia.codprovincia}
                  value={provincia.codprovincia}
                >
                  {provincia.provincia}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="district">
              <Flex
                className={`input-position ${selectedDistrict ? "fill" : ""}`}
              >
                7
              </Flex>
              Distrito
            </FormLabel>
            <Select
              id="district"
              name="district"
              className="select-input"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Seleccionar distrito</option>
              {districts.map((distrito) => (
                <option key={distrito.coddistrito} value={distrito.coddistrito}>
                  {distrito.distrito}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex
                className={`input-position ${selectedDistrict ? "fill" : ""}`}
              >
                8
              </Flex>
              Dirección
            </FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              value={addressData}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <Checkbox
              id="terms"
              name="terms"
              colorScheme="red"
              size="lg"
              my={4}
              onChange={handleInputChange}
            >
              Acepto los términos y condiciones
            </Checkbox>
          </FormControl>
          <Center height="50px">
            <Divider />
          </Center>
          <Box position="relative" w="100%">
            <AbsoluteCenter my={6}>
              <Button
                minW={{ base: "80%", sm: "80%", md: "500px" }}
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                isDisabled={!termsData}
              >
                SIGUIENTE <ChevronRightIcon />
              </Button>
            </AbsoluteCenter>
          </Box>
        </VStack>
      </form>
    </>
  );
}
