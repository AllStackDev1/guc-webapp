/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import jwt_decode from 'jwt-decode'
import { Box, Flex, Text, Button, Heading, Container } from '@chakra-ui/react'
import { useFormik } from 'formik'

import Legal from './Legal'
import CustomOTPInput from 'components/Forms/CustomOTPInput'
import CustomAlert from './CustomAlert'

const validationSchema = yup.object().shape({
  pin_id: yup.string(),
  pin: yup
    .string()
    .min(6, 'Invalid otp')
    .max(6, 'Invalid otp')
    .required('OTP is required!')
})

const StepFour = ({
  auth,
  user,
  code,
  otpId,
  store,
  setStep,
  verifyOTP,
  phoneNumber,
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage
}) => {
  const [count, setCount] = React.useState(60)
  const [loading, setLoading] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      pin: '',
      pin_id: otpId
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setErrorMessage(null)
        setSuccessMessage(null)
        const res = await verifyOTP(values)
        store(res.data)
        const user = jwt_decode(res.data)
        if (user.status === 'PENDING') {
          setStep(5)
          sessionStorage.setItem('step', 5)
        } else {
          setStep(user.stage)
          sessionStorage.setItem('step', 5)
        }
      } catch (error) {
        setSuccessMessage(null)
        setErrorMessage(
          error?.message || error?.data?.message || 'Unexpected network error.'
        )
      } finally {
        setSubmitting(false)
      }
    }
  })

  React.useEffect(() => {
    if (!otpId) {
      return setStep(3)
    }
  }, [otpId, setStep])

  const handleResendOTP = async () => {
    try {
      if (!code) {
        throw new Error('Unexpected error, please contact support.')
      }
      setLoading(true)
      const res = await auth({ code })
      setErrorMessage(null)
      setSuccessMessage(res.message)
    } catch (error) {
      setSuccessMessage(null)
      if (error?.data?.message === 'celebrate request validation failed') {
        setErrorMessage('Invalid data, please check form.')
      } else {
        setErrorMessage(
          error?.message || error?.data?.message || 'Unexpected network error.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const idI = setInterval(() => {
      setCount(prev => prev - 1)
    }, 1000)
    const idT = setTimeout(() => {
      clearInterval(idI)
    }, 60000)
    return () => {
      clearInterval(idI)
      clearTimeout(idT)
    }
  }, [setCount])

  return (
    <Container
      align='center'
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '2xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        OTP Verification
      </Heading>

      <Legal />

      <Flex
        as='form'
        mt={{ base: 4, lg: 'unset' }}
        flexDir='column'
        onSubmit={formik.handleSubmit}
      >
        <Box my={{ base: 4, lg: 8 }}>
          <Text ml={{ lg: 4 }} fontSize='13px' align='left' mb={3}>
            Enter the one time password (OTP) sent to{' '}
            <Text as='span' fontWeight='bold'>
              {phoneNumber}
            </Text>
          </Text>
          <CustomOTPInput
            value={formik.values.pin}
            error={formik.errors.pin}
            isDisabled={formik.isSubmitting}
            onChange={otp => formik.setFieldValue('pin', otp)}
          />
        </Box>

        <Box mx='auto' w={{ base: '100%', lg: 120 }}>
          <Button
            w='100%'
            rounded='0'
            type='submit'
            color='#fff'
            fontSize='md'
            boxShadow='lg'
            fontWeight={400}
            colorScheme='gcuButton'
            h={{ base: '3.375rem' }}
            _focus={{ outline: 'none' }}
            isLoading={formik.isSubmitting}
            isDisabled={formik.isSubmitting}
          >
            Verify Code
          </Button>
        </Box>

        <Box fontSize={{ base: 'sm', lg: 'md' }} mt={{ base: 2, lg: 8 }}>
          <Text>Didn't receive OTP ({count}s)</Text>

          {!count && (
            <Button
              px={0}
              bg='unset'
              color='gcu.100'
              isLoading={loading}
              isDisabled={loading}
              _hover={{ bg: 'unset' }}
              onClick={() => handleResendOTP()}
            >
              Resend OTP
            </Button>
          )}
        </Box>

        {(successMessage || errorMessage) && (
          <CustomAlert
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        )}
      </Flex>
    </Container>
  )
}

StepFour.propTypes = {
  user: PropTypes.any,
  errorMessage: PropTypes.any,
  successMessage: PropTypes.any,
  auth: PropTypes.any.isRequired,
  code: PropTypes.any.isRequired,
  otpId: PropTypes.any.isRequired,
  store: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  verifyOTP: PropTypes.func.isRequired,
  phoneNumber: PropTypes.any.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepFour
