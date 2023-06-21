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
  Checkbox
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

export default function miCuenta() {
  const router = useRouter();
  const toast = useToast();
  const [application, setApplication] = useState(false);
  const [modalType, setModalType] = useState('');
  const [contract, setContract] = useState(false);
  const [origin, setOrigin] = useState(Cookies.get("origin"));
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorLists, setErrorLists] = useState([]);
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { postData } = useAPI();
  useEffect(() => {
    if (origin && origin.includes("user")) {
      setApplication(false);
    } else {
      setApplication(true);
    }
    setLoading(false);
  }, []);

  const handleRequest = async () => {
    const url = process.env.NEXT_PUBLIC_API_ACCOUNTS;
    const formReq = {
          amount: formData.calculator.amount,
          contract: contract,
          bank: formData.typeBankID,
          number: formData.bankAccount,
          payment_day: Number(formData.calculator.payDay),
          uuid: Cookies.get("token"),
          client: Cookies.get("client")
        };

    try {
        const result = await postData(url, formReq);
        if (result && result.data) {
          console.log(result)
          setErrorLists([])
          const dataModal = {
            // title: title.replace('{full_name}', formData[title.match(regex)[1]]),
            // description: description.replace('{email}', formData[description.match(regex)[1]]),
            // subdescription: sub_description
            title: '¡Felicitaciones!',
            description: 'Muchas gracias por la informacion, estamos validando tu pedido',
            subdescription: 'Te estaremos contactando por correo una vez validada la información.'
          }
          setModalType('congrats')
          setModalData(dataModal);
          setOpenModal(true);
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
        
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
      }
  };

  const handleCloseSesion = () => {
    Cookies.remove("loggedIn");
    Cookies.remove("origin");
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <>
      <Modals type={modalType} data={modalData} isOpenit={openModal} onCloseit={() => setOpenModal(false)} />
      <HeadTitle
        title="Mi cuenta"
        description="Obtén tu línea de efectivo con nosotros"
      />
      <Container maxW="8xl">
        <Tabs my={20}>
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            <GridItem
              borderRadius={20}
              p={6}
              colSpan={{ base: 6, md: 1 }}
              bg="white"
            >
              <p className="title-account">Mi cuenta</p>
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
                    {application && <Tab>Completar solicitud</Tab>}
                    <Tab isDisabled={application}>Datos personales</Tab>
                    <Tab isDisabled={application}>Historial de préstamos</Tab>
                    <Tab isDisabled={application}>
                      Solicitar nuevo desembolso
                    </Tab>
                    <Tab isDisabled={application}>
                      Seguimiento solicitud desembolso
                    </Tab>
                  </>
                )}
              </TabList>
              {!loading && (
                <Button
                  onClick={handleCloseSesion}
                  leftIcon={<FiLogOut />}
                  mt={10}
                  colorScheme="red"
                  variant="ghost"
                >
                  Cerrar sesión
                </Button>
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
              {!loading && application && (
                <TabPanels>
                  <TabPanel>
                    <FormApplication errorsData={errorLists} onFormData={setFormData} />
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
                </TabPanels>
              )}

              {!loading && !application && (
                <TabPanels>
                  <TabPanel>
                    <FormUser />
                  </TabPanel>
                  <TabPanel>Historial de préstamos</TabPanel>
                  <TabPanel>Solicitar nuevo desembolso</TabPanel>
                  <TabPanel>
                    <Tracker />
                  </TabPanel>
                </TabPanels>
              )}
            </GridItem>
            <GridItem colStart={2} gap={4}>
              {application && (
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
