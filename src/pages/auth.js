import React from 'react'
import {
  Box,
  Flex,
  Text,
  Link,
  Alert,
  Button,
  Heading,
  Container,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import AuthNavbar from 'container/AuthNavbar'
import { Enroll, ApplicationCode, Verification } from 'components/AuthSteps'

import useApp from 'context/app'
import useAuth from 'context/auth'
// import useApi from 'context/api'

import { TrophyIcon } from 'theme/Icons'

const Auth = () => {
  document.title = 'GCU | Application Portal'
  const { step, setStep, successMessage, errorMessage } = useApp()
  const { isAuthenticated } = useAuth()
  // const { auth, resendCode } = useApi()

  const history = useHistory()

  const getStep = key => {
    switch (key) {
      case 'enroll':
        return { title: 'Online Application', value: 25, component: <Enroll /> }
      case 'code':
        return {
          title: 'Application Code',
          value: 50,
          component: <ApplicationCode />
        }
      case 'otp':
        return {
          title: 'OTP Verification',
          value: 75,
          component: <Verification />
        }
      case 'confirm':
        return { title: 'OTP Verified', value: 100 }
      default:
        return null
    }
  }

  const { title, value, component } = getStep(step)

  React.useEffect(() => {
    if (step === 'confirm') {
      if (!isAuthenticated()) {
        return setStep('code')
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
    <>
      <AuthNavbar value={value} />
      <Flex w='100%' as='main' flexDir='column' py={{ base: '', lg: 16 }}>
        <Container
          align='center'
          mt={{ lg: 4 }}
          px={{ lg: 10 }}
          minW={{ lg: '2xl' }}
        >
          {step === 'confirm' && (
            <Box
              mx='auto'
              mb={{ lg: 16 }}
              w={{ lg: '5.188em' }}
              h={{ lg: '6.5rem' }}
              as={TrophyIcon}
            />
          )}

          <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
            {title}
          </Heading>

          {step === 'confirm' ? (
            <>
              <Text
                mt={4}
                w={110}
                align='center'
                fontWeight='300'
                fontSize='lg'
                lineHeight='30px'
              >
                Awesome your OTP Code has been verifed click the button below to
                continue your application.
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
                  onClick={_ => history.push('/applicant/dashboard')}
                  _focus={{ outline: 'none' }}
                >
                  Continue Application
                </Button>
              </Box>
            </>
          ) : (
            <Text
              mt={4}
              w={110}
              align='center'
              fontWeight='300'
              fontSize='lg'
              lineHeight='30px'
            >
              By appliying you agree to our
              <Link
                href='#'
                color='gcu.100'
                _hover={{ textDecor: 'none', fontWeight: '500' }}
                _focus={{ textDecor: 'none', fontWeight: '500' }}
              >
                {' Terms and conditions '}
              </Link>
              and
              <Link
                href='#'
                color='gcu.100'
                _hover={{ textDecor: 'none', fontWeight: '500' }}
                _focus={{ textDecor: 'none', fontWeight: '500' }}
              >
                {' Privacy Policy '}
              </Link>
            </Text>
          )}

          {component}

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
        </Container>
      </Flex>
    </>
  )
}

export default Auth
