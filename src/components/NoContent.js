import React from "react";
import {
  Heading,
  Container,
  Highlight,
  Center,
  HStack,
  Flex
} from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons'

export default function FormUser({data}) {

  return (
    <>
      <Container maxW="8xl">
        <Flex placeContent='center' alignItems='center' gap='2' flexDirection='column' h='300px'>
            <Center mb={10}>
                <HStack bg='red' maxW='fit-content' p={2} borderRadius='100%'>
                    <CloseIcon fontSize={50} p={2} color='white' />
                </HStack>
            </Center>
            <Center>
                <Heading size='md' m={6}>
                    <Highlight
                        query='Email'
                        styles={{ px: '4', py: '2', rounded: 'full', bg: 'red', color: 'white' }}
                    >
                        Deberás validar tu Email antes de completar esta solicitud
                    </Highlight>
                </Heading>
            </Center>
        </Flex>
      </Container>
    </>
  );
}
