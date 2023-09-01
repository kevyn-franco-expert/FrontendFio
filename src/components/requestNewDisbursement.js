import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Badge,
  Text
} from "@chakra-ui/react";
import useAPI from "@/hooks/useAPI";
import Modals from "@/components/Modal";
import Calculator from "./Calculator";
import Cookies from "js-cookie";

export default function requestNewDisbursement({data}) {
    const [calculatorData, setCalculatorData] = useState(null)
    const [calculatorValues, setCalculatorValues] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openModalPin, setOpenModalPin] = useState(false);
    const [openModalData, setOpenModalData] = useState(null);
    const [ifSendIt, setIfSendIt] = useState(false);
    const [canDisbursement, setCanDisbursement] = useState(false);
    const { errorData, postData, getData } = useAPI();

    const SetCookie = (name, value) => {
      Cookies.set(name, value, {
        expires: 1,
      });
    };
    

    useEffect(() => {
      console.log(data)
      const PinContent = {
        title: 'Solo un paso más',
        content: 'Tu solicitud esta pendiente de confirmación. Ingresa el codigo enviado a tu Celular'
      }
      setOpenModalData(PinContent);
      accountInfo();
    }, [])
    
    
  const accountInfo = async () => {
    if (data && Object.keys(data.account_data).length) {
      const accountInformation = await getData(data.account_data.account_info)

      if (!accountInformation.errors && accountInformation.data.attributes.submittedWithdrawals.length === 0 && data.account_data.can_withdraw) {
        setCanDisbursement(true)
      }
    }
  };

  const handlePost = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_WITHDRAWALS;
      const disbursement = {
            account: data.account_data.id,
            amount: calculatorValues.amount,
            quotes: Number(calculatorValues.fields)
      }
      const result = await postData(url, disbursement, data.token);
      console.log(result); // Resultado de la API
      if (!result.errors) {
        setIfSendIt(true);
        setOpenModalPin(true);
        setCanDisbursement(true)
      }
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
    }
  };

  const validatePin = async () => {
    setLoading(true)
    try {
      const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_WITHDRAWALS + data.client + '/confirmation'
      const response = await fetch(url);
      
      if (response.status !== 200) {
        setIfError(`Error ${response.status}`)
        setLoading(false);
        return;
      }
      const validationData = await response.json();
      if (validationData) {
        console.log(JSON.stringify(validationData));
        const userData = Cookies.get('user-data');
        // userData['account_data']['can_withdraw'] = false
        // SetCookie('user-data', userData);
        setIfSendIt(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modals type="update-info" isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
      <Modals sendit={ifSendIt} data={openModalData} type='pin' isOpenit={openModalPin} actionBtn={validatePin} onCloseit={() => setOpenModalPin(false)} />
      <Container maxW="8xl">
        <Text>Saldo disponible: <Badge fontSize='lg' pt={1}  colorScheme='green'>S/ {data.account_data.capital_available}</Badge></Text><br/>
        <Text>Saldo Pendiente de pago: <Badge fontSize='lg' pt={1}  colorScheme='red'>S/ {data.account_data.capital_pending}</Badge></Text>
        <Calculator payment_day={data.account_data.payment_day} defaultValueSlider={data.account_data.capital_available} min={data.min} max={data.max} title='' calculatorValues={setCalculatorData} calculatorResult={setCalculatorValues} />
        <Button mt={8} isDisabled={!canDisbursement} onClick={handlePost} isLoading={loading} colorScheme="blue">
            Solicitar nuevo Préstamo
        </Button>
      </Container>
    </>
  );
}
