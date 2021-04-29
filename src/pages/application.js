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
  StepSeven,
  StepEightOne,
  StepEightTwo,
  StepNine,
  StepTen,
  StepSix,
  StepEleven,
  StepTwelve
} from 'components/ApplicationSteps'

import useApp from 'context/app'
import useAuth from 'context/auth'
import useApi from 'context/api'

import BgShape from 'assets/images/bg-shape.png'

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
        return { value: 8, Step: StepOne }
      case 2:
        return { value: 16, Step: StepTwo }
      case 3:
        return { value: 24, Step: StepThree }
      case 4:
        return { value: 33, Step: StepFour }
      case 5:
        return { value: 40, Step: StepFive }
      case 6:
        return { value: 45, Step: StepSix }
      case 6.1:
        return { value: 50, Step: StepSixOne }
      case 6.2:
        return { value: 55, Step: StepSixTwo }
      case 7:
        return { value: 60, Step: StepSeven }
      case 8.1:
        return { value: 62, Step: StepEightOne }
      case 8.2:
        return { value: 67, Step: StepEightTwo }
      case 9:
        return { value: 75, Step: StepNine }
      case 10:
        return { value: 80, Step: StepTen }
      case 11:
        return { value: 95, Step: StepEleven }
      case 12:
        return { value: 100, Step: StepTwelve }
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
        <Flex
          w='100%'
          minH='100vh'
          as='main'
          flexDir='column'
          py={{ base: '', lg: 16 }}
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
              <Alert px={5} py={6} status={errorMessage ? 'error' : 'success'}>
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
        </Flex>
        <Box
          right={0}
          bottom={0}
          pos='absolute'
          bgSize='cover'
          bgPos='center'
          bgRepeat='no-repeat'
          bgImage={`url('${BgShape}')`}
          w={{ base: '5rem', lg: '15rem' }}
          h={{ base: '5rem', lg: '15rem' }}
        />
      </Box>
    )
  )
}

export default Auth
