import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Heading,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Text,
  Flex,
  Spacer,
  Divider,
  Center
} from "@chakra-ui/react";
import useAPI from "@/hooks/useAPI";
import Modals from "@/components/Modal";

export default function Cronograma({data, scheduleData}) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setModalData({
      title:'Tu capital pendiente de pago es:',
      capital_pending: data.account_data.capital_pending,
      min: data.account_data.capital_pending,
      max: data.account_data.capital_pending,
      payment_day: data.account_data.payment_day,
      no_change: true
    })
     setLoading(true)
     try {
      setTimeout(() => {
        // const url = el.attributes.totalAmount.split('S/. ')[1]
        if (scheduleData) {
          fetch(scheduleData)
          .then(response => response.json())
          .then(info => {
          const miDeuda = info.data.reduce((acc, currentValue) => {
          const elementExist = acc.find(el => el.attributes.scheduleDate === currentValue.attributes.scheduleDate);

          if (elementExist) {
            return acc.map((el) => {
              if (el.attributes.scheduleDate === currentValue.attributes.scheduleDate) {
                return {
                  ...el,
                  attributes: {
                    totalAmount: 'S/. ' + (Number(el.attributes.totalAmount.split('S/. ')[1]) + Number(currentValue.attributes.totalAmount.split('S/. ')[1])),
                    scheduleDate: el.attributes.scheduleDate
                  }
                }
              }
        
              return el;
            });
          }
          
            return [...acc, currentValue];
          }, []);
          
          console.log(miDeuda);
          setHistory(miDeuda);
           setLoading(false)
          })
        }
      }, 5000);
     } catch (error) {
         console.error(error);
     }
  }, [])
  
  return (
    <>
      <Container maxW="8xl">
        <Heading size="sm" color="black">
            Cronograma de pagos
        </Heading>
        <TableContainer display={history && history.length ? '' : 'none'} mt={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Fecha Programada</Th>
                <Th>Monto de Cuota</Th>
              </Tr>
            </Thead>
            <Tbody>
            {history && history.map((data, idx) => (
              
              <Tr key={`${idx}-history`}>
                <Td>{data.attributes.scheduleDate}</Td>
                <Td>{data.totalAmount ? 'S/. ' + data.totalAmount : data.attributes.totalAmount}</Td>
              </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>
        {!history && <Text m={6}>No hay cronograma de pagos...</Text>}

        <Center>
          <Button onClick={() => setOpenModal(true)} mt={8} variant='outline' isLoading={loading} colorScheme="blue">
              SIMULA EL PAGO DE TU DEUDA
          </Button>
        </Center>
      </Container>
      <Modals type='calculator' data={modalData} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
    </>
  );
}


const statusWithdrawn = {
  WITHDRAWN: 'Retiro',
  PAID: 'Pagado',
  PAST_DUE: 'Vencido'
}