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
    Text,
    Container } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import React, {useState, useEffect} from 'react'
import FormApplication from '@/components/formApplication';
import Tracker from '@/components/Tracker';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { FiLogOut } from "react-icons/fi";
import FormUser from '@/components/FormUser';


export default function miCuenta() {
    const router = useRouter()
    const [application, setApplication] = useState(false);
    const [token, setToken] = useState(Cookies.get('token'));
    const [origin, setOrigin] = useState(Cookies.get('origin'));
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        if (origin && origin.includes('user')) {
            setApplication(false)
        } else {
            setApplication(true)
        }
        setLoading(false)
    }, [])

    const handleCloseSesion = () => {
        Cookies.remove('loggedIn')
        Cookies.remove('origin')
        Cookies.remove('token')
        router.push('/login')
    }

    return (
    <>
        <HeadTitle title='Mi cuenta' description='Obtén tu línea de efectivo con nosotros' />
        <Container maxW='8xl'>
            <Tabs my={20}>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem borderRadius={20} p={6} colSpan={{base: 6, md: 1}} bg='white'>
                    <p className='title-account'>
                        Mi cuenta
                    </p>
                    <TabList className='my-account-tab'>
                        {loading && 
                        <>
                            <Stack>
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                            </Stack>
                        </>}
                        {!loading && 
                        <>
                            {application && <Tab>Completar solicitud</Tab>}
                            <Tab isDisabled={application}>Datos personales</Tab>
                            <Tab isDisabled={application}>Historial de préstamos</Tab>
                            <Tab isDisabled={application}>Solicitar nuevo desembolso</Tab>
                            <Tab isDisabled={application}>Seguimiento solicitud desembolso</Tab>
                        </>}
                    </TabList>
                    {!loading && 
                        <Button onClick={handleCloseSesion} leftIcon={<FiLogOut />} mt={10} colorScheme='red' variant='ghost'>
                        Cerrar sesión
                    </Button>}
                </GridItem>
                <GridItem borderRadius={20} p={{base: 2, sm: 8}} colSpan={{base: 6, md: 4}} colStart={{base: 0, sm: 2}} colEnd={6} minH={{base:'auto', md:'400px'}} bg='white'>
                    {loading && 
                    <>
                        <Stack>
                            <Skeleton height='20px' mb={4} />
                            <Skeleton height='50px' />
                            <Skeleton height='50px' />
                        </Stack>
                    </>}
                {!loading && application && 
                    <TabPanels>
                        <TabPanel><FormApplication /></TabPanel>
                    </TabPanels>
                }

                {!loading && !application && 
                    <TabPanels>
                        <TabPanel><FormUser /></TabPanel>
                        <TabPanel>Historial de préstamos</TabPanel>
                        <TabPanel>Solicitar nuevo desembolso</TabPanel>
                        <TabPanel><Tracker /></TabPanel>
                    </TabPanels>
                }

                </GridItem>
                <GridItem colStart={2} gap={4}>
                    {application && <Button colorScheme='blue'>SOLICITAR PRÉSTAMO</Button>}
                </GridItem>
                </Grid>
            </Tabs>
        </Container>
    </>
  )
}
