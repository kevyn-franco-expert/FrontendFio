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

export default function Error({ statusCode }) {

  return (
    <>
      <Container maxW="8xl">
        <Flex placeContent='center' alignItems='center' gap='2' flexDirection='column' mb={5} h={{base: '400px', sm: '300px'}}>
            <Center mt={{base:5, sm: 16}}>
                <HStack maxW='200px' p={2} borderRadius='100%'>
                    <Image src='error.png' />
                </HStack>
            </Center>
            <Center>
            {statusCode && 
              <Heading size='xl' m={3}>
                    Ups.. Error {statusCode}
              </Heading>
            }  
            </Center>
            <Center>
              <Text size='sm' m={6}>
                  Intente de nuevo mas tarde
              </Text>
            </Center>
        </Flex>
      </Container>
    </>
  );
}

Error.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : error ? err.statusCode : 404
  return {res, statusCode}
}