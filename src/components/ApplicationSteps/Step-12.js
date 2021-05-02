import React from 'react'
import { Box, Text, Heading, Container } from '@chakra-ui/react'

import { TrophyIcon } from 'theme/Icons'

const StepTwelve = () => {
  return (
    <Container
      align='center'
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '2xl' }}
    >
      <Box
        mx='auto'
        mb={{ base: 5, lg: 16 }}
        w={{ base: '4.188em', lg: '5.188em' }}
        h={{ base: '4.8rem', lg: '6.5rem' }}
        as={TrophyIcon}
      />

      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Hurray!
      </Heading>

      <Text
        mt={4}
        w={{ lg: 110 }}
        align='center'
        fontWeight='300'
        fontSize={{ base: 'sm', lg: 'lg' }}
        lineHeight={{ base: '4', lg: '30px' }}
      >
        You have successfully applied for the GCU
        <Box as='br' />
        <Text as='span' fontWeight='700'>
          2020/2021 cohort
        </Text>
      </Text>
    </Container>
  )
}

export default StepTwelve
