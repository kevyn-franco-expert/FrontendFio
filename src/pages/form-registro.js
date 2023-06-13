import {
  Container,
  Heading,
  Box,
  Divider,
  Flex,
  Center
} from "@chakra-ui/react";
import HeadTitle from "@/components/base/HeadTitle";
import FormsWithUbigeo from "@/components/formsWithUbigeo";
import React, { useEffect, useState } from "react";

export default function formRegistro() {
  const [fullNameData, setFullNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [documentNumberData, setDocumentNumberData] = useState("");
  const [phoneData, setPhoneData] = useState("");
  const [addressData, setAddressData] = useState("");
  const [termsData, setTermsData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // const schema = object({
  //   fullName: string()
  //     .required("El campo nombre es obligatorio")
  //     .min(1, "El nombre tiene que tener al menos un carácter")
  //     .max(100, "El nombre no puede superar los 100 carácteres"),
  //   DNI: strnumbering().optional(),
  //   phone: number()
  //     .required("La edad es obligatoria")
  //     .positive("La edad tiene que ser positiva")
  //     .max(90, "La edad no puede superar los 90"),
  //   email: string()
  //     .required("El email es obligatorio")
  //     .email("El email no tiene un formato válido"),
  //   isChosenOne: boolean(),
  // });

  return (
    <>
      <HeadTitle
        title="Pre Registro"
        description="Obtén tu línea de efectivo con nosotros"
      />
      <main>
        
        <Container
          maxW="6xl"
          pt={{ base: 10, md: 50 }}
          pb={{ base: 20, md: 100 }}
        >
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Heading className="title-black" as="h3" size="xl" mb={10}>
              Tu solicitud está Pre - aprobada, contínua registrándote
            </Heading>
            <Center my={5}>
              <Divider height={3} />
            </Center>
            <Box w="100%">
              <FormsWithUbigeo />
            </Box>
          </Flex>
        </Container>
      </main>
    </>
  );
}
