import React from 'react'
import { Box, Text, Heading, Container } from '@chakra-ui/react'

import { TrophyIcon } from 'theme/Icons'

const StepTwelve = () => {
  return (
    <Container
      align='center'
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '2xl' }}
    >
      <Box
        mx='auto'
        mb={{ lg: 16 }}
        w={{ lg: '5.188em' }}
        h={{ lg: '6.5rem' }}
        as={TrophyIcon}
      />

      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Hurray!
      </Heading>

      <Text
        mt={4}
        w={110}
        align='center'
        fontWeight='400'
        fontSize='lg'
        lineHeight='30px'
      >
        You have sucessfully applied for the GCU
        <Box as='br' />
        <Text as='span' fontWeight='700'>
          2020/2021 cohort
        </Text>
      </Text>
    </Container>
  )
}

export default StepTwelve
