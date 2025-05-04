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
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GrInstagram } from "react-icons/gr";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer({data}) {

  return (
    <Box bg="#B91428">
      <Container maxW="8xl">
        <Stack
          direction={{ base: "column", lg: "row" }}
          w="full"
          justify="space-between"
          p={10}
        >
          <Flex justify={{base:"start", lg:"center"}}>
            <Image
              // src={data && data.data[0].attributes.image}
              src={"/logo.svg"}
              alt="Fio Logo"
              rounded="lg"
              width={{ base: "100px", lg: "100px" }}
              height={{ base: "35px", lg: "50px" }}
              my={{ base: 2, lg: 0 }}
            />
          </Flex>
          <HStack
            alignItems="start"
            flex={1}
            justify={{base:"start", lg:"space-around"}}
            fontSize={{ base: "16px", lg: "16px" }}
            color="white"
            textAlign="left"
          >
            <Flex justify="start" direction="column">
              <Text color="white">Acerca de Fio</Text>
            {data && data.included.map((about, index) => (
                <div key={index}>
                {about.type === 'AboutInfo' && (
                  <>
                    <Link key={about.id} href={about.attributes.link} color='white'>{about.attributes.name}</Link>
                  </>
                )}
              </div>  
              ))}
              <Image
                width={{ base: "80px", lg: "100px" }}
                mt={3}
                mb={{base:'25px', lg:'0px'}}
                src="libro-reclamaciones.svg"
              />
            </Flex>
          </HStack>
          <HStack
            alignItems={{base:"start", lg: "start"}}
            flex={3}
            justify={{base:"start", lg:"end"}}
            fontSize={{ base: "16px", lg: "16px" }}
            color="white"
            _dark={{ color: "white" }}
            textAlign='left'
          >
            <Flex justify="start" direction="column">
              {data && data.included.map((contact, index) => (
                <div key={index}>
                {contact.type === 'ContactInfo' && (
                  <>
                    <Text as="b">{contact.attributes.name}</Text>
                    <Text color="white">{contact.attributes.scheduleLabel}</Text>
                    <Text color="white">{contact.attributes.schedule}</Text>
                    <Link href={`mailto:${contact.attributes.email}`}>{contact.attributes.email}</Link> <br/>
                    <Link href={contact.attributes.redirectLink}>{contact.attributes.redirectName}</Link>
                  </>
                )}
              </div>  
              ))}
              <VStack py={3}>
                <Flex alignSelf={'flex-start'} gap={2} alignItems={'start'}>
                  <Link href='https://www.facebook.com/Fioprestamos/' backgroundColor={'white'} className="social-icons">
                    <Icon
                      color={"#B91428!important"}
                      h="20px"
                      w="20px"
                      as={FaFacebookF}
                    />
                  </Link>
                  <Link href='https://www.instagram.com/fio.prestamos' backgroundColor={'white'} className="social-icons">
                    <Icon
                      color={"#B91428!important"}
                      h="20px"
                      w="20px"
                      as={GrInstagram}
                    />
                  </Link>
                  
                  {data && data.included.map((contact, index) => (
                <Box display={contact.type !== 'ContactInfo' ? 'none' : '' } key={index}>
                {contact.type === 'ContactInfo' && (
                  <Link href={contact.attributes.redirectLink} backgroundColor={'white'} className="social-icons">
                    <Icon
                      color={"#B91428!important"}
                      h="20px"
                      w="20px"
                      as={FaWhatsapp}
                    />
                  </Link>
                )}
                </Box>
                  ))}
                </Flex>
              </VStack>
            </Flex>
          </HStack>
        </Stack>
        <Divider orientation="horizontal" />
        <Stack
          direction={{ base: "column", lg: "row" }}
          p={4}
          align="center"
          justify="space-between"
          gap={2}
        >
          <Flex gap={3}>
            
            <Link href={data && data.data[0].attributes.policy} color="white" download>Políticas de Privacidad</Link>
            <Link href={data && data.data[0].attributes.terms} color="white" download>Términos y Condiciones</Link>
          </Flex>
          <Box>
            <Text color="white" maxW={400}>
              FIO PERÚ es una empresa registrada en la UIF de la
              Superintendencia de Banca, Seguros y AFP
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
