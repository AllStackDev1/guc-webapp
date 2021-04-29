import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'

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
  setOtpId,
  setPhoneNumber,
  setErrorMessage,
  setSuccessMessage
}) => {
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

  return (
    <Box>
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
          onChange={otp => formik.setFieldValue('code', otp)}
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
    </Box>
  )
}

StepThree.propTypes = {
  auth: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setOtpId: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepThree
