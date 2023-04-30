import React from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  Image,
  IconButton,
  CloseButton,
  Link,
} from "@chakra-ui/react";
import NextLink from 'next/link'
import { AiOutlineMenu } from "react-icons/ai";

export default function Header(){
  const bg = useColorModeValue("#d62732");
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex maxW={{ base: "xl", md: "8xl" }} alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Fio - Home"
              display="flex"
              alignItems="center"
            >
            <Image
              src="logo.svg"
              alt="Fio logo"
              width={{ base: "75px", lg: "80px" }}
              height={{ base: "45px", lg: "50px" }}
              my={{ base: 2, lg: 0 }}
            />
              <VisuallyHidden>Fio</VisuallyHidden>
            </chakra.a>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Link as={NextLink} href='/'><Button className="nav-li" colorScheme="brand">Inicio</Button></Link>
              {/* <Link as={NextLink} href='/productos'><Button className="nav-li" colorScheme="brand">Productos</Button></Link> */}
              <Link as={NextLink} href='/nosotros'><Button className="nav-li" colorScheme="brand">Nosotros</Button></Link>
              <Link as={NextLink} href='/como-funciona'><Button className="nav-li" colorScheme="brand">¿Cómo funciona?</Button></Link>
              <Link as={NextLink} href='/preguntas-frecuentes'><Button className="nav-li" colorScheme="brand">Preguntas Frecuentes</Button></Link>
            </HStack>
            <button className="btn-outline">
              Área de clientes
            </button>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" className="nav-li" colorScheme="brand" variant="ghost">Inicio</Button>
                <Button w="full" className="nav-li" colorScheme="brand" variant="ghost">Productos</Button>
                <Button w="full" className="nav-li" colorScheme="brand" variant="ghost">Nosotros</Button>
                <Button w="full" className="nav-li" colorScheme="brand" variant="ghost">¿Cómo funciona?</Button>
                <Button w="full" className="nav-li" colorScheme="brand" variant="ghost">Preguntas Frecuentes</Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
