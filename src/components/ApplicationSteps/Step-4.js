import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { Box, Flex, Text, Button, Heading, Container } from '@chakra-ui/react'
import { useFormik } from 'formik'

import Legal from './Legal'
import CustomOTPInput from 'components/Forms/CustomOTPInput'

const validationSchema = yup.object().shape({
  pin_id: yup.string(),
  pin: yup
    .string()
    .min(6, 'Invalid otp')
    .max(6, 'Invalid otp')
    .required('OTP is required!')
})

const StepFour = ({
  otpId,
  store,
  setStep,
  verifyOTP,
  phoneNumber,
  setErrorMessage,
  setSuccessMessage
}) => {
  const formik = useFormik({
    initialValues: {
      pin: '',
      pin_id: otpId
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await verifyOTP(values)
        store(res.data)
        setErrorMessage(null)
        setSuccessMessage(null)
        setStep(5)
      } catch (error) {
        setSuccessMessage(null)
        setErrorMessage(
          error?.message || error?.data?.message || 'Unexpected error.'
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

  return (
    <Container
      align='center'
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '2xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        OTP Verification
      </Heading>

      <Legal />

      <Flex as='form' flexDir='column' onSubmit={formik.handleSubmit}>
        <Box my={{ lg: 8 }}>
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

        <Box mx='auto' w={{ lg: 120 }}>
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
      </Flex>
    </Container>
  )
}

StepFour.propTypes = {
  otpId: PropTypes.any.isRequired,
  store: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  verifyOTP: PropTypes.func.isRequired,
  phoneNumber: PropTypes.any.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepFour
