/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react'
import validator from 'validator'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import jwt_decode from 'jwt-decode'
import { useFormik } from 'formik'
import { Box, Text, Flex, Button, Heading, Container } from '@chakra-ui/react'

import Legal from './Legal'
import CustomOTPInput from 'components/Forms/CustomOTPInput'
import CustomAlert from './CustomAlert'
import CustomButton from 'components/Forms/CustomButton'
import CustomPhoneInput from 'components/Forms/CustomPhoneInput'

const validationSchema = yup.object().shape(
  {
    code: yup.string().when('phoneNumber', {
      is: phoneNumber => !phoneNumber || phoneNumber.length === 0,
      then: yup
        .string()
        .min(6, 'Invalid code')
        .max(6, 'Invalid code')
        .required('This field is required!'),
      otherwise: yup.string()
    }),
    phoneNumber: yup.string().when('code', {
      is: code => !code || code.length === 0,
      then: yup
        .string()
        .test(
          'valid',
          'Invalid phone number, exclude country code!',
          value =>
            value && validator.isMobilePhone(value, 'any', { strictMode: true })
        )
        .required('This field is required!'),
      otherwise: yup.string()
    })
  },
  [['code', 'phoneNumber']]
)

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
  enterApplication,
  setSuccessMessage
}) => {
  const [counter, setCounter] = React.useState(60)
  const [loading, setLoading] = React.useState(false)
  const [phoneNumberInput, setPhoneNumberInput] = React.useState(false)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: '',
      phoneNumber: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        delete values.country
        if (phoneNumberInput) {
          delete values.code
          const res = await resendCode(values)
          setErrorMessage(null)
          setSuccessMessage(res.message)
        } else {
          delete values.phoneNumber
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

  const togglePhoneNumberInput = () => setPhoneNumberInput(e => !e)

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
        {enterApplication && 'Please Enter'} Application Code
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
        {phoneNumberInput ? (
          <Box mx='auto' w={{ base: '100%', lg: 120 }} my={{ base: 5, lg: 8 }}>
            <CustomPhoneInput
              isRequired
              name='phoneNumber'
              error={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
              onChange={formik.handleChange}
              defaultValue={formik.values.phoneNumber}
              setFieldValue={formik.setFieldValue}
              setFieldTouched={formik.setFieldTouched}
            />
          </Box>
        ) : (
          <CustomOTPInput
            mt={{ base: 8, lg: 12 }}
            value={formik.values.code}
            error={formik.errors.code}
            isDisabled={formik.isSubmitting}
            onChange={code => formik.setFieldValue('code', code)}
          />
        )}

        <Box mx='auto' w={{ base: '100%', lg: 120 }}>
          <CustomButton
            w='100%'
            color='#fff'
            type='submit'
            label={phoneNumberInput ? 'Continue' : 'Next'}
            isLoading={formik.isSubmitting}
            isDisabled={formik.isSubmitting}
          />
          {!!counter && !email && !phoneNumberInput ? (
            <Box mt={4} justify='center'>
              <Button
                bg='unset'
                px={0}
                type='button'
                color='gcu.100'
                isLoading={loading}
                isDisabled={loading}
                _hover={{ bg: 'unset' }}
                onClick={togglePhoneNumberInput}
              >
                Resend application code
              </Button>
            </Box>
          ) : (
            <Flex mt={4} justify='center'>
              <Text
                color='gcu.100'
                cursor='pointer'
                fontWeight='bold'
                textDecor='underline'
                onClick={togglePhoneNumberInput}
              >
                Login with code
              </Text>
            </Flex>
          )}
        </Box>

        {email && (
          <Box mt={{ lg: 8 }}>
            <Text>Didn't receive code ({counter}s)</Text>

            {!counter && (
              <Button
                px={0}
                bg='unset'
                type='button'
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
  enterApplication: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
  setOtpId: PropTypes.func.isRequired,
  resendCode: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepThree
