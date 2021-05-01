/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Text,
  Flex,
  Alert,
  Button,
  Heading,
  Container,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'

import Legal from './Legal'
import CustomOTPInput from 'components/Forms/CustomOTPInput'

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .min(6, 'Invalid code')
    .max(6, 'Invalid code')
    .required('Application code is required!')
})

const StepThree = ({
  auth,
  setStep,
  setCode,
  setOtpId,
  resendCode,
  phoneNumber,
  errorMessage,
  successMessage,
  setPhoneNumber,
  setErrorMessage,
  setSuccessMessage
}) => {
  const [count, setCount] = React.useState(60)
  const [loading, setLoading] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await auth(values)
        setOtpId(res.data.pinId)
        setPhoneNumber(res.data.to)
        setCode(values.code)
        setErrorMessage(null)
        setSuccessMessage(res.message)
        setStep(4)
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
          error?.message || error?.data?.message || 'Unexpected error.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    let idi, idt
    if (phoneNumber) {
      idi = setInterval(() => {
        setCount(prev => prev - 1)
      }, 1000)
      idt = setTimeout(() => {
        clearInterval(idi)
      }, 60000)
    }
    return () => {
      if (phoneNumber) {
        clearInterval(idi)
        clearTimeout(idt)
      }
    }
  }, [setCount, phoneNumber])

  return (
    <Container
      align='center'
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '2xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Application Code
      </Heading>
      <Legal />
      <Flex as='form' flexDir='column' onSubmit={formik.handleSubmit}>
        <CustomOTPInput
          mt={{ lg: 12 }}
          value={formik.values.code}
          error={formik.errors.code}
          isDisabled={formik.isSubmitting}
          onChange={code => formik.setFieldValue('code', code)}
        />
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
            Next
          </Button>
        </Box>
      </Flex>

      {phoneNumber && (
        <Box mt={{ lg: 8 }}>
          <Text>Didn't receive code ({count}s)</Text>

          {!count && (
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
        <Box mt={{ lg: 8 }}>
          <Alert px={5} py={6} status={errorMessage ? 'error' : 'success'}>
            <AlertIcon />
            <AlertTitle color={errorMessage ? 'red.600' : 'green.600'} mr={2}>
              {successMessage || errorMessage}
            </AlertTitle>
          </Alert>
        </Box>
      )}
    </Container>
  )
}

StepThree.propTypes = {
  errorMessage: PropTypes.any,
  successMessage: PropTypes.any,
  phoneNumber: PropTypes.string,
  auth: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
  setOtpId: PropTypes.func.isRequired,
  resendCode: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepThree
