import React, { useState } from "react";
import { chakra, Tooltip, FormControl, FormLabel, Input, Flex, Image } from "@chakra-ui/react";
import RadioGroup from "./RadioGroup";

export default function DocumentType() {
    const [documentTypeValue, setDocumentTypeValue] = useState('DNI');
  
    return (
        <Flex
        p={2}
        w="auto"
        justifyContent="center"
        alignItems="start"
        flexDirection="column"
        className='document-types'
        >
            <chakra.h3
                mb={3}
                fontSize="lg"
                lineHeight="shorter"
                fontWeight="bold"
                >
                Tipo de documento
            </chakra.h3>
            <RadioGroup nameItem='documentType' items={documentType} setValue={setDocumentTypeValue} />
            <FormControl mt={5} isRequired>
                <FormLabel>{documentTypeValue}</FormLabel>
                <Flex flexDirection='row' gap={2}>
                    <Input placeholder='Documento de identidad' />
                    <Tooltip borderRadius={5} label="El digito verificador es el número que se encuentra en la parte superior derecha, al lado de los 8 dígitos de tu dni y separado con un guión." aria-label='A tooltip'>
                    <Input display={documentTypeValue === 'DNI' ? 'flex' : 'none'}  placeholder='Dígito' maxW="100px" />
                    </Tooltip>
                </Flex>
            </FormControl>
        </Flex>
    );
};

const documentType = ['DNI','Extranjeria'];