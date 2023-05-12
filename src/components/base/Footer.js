import {
    Box,
    Flex,
    HStack,
    Image,
    Link,
    Stack,
    Text,
    VStack,
    Divider,
    Icon,
  } from "@chakra-ui/react";
  import React from "react";
  import { GrInstagram } from "react-icons/gr";
  import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
  import { FiTwitter } from "react-icons/fi";
  
  export default function Footer(){
    return (
      <Box bg="#c7323e">
        <Stack
          direction={{ base: "column", lg: "row" }}
          w="full"
          justify="space-between"
          p={10}
        >
          <Flex justify="center">
            <Image
              src="logo.svg"
              alt="Fio Logo"
              rounded="lg"
              width={{ base: "150px", lg: "200px" }}
              height={{ base: "75px", lg: "100px" }}
              my={{ base: 2, lg: 0 }}
            />
          </Flex>
          <HStack
            alignItems="start"
            flex={1}
            justify="space-around"
            fontSize={{ base: "12px", md: "16px" }}
            color="white"
            textAlign={{ base: "center", md: "left" }}
          >
            <Flex justify="start" direction="column">
              <Text as='b'>Acerca de Fio</Text>
              <Link>Elige tu Préstamo</Link>
              <Link>Benefícios</Link>
              <Link>Preguntas frecuentes</Link>
              <Link>Libro de Reclamaciones</Link>
              <Image
              width={{ base: "80px", lg: "100px" }}
              mt={3}
              src="libro-reclamaciones.svg"
              />
            </Flex>
          </HStack>
          <HStack
            alignItems="start"
            flex={3}
            justify="end"
            fontSize={{ base: "12px", md: "16px" }}
            color="white"
            _dark={{ color: "white" }}
            textAlign={{ base: "center", md: "left" }}
          >

            <Flex justify="start" direction="column">
            <Text as='b'>Contacto</Text>
              <Text color='white'>Disponible de Lunes a Viernes</Text>
              <Text color='white'>9:00 am - 6:00 pm</Text>
              <Link href="mailto:contacto@fio.pe">Contacto@fio.pe</Link>
              <Text color='white'>Habla con nuestros asesores</Text>
              <VStack py={3}>
          <HStack justify="center" gap={2}>
            <Link className="social-icons">
              <Icon
                _dark={{ color: "white" }}
                h="20px"
                w="20px"
                as={FaFacebookF}
              />
            </Link>
            <Link className="social-icons">
              <Icon
                _dark={{ color: "white" }}
                h="20px"
                w="20px"
                as={FiTwitter}
              />
            </Link>
            <Link className="social-icons">
              <Icon
                _dark={{ color: "white" }}
                h="20px"
                w="20px"
                as={GrInstagram}
              />
            </Link>
            <Link className="social-icons">
              <Icon
                _dark={{ color: "white" }}
                h="20px"
                w="20px"
                as={FaLinkedinIn}
              />
            </Link>
          </HStack>
        </VStack>
            </Flex>
          </HStack>
        </Stack>
      </Box>
    );
  };
  
  