import { 
    Tabs,
    TabList,
    TabPanels,
    Text,
    useMultiStyleConfig,
    Tab,
    TabPanel,
    Button,
    Grid,
    GridItem,
    Box,
    Container } from '@chakra-ui/react'
import HeadTitle from '@/components/base/HeadTitle';
import React, {useState} from 'react'
import FormApplication from '@/components/formApplication';
import Tracker from '@/components/Tracker';


export default function miCuenta() {
   const [application, setApplication] = useState(false);
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
                    {application && 
                    <TabList className='my-account-tab'>
                        <Tab>Completar solicitud</Tab>
                    </TabList>
                    }   
                    {!application && 
                        <TabList className='my-account-tab'>
                            <Tab>Datos personales</Tab>
                            <Tab>Historial de préstamos</Tab>
                            <Tab>Solicitar nuevo desembolso</Tab>
                            <Tab>Seguimiento solicitud desembolso</Tab>
                        </TabList>
                    }
                </GridItem>
                <GridItem borderRadius={20} p={{base: 2, sm: 8}} colSpan={{base: 6, md: 4}} colStart={{base: 0, sm: 2}} colEnd={6} minH={{base:'auto', md:'400px'}} bg='white'>
                {application && 
                    <TabPanels>
                        <TabPanel><FormApplication /></TabPanel>
                    </TabPanels>
                    }

                    {!application && 
                        <TabPanels>
                            <TabPanel>Datos personales</TabPanel>
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
