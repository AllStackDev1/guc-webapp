import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Button,
  Heading,
  useToast,
  Container
} from '@chakra-ui/react'
import { PaystackButton } from 'react-paystack'
import Overlay from 'components/Loading/Overlay'

import { TrophyIcon } from 'theme/Icons'
import configs from 'utils/configs'

const StepFive = ({
  auth,
  user,
  setStep,
  setCode,
  setOtpId,
  setPhoneNumber,
  setSuccessMessage,
  applicantUpdateProfile
}) => {
  const [isLoading, setLoading] = React.useState(false)
  const toast = useToast()

  const config = {
    reference: new Date().getTime(),
    email: user?.email,
    amount: 1000000,
    publicKey: configs().PAYSTACK_PUBLIC_KEY
  }

  const handlePaystackSuccessAction = async resp => {
    if (resp.status === 'success') {
      try {
        setLoading(true)
        const res1 = await applicantUpdateProfile({ status: 'PAID', stage: 6 })
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: 'Payment successful'
        })
        const res2 = await auth({ code: res1.data.code })
        window.sessionStorage.removeItem('_gcut')
        // setOtpId(res2.data.pinId)
        setPhoneNumber(res2.data.to)
        setCode(res2.data.code)
        setSuccessMessage(res2.message)
        setStep(4)
      } catch (error) {
        let eMgs
        if (error?.data?.message === 'celebrate request validation failed') {
          eMgs = 'Invalid data, please check form.'
        } else {
          eMgs =
            error?.message ||
            error?.data?.message ||
            'Unexpected network error.'
        }
        toast({
          duration: 9000,
          status: 'error',
          isClosable: true,
          position: 'top-right',
          title: 'Error',
          description: eMgs
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const handlePaystackCloseAction = () => {
    toast({
      duration: 9000,
      status: 'info',
      isClosable: true,
      position: 'top-right',
      title: 'Payment of #10,000 required',
      description: 'You cannot process if payment is not done!'
    })
  }

  const componentProps = {
    ...config,
    text: 'Continue Application',
    onSuccess: resp => handlePaystackSuccessAction(resp),
    onClose: handlePaystackCloseAction
  }

  return (
    <>
      {isLoading && <Overlay text='verfying payment' />}
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
          OTP Verified
        </Heading>

        <Text
          mt={4}
          w={{ lg: 110 }}
          align='center'
          fontWeight='300'
          fontSize={{ base: 'sm', lg: 'lg' }}
          lineHeight={{ base: '4', lg: '30px' }}
        >
          Awesome your account has been verified click the button below to
          purchase your application form.
        </Text>
        {config.email && (
          <Box mt={8} align='center'>
            <Button
              w='100%'
              as={PaystackButton}
              {...componentProps}
              rounded='0'
              type='button'
              color='#fff'
              fontSize='md'
              boxShadow='lg'
              fontWeight={400}
              colorScheme='gcuButton'
              h={{ base: '3.375rem' }}
              _focus={{ outline: 'none' }}
            />
          </Box>
        )}
      </Container>
    </>
  )
}

StepFive.propTypes = {
  auth: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
  setOtpId: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  applicantUpdateProfile: PropTypes.func.isRequired
}

export default StepFive
