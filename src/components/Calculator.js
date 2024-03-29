import {
  Box,
  Stack,
  Skeleton,
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
  VisuallyHidden
} from "@chakra-ui/react";
import RadioGroup from "./RadioGroup";
import React, { useState, useEffect } from "react";
import SliderComponent from "./SliderComponent";

export default function Calculator({location = null, defaultValueSlider, noChanges = false, payment_day, calculatorValues, calculatorResult, min = 50, max = 2000, title = '¿Cuánto dinero necesitas?', dayFive = '2023-10-05', daytwenty = '2023-10-20'}) {
  const [sliderValue, setSliderValue] = useState(null);
  const [fieldValue, setFieldValue] = useState(null);
  const [modeValue, setModeValue] = useState('monthly');
  const [showTable, setShowTable] = useState(false);
  const [paydayValue, setPaydayValue] = useState(null);
  const [paydayValueFormat, setPaydayValueFormat] = useState(20);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const payDay = [dayFive, daytwenty];
  
  useEffect(() => {
    if (payment_day) {
      setPaydayValue(payment_day)
    }

    if (defaultValueSlider) {
      setSliderValue(defaultValueSlider);
    }

    if (location === 'home'){
      setSliderValue(min);
    }
  }, [])
  

  useEffect(() => {
    if (payment_day) {
      setPaydayValueFormat(payment_day)
    } else {
      setPaydayValueFormat((paydayValue) ? paydayValue.split('-')[2] : paydayValue)
    }

    const datos = {
      amount: sliderValue, //monto
      mode: modeValue, //monthly or daily
      fields: fieldValue, //cuota
      payDay: paydayValueFormat, //dia de pago
    };

    calculatorResult(datos);

    (async () => {
      try {
        setLoading(true)
        if (sliderValue && modeValue && fieldValue && paydayValueFormat) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}${process.env.NEXT_PUBLIC_API_SCHEDULES}/?fields[amount]=${sliderValue}&fields[mode]=${modeValue}&fields[value]=${fieldValue}&fields[day]=${paydayValueFormat}&fields[payment]=false`);
          const data = await res.json();
          calculatorValues(data);
          setResult(data);
          setShowTable(true)
          setLoading(false);
        }
      } catch (err) {
        setShowTable(false)
      }
    
    })();

  }, [sliderValue, modeValue, fieldValue, paydayValue, paydayValueFormat]);

  return (
    <Box>
      <Stack spacing={2} direction="column">
        <Heading size="sm" color="black">
          {title}
        </Heading>
        <Heading size="2xl" pt="6" alignSelf={"center"} color="black">
          s/ {sliderValue}
        </Heading>
        {(!noChanges) && 
          <Box w="100%" p={2} pt={6} pb={2}>
              <SliderComponent min={min} max={defaultValueSlider ? defaultValueSlider : max} step={50} defaultValue={defaultValueSlider ? defaultValueSlider : min} type='amount' valueSeted={setSliderValue} />
          </Box>
        }
        <Box>
        <Tabs   onClick={() => setShowTable(false)} mt={4} align='center'>
        <VisuallyHidden> <TabList>
            <Tab>En meses</Tab>
            <Tab> En dias</Tab>
          </TabList> </VisuallyHidden>

          <TabPanels>
            <TabPanel>
            <Box pt={noChanges ? 2 : 10}>
              {/* Cuotas mes */}
              <Text color="black" as="p" mb={7}>
                ¿En cuántas cuotas desea pagar?
              </Text>
              <RadioGroup
                nameItem="months"
                items={months}
                setValue={setFieldValue}
              />
            </Box>
            </TabPanel>
            <TabPanel>
            <Box pt={10} minW={{base: '100%', md: '540px'}}>
              {/* Cuotas mes */}
              <Text color="black" as="p">
                ¿En cuántas cuotas?
              </Text>
              <SliderComponent min={7} max={30} step={1} defaultValue={fieldValue} type='days' valueSeted={setFieldValue} />
            </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
       
        <Box pt={10}>
        {payment_day && <Text mb={8} color="black" as="p">
            Tu fecha de pago es el <b>{payment_day}</b> de cada mes.
          </Text>}
          {!payment_day && 
          
          <>
            <Text color="black" as="p">
            ¿Cuándo prefieres pagar la primera cuota?
            </Text>
            <RadioGroup
              bigger={true}
              nameItem="payDay"
              items={payDay}
              setValue={setPaydayValue}
            />
          </>
          }
         
        </Box>
      </Stack>
      <Stack>
        {showTable && loading && <Skeleton mt={10} borderRadius={8} height='250px' />}
        {fieldValue && paydayValue && sliderValue && showTable && !loading && (
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
                  {result &&
                    result.data.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.attributes.scheduleDate}</Td>
                        <Td isNumeric>{item.attributes.totalAmount}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Text color='gray'>
              * Los montos que visualiza están calculados en base a la fecha que se realiza la simulación
            </Text>
            <Text color='gray'>
              ** Considerar horario de atención para su solicitud de 9:00 am a 6:00 pm
            </Text>
            {/* <Text color='gray'>
              ***Los intereses cobrados son por un día. 
            </Text>
            <Text color='gray'>
              ****Adelanta tus pagos sin
              costo extra y ahorra dinero.
            </Text>
             */}
          </>
        )}
      </Stack>
    </Box>
  );
}


const months = ["1", "2", "3", "4", "5", "6"];