import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Heading,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  TableContainer,
  Text
} from "@chakra-ui/react";
import useAPI from "@/hooks/useAPI";
import Modals from "@/components/Modal";

export default function Cronograma({data, scheduleData, totalPay = 0}) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setModalData({
      title:'Tu capital pendiente de pago es:',
      capital_pending: totalPay,
      min: totalPay,
      max: totalPay,
      payment_day: data.account_data.payment_day,
      no_change: true
    })
     setLoading(true)
     try {
        if (scheduleData) {
          const miDeuda = scheduleData.data.reduce((acc, currentValue) => {
          const elementExist = acc.find(el => el.attributes.scheduleDate === currentValue.attributes.scheduleDate);

          if (elementExist) {
            return acc.map((el) => {
              if (el.attributes.scheduleDate === currentValue.attributes.scheduleDate) {
                return {
                  ...el,
                  attributes: {
                    totalAmount: 'S/. ' + (Number(el.attributes.totalAmount.split('S/. ')[1]) + Number(currentValue.attributes.totalAmount.split('S/. ')[1])).toFixed(2),
                    scheduleDate: el.attributes.scheduleDate,
                    status: el.attributes.status
                  }
                }
              }
        
              return el;
            });
          }
          
            return [...acc, currentValue];
          }, []);
          
          setHistory(miDeuda);
           setLoading(false)
        }
     } catch (error) {
         console.error(error);
     }
  }, [scheduleData, totalPay])
  
  return (
    <>
      <Container maxW="8xl">
        {/* <Heading size="sm" color="black">
            Cronograma de pagos
        </Heading> */}
        <Heading size="sm" color="black">
            <Text flexDirection={{base:'column', md:'row'}} display='flex' gap={2}>Tu deuda al día de hoy es:  <Badge w='fit-content' fontSize='lg' pt={{base: 1, md: 0}}  colorScheme='red'>S/ {totalPay}</Badge></Text>
        </Heading>
        <TableContainer display={history && history.length ? '' : 'none'} mt={8}>
          <Table border='1px solid #ddd' variant="simple">
            <Thead>
              <Tr>
                <Th>Fecha Programada</Th>
                <Th>Monto de Cuota</Th>
              </Tr>
            </Thead>
            <Tbody>
            {history && history.map((data, idx) => (
              
              <Tr display={data.attributes.status === 'PAID' ? 'none' : ''} key={`${idx}-history`}>
                <Td>{data.attributes.scheduleDate}</Td>
                <Td>{data.totalAmount ? 'S/. ' + data.totalAmount : data.attributes.totalAmount}</Td>
              </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>
        {!history && <Text m={6}>No hay cronograma de pagos...</Text>}
        {/* <Center>
          <Button onClick={() => setOpenModal(true)} mt={8} variant='outline' isLoading={loading} colorScheme="blue">
              SIMULA EL PAGO DE TU DEUDA
          </Button>
        </Center> */}
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