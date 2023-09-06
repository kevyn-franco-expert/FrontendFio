import React from "react";
import {
  Heading,
  Container,
  Image,
  Center,
  HStack,
  Flex,
  Text
} from "@chakra-ui/react";

export default function FormUser({data}) {

  return (
    <>
      <Container maxW="8xl">
        <Flex placeContent='center' alignItems='center' gap='2' flexDirection='column' h={{base: '400px', sm: '300px'}}>
            <Center mt={{base:5, sm: 16}}>
                <HStack maxW='200px' p={2} borderRadius='100%'>
                    <Image src='no-email.png' />
                </HStack>
            </Center>
            <Center>
              <Heading size='xl' m={3}>
                      Ups..
              </Heading>
            </Center>
            <Center>
              <Text size='sm' m={6}>
                  Deberás validar tu <b>Email</b> antes de completar esta solicitud
              </Text>
            </Center>
        </Flex>
      </Container>
    </>
  );
}
