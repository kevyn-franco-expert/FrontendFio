import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  useToast,
  Container,
  FormControl,
  Checkbox,
  Link,
  Text
} from "@chakra-ui/react";
import HeadTitle from "@/components/base/HeadTitle";
import React, { useState, useEffect } from "react";
import FormApplication from "@/components/formApplication";
import Tracker from "@/components/Tracker";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import FormUser from "@/components/formUser";
import useAPI from '@/hooks/useAPI';
import Modals from "@/components/Modal";
import RequestNewDisbursement from '@/components/requestNewDisbursement';
import LoanHistory from '@/components/LoanHistory';
import Cronograma from '@/components/Cronograma';
import NoContent from '@/components/NoContent';

export default function miCuenta() {
  const router = useRouter();
  const toast = useToast();
  const [application, setApplication] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [modalType, setModalType] = useState('');
  const [contract, setContract] = useState(false);
  const [origin, setOrigin] = useState(Cookies.get("origin"));
  const [hasAccount, setHasAccount] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorLists, setErrorLists] = useState([]);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loginResponseData, setLoginResponseData] = useState([]);
  const [accountInformationData, setAccountInformationData] = useState(null);
  const [openModalPin, setOpenModalPin] = useState(false);
  const [ifError, setIfError] = useState(false);
  const [ifSendIt, setIfSendIt] = useState(false);
  const { postData, getData } = useAPI();

  useEffect(() => {
    handleGetValidateData();
    if (Cookies.get('user-data')) {
      setLoginResponseData(JSON.parse(Cookies.get('user-data')));
      const urlUserInfo = JSON.parse(Cookies.get('user-data'));
      if (urlUserInfo.account_data.account_info) {
        handleGetUserData(urlUserInfo.account_data.account_info);
      }
      
      
    } else {
      handleCloseSesion();
    }
    setHasAccount(Cookies.get("account") === 'true');
    if (origin && origin.includes("user")) {
      setApplication(false);
    } else {
      setApplication(true);
    }
    setLoading(false);    
    //session

    const timeout = 1 * 60 * 1000; // 5 minutes
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      console.log('inactivityTimer:' + inactivityTimer);
      inactivityTimer = setTimeout(() => {
        sessionStorage.clear();
        alert('La sesión ha expirado debido a inactividad.');
        SetCookie('user-data', '')
        SetCookie('loggedIn', false);
      }, timeout);
    };

    const SetCookie = (name, value) => {
      Cookies.set(name, value, {
        expires: 1,
      });
    };

    // const handleUserActivity = () => {
    //   console.log('activity reset')
    //   resetTimer();
    // };

    // window.addEventListener('mousemove', handleUserActivity);
    // window.addEventListener('keydown', handleUserActivity);

    // return () => {
    //   window.removeEventListener('mousemove', handleUserActivity);
    //   window.removeEventListener('keydown', handleUserActivity);
    // };

  }, []);

  const validatePin = async () => {
    setLoading(true)
    try {
      const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_WITHDRAWALS + loginResponseData.account_data.id + '/confirmation/'
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status !== 200) {
        setIfError(`Error ${response.status}`)
        setLoading(false);
        return;
      }
      const validationData = await response.json();
      if (validationData) {
        console.log(JSON.stringify(validationData));
        setIfSendIt(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetValidateData = async () => {
      const url = process.env.NEXT_PUBLIC_BASEURL + process.env.NEXT_PUBLIC_API_VALIDATE_ACCOUNT;
      const userInfo = JSON.parse(Cookies.get('user-data'));
      const dataUser = {
        document_number : userInfo.dni
      };

    try {
        const result = await postData(url, dataUser);
        console.log(result);
        userInfo['account_data'] = result.data.account_data;
        userInfo['email_validated'] = result.data.email_validated;
        Cookies.set('user-data', JSON.stringify(userInfo))
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
    }
  }

  const handleGetUserData = async (url) => {
    if (url) {
      const result = await getData(url); 
      if (result && !result.errors) {
        setAccountInformationData(result.data.attributes);
      }
    }
  }

  const handleRequest = async () => {
    const url = process.env.NEXT_PUBLIC_API_ACCOUNTS;
    const formReq = {
          amount: formData.calculator.amount,
          contract: contract,
          bank: formData.typeBankID,
          number: formData.bankAccount,
          payment_day: Number(formData.calculator.payDay),
          uuid: loginResponseData.uuid,
          client: Cookies.get("client"),
          quotes: formData.quotes
        };

    try {
        const result = await postData(url, formReq);
        if (result && result.data) {
          setErrorLists([])
          const regex = /\{(.*)\}/i;
          const dataModal = {
            title: result.meta.title,
            description: result.meta.description,
            subdescription: result.meta.subDescription
            // title: '¡Felicitaciones!',
            // description: 'Muchas gracias por la informacion, estamos validando tu pedido',
            // subdescription: 'Te estaremos contactando por correo una vez validada la información.'
          }
          setModalType('congrats')
          setModalData(dataModal);
          setOpenModal(true);
          setApplication(false);
          Cookies.set("account", true, { expires: 1 })
          handleGetValidateData();
          setHasAccount(true);
          setTabIndex(1)
        } else if (result && result.errors) {
            setErrorLists(result.errors)
            result.errors.forEach((error) => {
                if (error.source.pointer.split('/')[3] === 'nonFieldErrors') {  
                    const dataModal = {
                        title: 'Ups..',
                        description: error.detail
                      }
                      setModalType('nonFieldErrors')
                      setModalData(dataModal);
                      setOpenModal(true);
                }
            })
        }
        // Cookies.set("account", true, { expires: 7 })
        // setHasAccount(true);
        
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
      }
  };

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  const handleCloseSesion = () => {
    Cookies.remove("loggedIn");
    Cookies.remove("origin");
    Cookies.remove("token");
    Cookies.remove("account");
    Cookies.remove("client");
    Cookies.remove("user-data");
    router.push("/login");
  };

  return (
    <>
      <Modals type={modalType} data={modalData} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
      <Modals sendit={ifSendIt} isError={ifError} type='pin' isOpenit={openModalPin} actionBtn={validatePin} onCloseit={() => setOpenModalPin(false)} />
      <HeadTitle
        title="Mi cuenta"
        description="Obtén tu línea de efectivo con nosotros"
      />
      <Container maxW="8xl">
        <Tabs index={tabIndex} onChange={handleTabsChange} my={20}>
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            <GridItem
              borderRadius={20}
              p={6}
              colSpan={{ base: 6, md: 1 }}
              bg="white"
            >
              <Text className="title-account">Mi cuenta</Text>
              <TabList className="my-account-tab">
                {loading && (
                  <>
                    <Stack>
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                      <Skeleton height="20px" />
                    </Stack>
                  </>
                )}
                {!loading && (
                  <>
                    {(application && !hasAccount) && <Tab>Completar solicitud</Tab>}
                    
                    <Tab>Datos personales</Tab>
                    {!hasAccount && (origin === 'client') &&
                      <Tab isDisabled> Seguimiento solicitud desembolso</Tab>
                    }
                    {hasAccount && (origin === 'client') &&
                      <Tab> Seguimiento solicitud desembolso </Tab>
                    }
                    <Tab isDisabled={application}>
                      Solicitar nuevo desembolso
                    </Tab>
                    <Tab isDisabled={application}>Historial de préstamos</Tab>
                    <Tab isDisabled={application}>Cronograma de pagos</Tab>
                    
                  </>
                )}
              </TabList>
               {!loading && (
                <>
                  {(accountInformationData && !accountInformationData.errors) && accountInformationData.submittedWithdrawals.length > 0 &&
                    <Button display={application ? 'none' : ''} mt={8} colorScheme="red"  onClick={() => setOpenModalPin(true)}>
                        Completar retiros pendientes
                    </Button>
                  }
                  <Button
                    onClick={handleCloseSesion}
                    leftIcon={<FiLogOut />}
                    mt={10}
                    colorScheme="red"
                    variant="ghost"
                  >
                    Cerrar sesión
                  </Button>
                </>
              )}
            </GridItem>
            <GridItem
              borderRadius={20}
              p={{ base: 2, sm: 8 }}
              colSpan={{ base: 6, md: 4 }}
              colStart={{ base: 0, sm: 2 }}
              colEnd={6}
              minH={{ base: "auto", md: "400px" }}
              bg="white"
            >
              {loading && (
                <>
                  <Stack>
                    <Skeleton height="20px" mb={4} />
                    <Skeleton height="50px" />
                    <Skeleton height="50px" />
                  </Stack>
                </>
              )}
             
              {!loading && (
                <TabPanels>
                  {!loading && (application && !hasAccount) && (
                    <TabPanels>
                      {loginResponseData && loginResponseData.email_validated && 
                      <TabPanel>
                        <FormApplication loginData={loginResponseData} errorsData={errorLists} onFormData={setFormData} />
                        <FormControl>
                            <Checkbox
                            id="contract"
                            name="contract"
                            colorScheme="red"
                            size="lg"
                            my={4}
                            onChange={(e)=> setContract(e.target.checked)}
                            >
                            Acepto haber leído el contrato
                            </Checkbox>
                        </FormControl>
                      </TabPanel>
                      }
                      {loginResponseData && !loginResponseData.email_validated && 
                      <TabPanel>
                        <NoContent />
                      </TabPanel>
                      }
                    </TabPanels>
                  )}
                  <TabPanel>
                    <FormUser uuid={loginResponseData && loginResponseData.uuid} />
                  </TabPanel>
                  {!hasAccount && (origin === 'client') &&
                      <TabPanel>No hay seguimiento registrado..</TabPanel>
                    }
                  {hasAccount && (origin === 'client') &&
                  <TabPanel>
                    <Tracker uuid={loginResponseData && loginResponseData.uuid} />
                  </TabPanel>
                  }
                  <TabPanel>{hasAccount && <RequestNewDisbursement data={loginResponseData} />}</TabPanel>
                  <TabPanel>{hasAccount && <LoanHistory data={loginResponseData} />}</TabPanel>
                  <TabPanel>{hasAccount && <Cronograma data={loginResponseData} />}</TabPanel>
                </TabPanels>
              )}
            </GridItem>
            <GridItem colStart={2} gap={4}>
              {(application && !hasAccount && loginResponseData.email_validated) && (
                <Button isDisabled={!contract && formData} onClick={handleRequest} colorScheme="blue">
                  SOLICITAR PRÉSTAMO
                </Button>
              )}
            </GridItem>
          </Grid>
        </Tabs>
      </Container>
    </>
  );
}
