import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import {
  Box,
  Flex,
  Grid,
  Heading,
  useToast,
  GridItem,
  Container
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'
import CustomButton from 'components/Forms/CustomButton'

const validationSchema = yup.object().shape({
  name: yup.string().required('This field is required!'),
  address: yup.string().required('This field is required!'),
  email: yup.string().email('Invalid email!').required('This field required!'),
  dateOfArrival: yup.string().required('This field is required!'),
  dateOfLeaving: yup.string().required('This field is required!')
})

const StepSixOne = ({
  setStep,
  editData,
  setPreviousSchool,
  updatePreviousSchool
}) => {
  const toast = useToast()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editData?.name || '',
      email: editData?.email || '',
      address: editData?.address || '',
      dateOfArrival: editData?.dateOfArrival || '',
      dateOfLeaving: editData?.dateOfLeaving || ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)
        if (editData?._id) {
          await updatePreviousSchool(editData._id, values)
        } else {
          await setPreviousSchool(values)
        }
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: 'Previous schoool saved successfully!'
        })
        window.sessionStorage.removeItem('previous-schoools')
        window.sessionStorage.setItem('step', 6.2)
        setStep(6.2)
      } catch (error) {
        let eMgs
        if (error?.data?.message === 'celebrate request validation failed') {
          eMgs = 'Invalid data, please check form.'
        } else {
          eMgs =
            error?.message ||
            error?.data?.message ||
            'Unexpected network error.'
        }
        toast({
          duration: 9000,
          status: 'error',
          isClosable: true,
          position: 'top-right',
          title: 'Error',
          description: eMgs
        })
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
    <Container
      align='center'
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '3xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Previous Schools
      </Heading>

      <Flex
        as='form'
        mt={{ base: 6, lg: 16 }}
        px={{ lg: 10 }}
        flexDir='column'
        onSubmit={handleSubmit}
      >
        <Grid
          templateRows={{ lg: 'repeat(3, 1fr)' }}
          templateColumns={{ lg: 'repeat(2, 1fr)' }}
          gap={{ base: 3, lg: 6 }}
        >
          <GridItem>
            <CustomInput
              type='text'
              isRequired
              label='School Name'
              onBlur={handleBlur}
              onChange={handleChange}
              name='name'
              placeholder='Enter School Name'
              error={errors.name}
              touched={touched.name}
              defaultValue={values.name}
            />
          </GridItem>
          <GridItem>
            <CustomInput
              type='text'
              isRequired
              label='Address'
              onBlur={handleBlur}
              onChange={handleChange}
              name='address'
              placeholder='Enter School Address'
              error={errors.address}
              touched={touched.address}
              defaultValue={values.address}
            />
          </GridItem>
          <GridItem>
            <CustomInput
              type='text'
              isRequired
              label='Email address'
              onBlur={handleBlur}
              onChange={handleChange}
              name='email'
              placeholder='Enter School Email'
              error={errors.email}
              touched={touched.email}
              defaultValue={values.email}
            />
          </GridItem>
          <GridItem>
            <CustomInput
              type='date'
              isRequired
              onBlur={handleBlur}
              label='Date of Arrival'
              onChange={handleChange}
              name='dateOfArrival'
              error={errors.dateOfArrival}
              touched={touched.dateOfArrival}
              defaultValue={moment(values.dateOfArrival).format('YYYY-MM-DD')}
            />
          </GridItem>
          <GridItem colSpan={{ lg: 2 }}>
            <CustomInput
              type='date'
              isRequired
              onBlur={handleBlur}
              label='Date of Leaving'
              name='dateOfLeaving'
              onChange={handleChange}
              error={errors.dateOfLeaving}
              touched={touched.dateOfLeaving}
              defaultValue={moment(values.dateOfLeaving).format('YYYY-MM-DD')}
            />
          </GridItem>
        </Grid>

        <Flex
          w='100%'
          mt={8}
          flexDir={{ base: 'column-reverse', lg: 'row' }}
          justify={{ lg: 'flex-end' }}
        >
          <CustomButton
            color='gcu.100'
            variant='outline'
            label='Cancel'
            type='button'
            onClick={() => setStep(6.2)}
          />
          <Box d={{ base: 'none', lg: 'block' }} mx={4} />
          <CustomButton
            label='Next'
            color='#fff'
            type='submit'
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          />
        </Flex>
      </Flex>
    </Container>
  )
}

StepSixOne.propTypes = {
  editData: PropTypes.object,
  setStep: PropTypes.func.isRequired,
  setPreviousSchool: PropTypes.func.isRequired,
  updatePreviousSchool: PropTypes.func.isRequired
}

export default StepSixOne
