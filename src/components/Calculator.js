import {
  Box,
  Stack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import RadioGroup from "./RadioGroup";
import React, { useState, useEffect } from "react";
import SliderComponent from "./SliderComponent";

export default function Calculator({calculatorValues}) {
  const [sliderValue, setSliderValue] = useState(null);
  const [fieldValue, setFieldValue] = useState(null);
  const [modeValue, setModeValue] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [paydayValue, setPaydayValue] = useState(null);
  
  useEffect(() => {
    const datos = {
      amount: sliderValue, //monto
      mode: modeValue, //monthly or daily
      fields: fieldValue, //cuota
      payDay: paydayValue, //dia de pago
    };
    calculatorValues(datos);
  }, [calculatorValues]);

  useEffect(() => {
      if (fieldValue && paydayValue && sliderValue) {
        setShowTable(true)
        // aqui se pondra el fetch para obtener el resultado de los datos elegidos en la calculadora
      }
  }, [fieldValue && paydayValue && sliderValue])
  return (
    <Box>
      <Stack spacing={2} direction="column">
        <Heading size="sm" color="black">
          ¿Cuánto dinero necesitas?
        </Heading>
        <Heading size="2xl" pt="4" alignSelf={"center"} color="black">
          s/ {sliderValue}
        </Heading>
        <Box w="100%" p={2} pt={6} pb={2}>
          <SliderComponent min={250} max={2000} defaultValue={250} type='amount' valueSeted={setSliderValue} />
        </Box>
        <Box>
        <Tabs  onClick={() => setShowTable(false)} mt={4} align='center'>
          <TabList>
            <Tab>En meses</Tab>
            <Tab> En dias</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
            <Box pt={10}>
              {/* Cuotas mes */}
              <Text color="black" as="p">
                ¿En cuántas cuotas?
              </Text>
              <RadioGroup
                nameItem="months"
                items={months}
                setValue={setFieldValue}
              />
            </Box>
            </TabPanel>
            <TabPanel>
            <Box pt={10} className="asd" minW={{base: '100%', md: '540px'}}>
              {/* Cuotas mes */}
              <Text color="black" as="p">
                ¿En cuántas cuotas?
              </Text>
              <SliderComponent min={7} max={30} defaultValue={fieldValue} type='days' valueSeted={setFieldValue} />
            </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
       
        <Box pt={10}>
          <Text color="black" as="p">
            ¿Cuándo prefieres pagar la primera cuota?
          </Text>
          <RadioGroup
            bigger={true}
            nameItem="payDay"
            items={payDay}
            setValue={setPaydayValue}
          />
        </Box>
      </Stack>
      <Stack>
        {fieldValue && paydayValue && sliderValue && showTable && (
          <>
            <TableContainer
              mt={10}
              mb={2}
              border="1px solid #dadada"
              borderRadius={8}
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Fecha</Th>
                    <Th isNumeric>Monto a Pagar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {resultCalculator &&
                    resultCalculator[0].data.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.attributes.scheduleDate}</Td>
                        <Td isNumeric>{item.attributes.totalAmount}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Text color='gray'>
              *Los intereses cobrados son por un día. 
            </Text>
            <Text color='gray'>
            **Adelanta tus pagos sin
              costo extra y ahorra dinero.
            </Text>
          </>
        )}
      </Stack>
    </Box>
  );
}

const months = ["1", "2", "3", "4", "5", "6"];

const payDay = ["05/12/2022", "20/12/2022"];

const resultCalculator = [
  {
    data: [
      {
        type: "schedules",
        id: "None",
        attributes: {
          scheduleDate: "05/06/23",
          totalAmount: "S/. 272.26",
          status: "SCHEDULED",
        },
      },
      {
        type: "schedules",
        id: "None",
        attributes: {
          scheduleDate: "05/07/23",
          totalAmount: "S/. 276.97",
          status: "SCHEDULED",
        },
      },
      {
        type: "schedules",
        id: "None",
        attributes: {
          scheduleDate: "05/08/23",
          totalAmount: "S/. 249.59",
          status: "SCHEDULED",
        },
      },
      {
        type: "schedules",
        id: "None",
        attributes: {
          scheduleDate: "05/09/23",
          totalAmount: "S/. 216.95",
          status: "SCHEDULED",
        },
      },
      {
        type: "schedules",
        id: "None",
        attributes: {
          scheduleDate: "05/10/23",
          totalAmount: "S/. 182.19",
          status: "SCHEDULED",
        },
      },
      {
        type: "schedules",
        id: "None",
        attributes: {
          scheduleDate: "05/11/23",
          totalAmount: "S/. 151.65",
          status: "SCHEDULED",
        },
      },
    ],
  },
];
