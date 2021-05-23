/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import jwt_decode from 'jwt-decode'
import { useFormik } from 'formik'
import { Box, Text, Flex, Button, Heading, Container } from '@chakra-ui/react'

import Legal from './Legal'
import CustomOTPInput from 'components/Forms/CustomOTPInput'
import CustomAlert from './CustomAlert'
import CustomButton from 'components/Forms/CustomButton'

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .min(6, 'Invalid code')
    .max(6, 'Invalid code')
    .required('Application code is required!')
})

const StepThree = ({
  auth,
  store,
  email,
  setCode,
  setStep,
  setOtpId,
  resendCode,
  phoneNumber,
  errorMessage,
  successMessage,
  setPhoneNumber,
  setErrorMessage,
  setSuccessMessage
}) => {
  const [counter, setCounter] = React.useState(60)
  const [loading, setLoading] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await auth(values)
        // setOtpId(res.data.pinId)
        // setPhoneNumber(res.data.to)
        // setCode(values.code)
        // setErrorMessage(null)
        // setSuccessMessage(res.message)
        // setStep(4)
        setErrorMessage(null)
        setSuccessMessage(null)
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

  const handleResendCode = async () => {
    try {
      const res = await resendCode({ phoneNumber })
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
    setErrorMessage(null)
    if (email) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    }
  }, [counter, email, setErrorMessage])

  return (
    <Container
      align='center'
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '2xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Application Code
      </Heading>

      <Legal />

      {email && (
        <Box mt={6}>
          <Text>
            An Email with your application code have been sent to <b>{email}</b>
            , if it’s not in your inbox kindly check your spam box
          </Text>
        </Box>
      )}

      <Flex
        as='form'
        mt={{ base: 4, lg: 'unset' }}
        flexDir='column'
        onSubmit={formik.handleSubmit}
      >
        <CustomOTPInput
          mt={{ base: 8, lg: 12 }}
          value={formik.values.code}
          error={formik.errors.code}
          isDisabled={formik.isSubmitting}
          onChange={code => formik.setFieldValue('code', code)}
        />

        <Box mx='auto' w={{ base: '100%', lg: 120 }}>
          <CustomButton
            w='100%'
            color='#fff'
            type='submit'
            label='Next'
            isLoading={formik.isSubmitting}
            isDisabled={formik.isSubmitting}
          />
        </Box>

        {email && (
          <Box mt={{ lg: 8 }}>
            <Text>Didn't receive code ({counter}s)</Text>

            {!counter && (
              <Button
                px={0}
                bg='unset'
                color='gcu.100'
                isLoading={loading}
                isDisabled={loading}
                _hover={{ bg: 'unset' }}
                onClick={() => handleResendCode()}
              >
                Resend code
              </Button>
            )}
          </Box>
        )}

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

StepThree.propTypes = {
  errorMessage: PropTypes.any,
  successMessage: PropTypes.any,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  auth: PropTypes.func.isRequired,
  store: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
  setOtpId: PropTypes.func.isRequired,
  resendCode: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepThree
