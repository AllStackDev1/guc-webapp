import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Button, Heading, Container } from '@chakra-ui/react'

import { TrophyIcon } from 'theme/Icons'

const StepFive = ({ setStep }) => {
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
        OTP Verified
      </Heading>

      <Text
        mt={4}
        w={110}
        align='center'
        fontWeight='300'
        fontSize='lg'
        lineHeight='30px'
      >
        Awesome your account have been verified click the button below to
        purchase your application form.
      </Text>

      <Box mt={8} align='center'>
        <Button
          w='100%'
          rounded='0'
          type='button'
          color='#fff'
          fontSize='md'
          boxShadow='lg'
          fontWeight={400}
          colorScheme='gcuButton'
          h={{ base: '3.375rem' }}
          onClick={_ => setStep(6)}
          _focus={{ outline: 'none' }}
        >
          Continue Application
        </Button>
      </Box>
    </Container>
  )
}

StepFive.propTypes = {
  setStep: PropTypes.func.isRequired
}

export default StepFive
