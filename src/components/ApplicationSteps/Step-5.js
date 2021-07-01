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
  user,
  history,
  setEmail,
  setEnterApplication,
  applicantUpdateProfile
}) => {
  const [isLoading, setLoading] = React.useState(false)
  const toast = useToast()

  const config = {
    amount: 1000000,
    email: user?.email,
    reference: btoa(user?.code + '_' + new Date().getTime()),
    publicKey: configs().PAYSTACK_PUBLIC_KEY
  }

  const handlePaystackSuccessAction = async resp => {
    if (resp.status === 'success') {
      try {
        setLoading(true)
        await applicantUpdateProfile({ status: 'PAID', stage: 6 })
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: 'Payment successful'
        })
        setEmail(null)
        window.sessionStorage.removeItem('_gcut')
        setEnterApplication(true)
        history.push('/applicant/login')
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
          Account Verified
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
        <Box mt={4}>
          <Text fontWeight='bold' fontSize='sm' color='red.500'>
            Please do not close the payment page until payment is confirmed, the
            page would close automatically after confirmation
          </Text>
        </Box>
      </Container>
    </>
  )
}

StepFive.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setEmail: PropTypes.func.isRequired,
  setEnterApplication: PropTypes.func.isRequired,
  applicantUpdateProfile: PropTypes.func.isRequired
}

export default StepFive
