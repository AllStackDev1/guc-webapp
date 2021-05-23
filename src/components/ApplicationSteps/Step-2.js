import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import validator from 'validator'
import { useFormik } from 'formik'
import { Box, Flex, Text, Heading, Container } from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'
import CustomPhoneInput from 'components/Forms/CustomPhoneInput'
import CustomButton from 'components/Forms/CustomButton'

import Legal from './Legal'
import CustomAlert from './CustomAlert'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().email('Invalid email!').required('Email is required!'),
  phoneNumber: yup
    .string()
    .test(
      'valid',
      'Invalid phone number, exclude country code!',
      value =>
        value && validator.isMobilePhone(value, 'any', { strictMode: true })
    )
    .required('Phone number is required!')
})

const StepTwo = ({
  enroll,
  setStep,
  setEmail,
  errorMessage,
  setPhoneNumber,
  setErrorMessage,
  setSuccessMessage
}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      lastName: '',
      firstName: '',
      phoneNumber: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = { ...values }
        delete data.country
        const res = await enroll(data)
        setErrorMessage(null)
        setPhoneNumber(res.data.phoneNumber)
        setEmail(res.data.email)
        setSuccessMessage(
          'An Application code has been sent to your email address'
        )
        setStep(3)
      } catch (error) {
        setSuccessMessage(null)
        if (error?.data?.message === 'celebrate request validation failed') {
          setErrorMessage('Invalid data, please check form.')
        } else {
          setErrorMessage(
            error?.message ||
              error?.data?.message ||
              'Unexpected network error.'
          )
        }
      } finally {
        setSubmitting(false)
      }
    }
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = formik

  return (
    <Container
      align='center'
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '3xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Online Application
      </Heading>

      <Legal />

      <Flex
        as='form'
        mt={{ base: 4, lg: 4 }}
        px={{ lg: 10 }}
        flexDir='column'
        onSubmit={handleSubmit}
      >
        <Flex flexDir='column' mb={{ base: 3, lg: 6 }}>
          <Text
            as='label'
            align='left'
            id='firstName'
            d={{ base: 'none', lg: 'block' }}
            fontSize='sm'
            mb={2}
          >
            Full Name
            <Text as='span' color='red.500'>
              {' *'}
            </Text>
          </Text>
          <Flex flexDir={{ base: 'column', lg: 'row' }} justify='space-between'>
            <Box
              textAlign='left'
              w={{ lg: '48%' }}
              mb={{ base: 2, lg: 0 }}
              mr={{ lg: 2 }}
            >
              <Text
                as='label'
                align='left'
                id='firstName'
                d={{ lg: 'none' }}
                fontSize='xs'
                mb={2}
              >
                First Name
                <Text as='span' color='red.500'>
                  {' *'}
                </Text>
              </Text>
              <CustomInput
                type='text'
                isRequired
                name='firstName'
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='First Name'
                error={errors.firstName}
                touched={touched.firstName}
                defaultValue={values.firstName}
              />
            </Box>
            <Box textAlign='left' w={{ lg: '48%' }} ml={{ lg: 2 }}>
              <Text
                as='label'
                align='left'
                id='firstName'
                d={{ lg: 'none' }}
                fontSize='xs'
                mb={2}
              >
                Last Name
                <Text as='span' color='red.500'>
                  {' *'}
                </Text>
              </Text>
              <CustomInput
                type='text'
                isRequired
                name='lastName'
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='Last Name'
                error={errors.lastName}
                touched={touched.lastName}
                defaultValue={values.lastName}
              />
            </Box>
          </Flex>
        </Flex>
        <Box mb={{ base: 3, lg: 6 }}>
          <CustomInput
            type='text'
            isRequired
            name='email'
            onBlur={handleBlur}
            label='Email Address'
            error={errors.email}
            touched={touched.email}
            onChange={handleChange}
            defaultValue={values.email}
            placeholder='Enter your email address'
          />
        </Box>
        <Box mb={{ lg: 8 }}>
          <CustomPhoneInput
            isRequired
            name='phoneNumber'
            error={errors.phoneNumber}
            value={values.phoneNumber}
            touched={touched.phoneNumber}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </Box>

        <CustomButton
          w='100%'
          color='#fff'
          type='submit'
          label='Continue'
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        />

        {errorMessage && <CustomAlert errorMessage={errorMessage} />}
      </Flex>
    </Container>
  )
}

StepTwo.propTypes = {
  errorMessage: PropTypes.any,
  enroll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepTwo
