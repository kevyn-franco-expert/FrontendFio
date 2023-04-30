import {
    Box,
    Stack,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Text,
    Heading,
  } from "@chakra-ui/react";
  import RadioGroup from "./RadioGroup";
  import React, { useState } from "react";
  
  export default function Calculator() {
    const [sliderValue, setSliderValue] = useState(250);
    const [monthlyValue, setMonthlyValue] = useState(1);
    const [paydayValue, setPaydayValue] = useState(0);
    const labelStyles = {
        mt: '3',
        mb: '3',
        fontSize: 'sm',
      }
    
    return (
      <Box>
        <Stack spacing={2} direction='column'>
            <Heading size='sm' color='black'>¿Cuánto dinero necesitas?</Heading>
            <Heading size='2xl' pt="4" alignSelf={'center'} color='black'>s/ {sliderValue}</Heading>
            <Box w='100%' p={2} pt={6} pb={2}>
                <Slider min={250} max={2000} defaultValue={250} aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
                    <SliderMark color='black' value={250} {...labelStyles}>
                    s/250
                    </SliderMark>
                    <SliderMark left={{base:'88%!important', sm:'92%!important'}} value={2000} {...labelStyles}>
                    s/2000 
                    </SliderMark>
                    {/* <SliderMark
                    value={sliderValue}
                    textAlign='center'
                    bg='blue.500'
                    color='white'
                    mt='-10'
                    ml='-5'
                    w='12'
                    >
                    s/{sliderValue}
                    </SliderMark> */}
                    <SliderTrack height={2}>
                    <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={6} bg='blue.500' />
                </Slider>
            </Box>
            <Box pt={10}> {/* Cuotas  */}
                <Text color='black' as='p'>¿En cuántas cuotas?</Text>
                <RadioGroup nameItem='months' items={months} setValue={setMonthlyValue} />
            </Box>
            <Box pt={10}>
                <Text color='black' as='p'>¿Cuándo prefieres pagar la primera cuota?</Text>
                <RadioGroup bigger={true} nameItem='payDay' items={payDay} setValue={setPaydayValue} />
            </Box>
        </Stack>
      </Box>
    );
  };
  
  const months = ["1","2","3","4","5","6"];

  const payDay = ["05/12/2022", "20/12/2022"];