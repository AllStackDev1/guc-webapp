import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Box, Flex, Text, Button } from '@chakra-ui/react'

import useApi from 'context/api'
import useApp from 'context/app'

import CustomInput from 'components/Forms/CustomInput'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().email('Invalid email!').required('Email is required!'),
  phoneNumber: yup
    .string()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, {
      message: 'Invalid phone number, exclude country code!'
    })
    .required('Phone number is required!')
})

const Enroll = () => {
  const { setStep, setSuccessMessage, setErrorMessage } = useApp()
  const { enroll } = useApi()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await enroll(values)
        setErrorMessage(null)
        setSuccessMessage(
          'An Application code has been sent to your email address'
        )
        setStep('code')
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

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit
  } = formik

  return (
    <Flex
      as='form'
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      flexDir='column'
      onSubmit={handleSubmit}
    >
      <Flex flexDir='column' mb={{ lg: 6 }}>
        <Text as='label' id='firstName' fontSize='sm' mb={2}>
          Full Name
          <Text as='span' color='red.500'>
            {' *'}
          </Text>
        </Text>
        <Flex justify='space-between'>
          <Box w={{ lg: '48%' }} mr={{ lg: 2 }}>
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
          <Box w={{ lg: '48%' }} ml={{ lg: 2 }}>
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
      <Box mb={{ lg: 6 }}>
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
        <CustomInput
          type='text'
          isRequired
          name='phoneNumber'
          onBlur={handleBlur}
          label='Phone Number'
          onChange={handleChange}
          error={errors.phoneNumber}
          touched={touched.phoneNumber}
          defaultValue={values.phoneNumber}
          placeholder='Enter your Phone Number'
        />
      </Box>

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
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
      >
        Apply Now !!
      </Button>

      <Text align='center' mt={{ lg: 8 }} mb={{ lg: 3 }}>
        OR
      </Text>
      <Box align='center'>
        <Text
          as='span'
          fontSize='lg'
          align='center'
          color='gcu.100'
          cursor='pointer'
          onClick={() => setStep('code')}
          _hover={{ textDecor: 'none', fontWeight: '500' }}
          _focus={{ textDecor: 'none', fontWeight: '500' }}
        >
          Continue Application
        </Text>
      </Box>
    </Flex>
  )
}

export default Enroll
