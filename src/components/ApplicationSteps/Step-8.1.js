import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Grid,
  Button,
  Heading,
  GridItem,
  Container
} from '@chakra-ui/react'
import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'

const validationSchema = yup.object().shape({
  sibilings: yup.object().shape({
    name: yup.string().required('Name is required!'),
    gender: yup.string().required('Gender is required!'),
    dob: yup.string().required('Date of birth is required!')
  })
})

const StepEightOne = ({
  enroll,
  setStep,
  setErrorMessage,
  setSuccessMessage
}) => {
  const formik = useFormik({
    initialValues: {
      sibilings: {
        name: '',
        gender: '',
        dob: ''
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
        Sibling
      </Heading>

      <Grid
        mt={{ lg: 20 }}
        as='form'
        onSubmit={handleSubmit}
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={6}
      >
        <GridItem>
          <CustomInput
            type='text'
            isRequired
            label='Name'
            onBlur={handleBlur}
            onChange={handleChange}
            name='sibilings.name'
            placeholder='Enter School Name'
            error={errors.sibilings?.name}
            touched={touched.sibilings?.name}
            defaultValue={values.sibiling?.name}
          />
        </GridItem>
        <GridItem>
          <CustomSelect
            isRequired
            label='Gender'
            onBlur={handleBlur}
            onChange={handleChange}
            name='sibilings.gender'
            placeholder='Select Gender'
            error={errors.sibilings?.gender}
            touched={touched.sibilings?.gender}
            options={['Male', 'Female', 'Others']}
            defaultValue={values.sibilings?.gender}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <CustomInput
            type='date'
            isRequired
            label='Date of Birth'
            onBlur={handleBlur}
            onChange={handleChange}
            name='sibilings.email'
            error={errors.sibilings?.email}
            touched={touched.sibilings?.email}
            defaultValue={values.sibilings?.email}
          />
        </GridItem>
      </Grid>
      <Flex justify='flex-end'>
        <Button
          w='200px'
          rounded='0'
          type='submit'
          color='gcu.100'
          fontSize='md'
          boxShadow='lg'
          fontWeight={600}
          variant='outline'
          colorScheme='gcuButton'
          h={{ base: '3.375rem' }}
          _focus={{ outline: 'none' }}
        >
          Cancel|| Skip
        </Button>
        <Box mx={3} />
        <Button
          w='200px'
          rounded='0'
          type='submit'
          color='#fff'
          fontSize='md'
          boxShadow='lg'
          fontWeight={600}
          colorScheme='gcuButton'
          h={{ base: '3.375rem' }}
          _focus={{ outline: 'none' }}
        >
          Save
        </Button>
      </Flex>
    </Container>
  )
}

StepEightOne.propTypes = {
  enroll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepEightOne
