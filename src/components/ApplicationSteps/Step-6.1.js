import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  Flex,
  Grid,
  GridItem,
  Button,
  Heading,
  Container
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'

const validationSchema = yup.object().shape({
  previousSchool: yup.object().shape({
    name: yup.string().required('School name is required!'),
    address: yup.string().required('School address is required!'),
    email: yup.string().email('Invalid email!').required('Email is required!'),
    endDate: yup.string().required('Date of Leaving is required!'),
    startDate: yup.string().required('Date of Arrival is required!')
  })
})

const StepSixOne = ({
  enroll,
  setStep,
  setErrorMessage,
  setSuccessMessage
}) => {
  const formik = useFormik({
    initialValues: {
      previousSchool: {
        name: '',
        email: '',
        address: '',
        endDate: '',
        startDate: ''
      }
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await enroll(values)
        setErrorMessage(null)
        setSuccessMessage(
          'An application code has been sent to your email address'
        )
        setStep(3)
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
    // isSubmitting,
    handleSubmit
  } = formik

  return (
    <Container
      align='center'
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '3xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Previous Schools
      </Heading>

      <Flex
        as='form'
        mt={{ lg: 16 }}
        px={{ lg: 10 }}
        flexDir='column'
        onSubmit={handleSubmit}
      >
        <Grid
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(2, 1fr)'
          gap={6}
        >
          <GridItem>
            <CustomInput
              type='text'
              isRequired
              label='School Name'
              onBlur={handleBlur}
              onChange={handleChange}
              name='previousSchool.name'
              placeholder='Enter School Name'
              error={errors.previousSchool?.name}
              touched={touched.previousSchool?.name}
              defaultValue={values.previousSchool?.name}
            />
          </GridItem>
          <GridItem>
            <CustomInput
              type='text'
              isRequired
              label='Address'
              onBlur={handleBlur}
              onChange={handleChange}
              name='previousSchool.address'
              placeholder='Enter School Address'
              error={errors.previousSchool?.address}
              touched={touched.previousSchool?.address}
              defaultValue={values.previousSchool?.address}
            />
          </GridItem>
          <GridItem>
            <CustomInput
              type='text'
              isRequired
              label='Email address'
              onBlur={handleBlur}
              onChange={handleChange}
              name='previousSchool.email'
              placeholder='Enter School Email'
              error={errors.previousSchool?.email}
              touched={touched.previousSchool?.email}
              defaultValue={values.previousSchool?.email}
            />
          </GridItem>
          <GridItem>
            <CustomInput
              type='date'
              isRequired
              onBlur={handleBlur}
              label='Date of Arrival'
              onChange={handleChange}
              name='previousSchool.startDate'
              placeholder='Enter School startDate'
              error={errors.previousSchool?.startDate}
              touched={touched.previousSchool?.startDate}
              defaultValue={values.previousSchool?.startDate}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <CustomInput
              type='date'
              isRequired
              onBlur={handleBlur}
              label='Date of Leaving'
              onChange={handleChange}
              name='previousSchool.endDate'
              placeholder='Enter School endDate'
              error={errors.previousSchool?.endDate}
              touched={touched.previousSchool?.endDate}
              defaultValue={values.previousSchool?.endDate}
            />
          </GridItem>
        </Grid>

        <Flex w='100%' justify='flex-end'>
          <Button
            mt={8}
            w='200px'
            mr={3}
            rounded='0'
            type='submit'
            color='gcu.100'
            fontSize='sm'
            boxShadow='lg'
            fontWeight={600}
            variant='outline'
            colorScheme='gcuButton'
            h={{ base: '3.375rem' }}
            _focus={{ outline: 'none' }}
          >
            Cancel
          </Button>
          <Button
            mt={8}
            w='200px'
            rounded='0'
            type='submit'
            color='#fff'
            fontSize='sm'
            boxShadow='lg'
            fontWeight={400}
            colorScheme='gcuButton'
            h={{ base: '3.375rem' }}
            _focus={{ outline: 'none' }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

StepSixOne.propTypes = {
  enroll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepSixOne
