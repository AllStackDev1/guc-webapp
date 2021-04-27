/* eslint-disable no-console */
import React from 'react'
import * as yup from 'yup'
import OtpInput from 'react-otp-input'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import { useFormik } from 'formik'

import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .min(6, 'Invalid code')
    .max(6, 'Invalid code')
    .required('Application code is required!')
})

const ApplicationCode = () => {
  const { setStep, setSuccessMessage, setErrorMessage } = useApp()
  const { setOtpId } = useAuth()
  const { auth } = useApi()

  const formik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await auth(values)
        setOtpId(res.data.pinId)
        setErrorMessage(null)
        setSuccessMessage(res.message)
        setStep('otp')
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
    <Flex as='form' flexDir='column' onSubmit={formik.handleSubmit}>
      <Box mx='auto' my={{ lg: 12 }} w={{ lg: 108 }}>
        <OtpInput
          containerStyle={{
            justifyContent: 'space-around'
          }}
          inputStyle={{
            fontFamily: 'TRYVesterbro',
            borderRadius: '0.375rem',
            borderColor: '#F1F1F1',
            background: '#FAFAFA',
            appearance: 'none',
            padding: '0.75rem',
            fontSize: '2rem',
            fontWeight: '600',
            color: '#C82B38',
            borderWidth: 1,
            height: '4rem',
            width: '4rem'
          }}
          isInputNum
          numInputs={6}
          shouldAutoFocus
          errorStyle={{
            borderColor: '#E53E3E'
          }}
          value={formik.values.code}
          hasErrored={formik.errors.code}
          isDisabled={formik.isSubmitting}
          separator={<Text as='span'> </Text>}
          onChange={otp => formik.setFieldValue('code', otp)}
        />
        {formik.errors.code && (
          <Text align='left' mt={1} color='red.500' fontSize='sm'>
            {formik.errors.code}
          </Text>
        )}
      </Box>
      <Box mx='auto' w={{ lg: 108 }}>
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
          Apply Now !!
        </Button>
      </Box>
    </Flex>
  )
}

export default ApplicationCode
