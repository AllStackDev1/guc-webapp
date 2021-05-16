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
  code: yup
    .string()
    .min(6, 'Invalid otp')
    .max(6, 'Invalid otp')
    .required('OTP is required!')
})

const StepFour = ({
  auth,
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
  const [counter, setCounter] = React.useState(59)
  const [loading, setLoading] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setErrorMessage(null)
        setSuccessMessage(null)
        const res = await verifyOTP({ to: phoneNumber, code: values.code })
        store(res.data)
        const user = jwt_decode(res.data)
        if (user.status === 'PENDING') {
          setStep(5)
          sessionStorage.setItem('step', 5)
        } else {
          setStep(user.stage)
          sessionStorage.setItem('step', user.stage)
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

  // React.useEffect(() => {
  //   if (!otpId) {
  //     return setStep(3)
  //   }
  // }, [otpId, setStep])

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
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

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
            value={formik.values.code}
            error={formik.errors.code}
            isDisabled={formik.isSubmitting}
            onChange={otp => formik.setFieldValue('code', otp)}
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
          <Text>Didn't receive OTP ({counter}s)</Text>

          {!counter && (
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
  errorMessage: PropTypes.any,
  successMessage: PropTypes.any,
  auth: PropTypes.any.isRequired,
  code: PropTypes.any.isRequired,
  otpId: PropTypes.any,
  store: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  verifyOTP: PropTypes.func.isRequired,
  phoneNumber: PropTypes.any.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepFour
