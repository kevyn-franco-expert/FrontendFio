import React from "react";
import { chakra, Box, SimpleGrid, Flex, Image } from "@chakra-ui/react";

export default function Tips({features}){
  const Feature = (props) => {
    return (
      <Box boxShadow='md' backgroundColor={'#F2F2F2'} p={3} borderRadius='lg' flexDirection='row' display='flex' gap={5} my={4}>
        <Image
            width='45px'
            objectFit='contain'
            src={process.env.NEXT_PUBLIC_BASEURL + props.image}
            alt={'image of ' + props.title}
        />
        <Box flex={1} display='flex' alignItems={'center'}>
            <chakra.p
            lineHeight="tall"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            >
            {props.children}
            </chakra.p>
        </Box>
      </Box>
    );
  };

  return (
    <Flex
      p={2}
      w="auto"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
        <chakra.h3
            mb={3}
            fontSize="lg"
            lineHeight="shorter"
            fontWeight="bold"
            _light={{ color: "gray.900" }}
            >
              REQUISITOS
            </chakra.h3>
            <chakra.p
            lineHeight="tall"
            color="gray.600"
            _dark={{ color: "gray.400" }}
            >
            Lo que se necesita para solicitar un préstamo hipotecario en Fio:
            </chakra.p>
      <SimpleGrid
        columns={1}
        px={2}
        py={3}
        mx="auto"
      >
        {
            features && features.map((feature, index) => (
                <Feature
                key={index}
                title={feature.title}
                image={feature.image}
                >
                {feature.description}
                </Feature>
            ))
        }
      </SimpleGrid>
    </Flex>
  );
};
