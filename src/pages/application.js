/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Box,
  Flex,
  Text,
  Alert,
  Container,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'

import AuthNavbar from 'container/AuthNavbar'
import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSixOne,
  StepSixTwo,
  StepSeven
} from 'components/ApplicationSteps'

import useApp from 'context/app'
import useAuth from 'context/auth'
import useApi from 'context/api'

const Auth = () => {
  document.title = 'GCU | Application Portal'
  const { auth, enroll, verifyOTP, resendCode } = useApi()
  const {
    isAuthenticated,
    setPhoneNumber,
    phoneNumber,
    setOtpId,
    store,
    otpId
  } = useAuth()
  const {
    setSuccessMessage,
    setErrorMessage,
    successMessage,
    errorMessage,
    setStep,
    step
  } = useApp()

  const getStep = key => {
    switch (key) {
      case 1:
        return { value: 5, Step: StepOne }
      case 2:
        return { value: 10, Step: StepTwo }
      case 3:
        return { value: 15, Step: StepThree }
      case 4:
        return { value: 20, Step: StepFour }
      case 5:
        return { value: 25, Step: StepFive }
      case 6.1:
        return { value: 30, Step: StepSixOne }
      case 6.2:
        return { value: 30, Step: StepSixTwo }
      case 7:
        return { value: 30, Step: StepSeven }
      // case 6:
      //   return { value: 30, Step: StepSeven }
      default:
        return null
    }
  }

  const display = getStep(step)

  React.useEffect(() => {
    if (step === 'confirm') {
      if (!isAuthenticated()) {
        return setStep(3)
      }
    }
  }, [step, setStep, isAuthenticated])

  const handleCodeRetrial = async () => {
    // try {
    //   const res = await resendCode()
    // } catch (err) {
    // } finally {
    // }
  }

  return (
    display && (
      <Box bg='white'>
        <AuthNavbar value={display.value} step={step} setStep={setStep} />
        <Flex w='100%' as='main' flexDir='column' py={{ base: '', lg: 16 }}>
          <Container
            align='center'
            mt={{ lg: 4 }}
            px={{ lg: 10 }}
            minW={{ lg: step >= 6 ? '4xl' : '2xl' }}
          >
            <display.Step
              auth={auth}
              otpId={otpId}
              store={store}
              enroll={enroll}
              setStep={setStep}
              setOtpId={setOtpId}
              verifyOTP={verifyOTP}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />

            {(successMessage || errorMessage) && (
              <Box mt={{ lg: 8 }}>
                <Alert
                  px={5}
                  py={6}
                  status={errorMessage ? 'error' : 'success'}
                >
                  <AlertIcon />
                  <AlertTitle
                    color={errorMessage ? 'red.600' : 'green.600'}
                    mr={2}
                  >
                    {successMessage || errorMessage}
                  </AlertTitle>
                </Alert>
              </Box>
            )}

            {step === 'code' && (
              <Box mt={{ lg: 8 }}>
                <Text>Didn't receive code</Text>
                <Text role='button' onClick={() => handleCodeRetrial()}>
                  Send Application Code
                </Text>
              </Box>
            )}
          </Container>
        </Flex>
      </Box>
    )
  )
}

export default Auth
