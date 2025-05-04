import React from "react";
import { chakra, Box, SimpleGrid, Flex, Image } from "@chakra-ui/react";

export default function Feature({features}){
  const Feature = (props) => {
    return (
      <Box className="feature-box" p={3} shadow={'lg'}  borderRadius='3xl' flexDirection={{base:'column'}} display='flex' justifyContent={'center'} alignItems={'center'} gap={5} py={4} px={10} my={4}>
        <Image
            width='100px'
            objectFit='contain'
            src={props.image}
            alt={'image of ' + props.title}
        />
        <Box textAlign={'center'}>
            <chakra.h3
            mb={4}
            fontSize="lg"
            fontWeight="bold"
            color='black'

            >
            {props.title}
            </chakra.h3>
            <chakra.p
            lineHeight="tall"
            color="black"
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
      maxW='6xl'
      bg='transparent'
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        columns={{base:1, md:2}}
        px={2}
        py={3}
        gap={8}
        mx="auto"
      >
        {
            features && features.map((feature, index) => (
                <Feature
                key={index}
                title={feature.title}
                image={feature.image}
                >
                {feature.content}
                </Feature>
            ))
        }
      </SimpleGrid>
    </Flex>
  );
};
