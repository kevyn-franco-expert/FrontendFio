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

export default function Cronograma({data}) {
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
    console.log('modalData',modalData)
     const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_WITHDRAWN_HISTORY + data.uuid + '/'
     setLoading(true)
     try {
         fetch(url)
         .then(response => response.json())
         .then(info => {
          setHistory((info.data.withdrawals && info.data.withdrawals.length > 0) ? info.data.withdrawals : null);
          setLoading(false)
         })
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
                <Td>{moment(data.created_at).format("DD/MM/YYYY")}</Td>
                <Td>{data.due_date}</Td>
              </Tr>
            ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Fecha Programada</Th>
                <Th>Monto de Cuota</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        {!history && <Text m={6}>No hay cronograma de pagos...</Text>}

        <Center height='50px'>
          <Divider orientation='horizontal' />
        </Center>
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