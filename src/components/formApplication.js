import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Select,
} from "@chakra-ui/react";
import Calculator from "./Calculator";
import useInputValidators from "@/hooks/useInputValidators";

export default function formApplication() {
  const [openModal, setOpenModal] = useState(false);
  const [calculatorData, setCalculatorData] = useState(null)
  const [formatAccount, setFormatAccount] = useState("3,10");
  const [banks, setBanks] = useState(null);
  const [bankSelected, setBankSelected] = useState("");
  const [input, setInput] = useState("");
  const [numberBank, setNumberBank] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleOnlyNumbers } = useInputValidators();

  useEffect(() => {
    console.log('calculatorData', calculatorData);
  }, [calculatorData])

  useEffect(() => {
    const fetchBankData = async () => {
      setLoading(true)
      try {
        const url =
          process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_BANKS;
        const response = await fetch(url);
        const data = await response.json();
        if (!banks) {
          setBanks(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBankData();
  }, []);

  const handleNumberBankChange = (event) => {
    const value = event.target.value;
    // const positions = [3, 7]; // Posiciones de separación deseadas
    const positions = [formatAccount]; // Posiciones de separación deseadas
    const regex = new RegExp(`(\\d{${positions.join("}|\\d{")}})`, "g");
    const formattedValue = value.replace(regex, "$1-");
    setNumberBank(formattedValue);
  };

  const handleOnSubmit = () => {
    console.log('submit')
  }

  return (
    <>
    <form onSubmit={handleOnSubmit}>
      <Flex p={4} flexDirection="column" gap={6}>
        <FormControl isRequired>
          <FormLabel>
            <Flex className={`input-position fill`}>1</Flex> Banco
          </FormLabel>
          <Select
            id="bank"
            name="bank"
            className="select-input"
            value={bankSelected}
            onChange={(e) => {setBankSelected(e.target.value);setFormatAccount(e.target.selectedOptions[0].getAttribute('format'))}}
          >
            <option value="">Seleccionar Banco</option>
            {banks &&
              banks.data.map((bank) => (
                <option
                  key={bank.id}
                  format={bank.attributes.format}
                  value={bank.attributes.name}
                >
                  {bank.attributes.name}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>
            <Flex className={`input-position fill`}>2</Flex> Numero de cuenta
          </FormLabel>
          <Input
            name="numberbank"
            type="tel"
            className="select-input"
            value={numberBank}
            onChange={handleNumberBankChange}
            maxLength={20}
          />
        </FormControl>

        <Stack>
          <FormLabel position="relative">
            <Flex className={`input-position fill`}>3</Flex>
          </FormLabel>
          <Box boxShadow="base" p={6} borderRadius={10}>
            <Calculator calculatorValues={setCalculatorData}  />
            
          </Box>
        </Stack>
      </Flex>
    </form>
    </>
  );
}