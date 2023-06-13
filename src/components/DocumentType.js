import React, { useState, useEffect } from "react";
import { chakra, Tooltip, FormControl, FormLabel, Input, Flex, Image } from "@chakra-ui/react";
import RadioGroup from "./RadioGroup";
import useInputValidators from "@/hooks/useInputValidators";

export default function DocumentType({documentSeted, documentTypeSelected}) {
    const [documentType, setDocumentType] = useState('');
    const [ipClient, setIpClient] = useState('');
    const [documentTypeValue, setDocumentTypeValue] = useState(null);
    const [digitVerificator, setDigitVerificator] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const handleInputChange = (e) => setDocumentTypeValue(e.target.value)
    const handleDigitChange = (e) => setDigitVerificator(e.target.value)
    const { handleOnlyNumbers } = useInputValidators();
    
    useEffect(() => {
        try {
            fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                setIpClient(ip);
            })
        } catch (error) {
            console.error('Error al obtener la dirección IP:', error);
        }
    }, []);

    useEffect(() => {
        if (documentType === 'DNI' && documentTypeValue.length === 8 && digitVerificator) {
            const data = {
                    document_number: documentTypeValue,
                    public_ip: ipClient,
                    verifierNumber: digitVerificator
            }
            documentSeted(data);
            documentTypeSelected(documentType);
        } else if (documentTypeValue && documentTypeValue.length >= 8 && documentType) {
            const data = {
                document_number: documentTypeValue,
                public_ip: ipClient                
        }
            documentSeted(data);
            documentTypeSelected(documentType);
        } else {
            documentSeted(null);
            documentTypeSelected(null);
        }
      }, [documentType, documentTypeValue, digitVerificator]);

      useEffect(() => {
        setDocumentTypeValue('')
        setDigitVerificator('')
      },[documentType]);
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
                color="#C84044"
                >
                Tipo de documento
            </chakra.h3>
            <RadioGroup onClick={() => setSelectedOption(documentType)} nameItem='documentType' items={documentTypeList} setValue={setDocumentType} />
            <FormControl mt={5} isRequired>
                <FormLabel color="#C84044">{documentType}</FormLabel>
                <Flex flexDirection='row' gap={2}>
                    <Input type="tel" onInput={handleOnlyNumbers} isDisabled={documentType ? false : true} maxLength={documentType === 'DNI' ? 8 : 9} value={documentTypeValue} onChange={handleInputChange} placeholder='Documento de identidad' />
                    <Tooltip borderRadius={5} label="El digito verificador es el número que se encuentra en la parte superior derecha, al lado de los 8 dígitos de tu dni y separado con un guión." aria-label='A tooltip'>
                    <Input onInput={handleOnlyNumbers} isDisabled={documentType ? false : true} type="tel" onChange={handleDigitChange} display={documentType === 'DNI' ? 'flex' : 'none'} value={digitVerificator} maxLength={1} placeholder='Dígito' maxW="100px" />
                    </Tooltip>
                </Flex>
            </FormControl>
        </Flex>
    );
};

const documentTypeList = ['DNI','Extranjeria'];