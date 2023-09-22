import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Heading,
  Container,
  Table,
  Thead,
  Tbody,
  Divider,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text
} from "@chakra-ui/react";
import useAPI from "@/hooks/useAPI";
import Cookies from 'js-cookie';

export default function FormUser({data}) {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);
  const [payments, setPayments] = useState(null);


  useEffect(() => {
     const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_WITHDRAWN_HISTORY + data.uuid + '/'
    //  const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_WITHDRAWN_HISTORY + 'b15ac003-cbfc-4bda-ba0c-a2f9eadf8a67/'
     setLoading(true)
     try {
         fetch(url)
         .then(response => response.json())
         .then(data => {
             setHistory(data.data.withdrawals);
             setPayments(data.data.payments);
         })
     } catch (error) {
         console.error(error);
     }
  }, [])
  

  return (
    <>
      <Container maxW="8xl">
        <Heading size="sm" color="black">
            Mi historial de prestamos
        </Heading>
        <TableContainer mt={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Fecha solicitud del préstamo</Th>
                <Th>Fecha vencimiento del prestamo</Th>
                <Th>Monto solicitado</Th>
                <Th>Estado</Th>
                <Th>Capital Pagado</Th>
                <Th>Capital Pendiente</Th>
              </Tr>
            </Thead>
            <Tbody>
            {history && history.map((data, idx) => (
              <Tr key={`${idx}-history`}>
                <Td>{moment(data.created_at).format("DD/MM/YYYY")}</Td>
                <Td>{data.due_date}</Td>
                <Td isNumeric>S/. {data.amount}</Td>
                <Td color={data.status === 'WITHDRAWN' ? 'yellow.600' : data.status === 'PAID' ? 'green' : 'red'}>{statusWithdrawn[data.status]}</Td>
                <Td isNumeric>{data.paid_capital.toFixed(2)}</Td>
                <Td isNumeric>{data.pending_capital.toFixed(2)}</Td>
              </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Divider my={10} />

        <Heading mt={10} size="sm" color="black">
            Pagos realizados
        </Heading>
        <TableContainer mt={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Banco</Th>
                <Th>Fecha transacción</Th>
                <Th textAlign='center'>Monto</Th>
                <Th textAlign='center'>Numero de transacción</Th>
              </Tr>
            </Thead>
            <Tbody>
            {payments && payments.map((data, idx) => (
              <Tr key={`${idx}-history`}>
                <Td>{data.bank}</Td>
                <Td>{moment(data.transaction_date).format("DD/MM/YYYY")}</Td>
                <Td isNumeric>S/. {data.amount}</Td>
                <Td textAlign='center'>{data.transaction_number}</Td>
              </Tr>
            ))}
            </Tbody>
          </Table>
        </TableContainer>
        {!history && <Text m={6}>No hay historial de préstamo...</Text>}
      </Container>
    </>
  );
}


const statusWithdrawn = {
  WITHDRAWN: 'Retirado',
  PAID: 'Pagado',
  PAST_DUE: 'Atrasado'
}