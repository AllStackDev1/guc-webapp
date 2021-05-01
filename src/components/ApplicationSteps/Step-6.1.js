import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import {
  Flex,
  Grid,
  GridItem,
  Button,
  Heading,
  Container,
  useToast
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'

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
        if (editData._id) {
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
          <GridItem colSpan={2}>
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

        <Flex w='100%' justify='flex-end'>
          <Button
            mt={8}
            w='200px'
            mr={3}
            rounded='0'
            type='button'
            color='gcu.100'
            fontSize='sm'
            boxShadow='lg'
            fontWeight={600}
            variant='outline'
            colorScheme='gcuButton'
            h={{ base: '3.375rem' }}
            _focus={{ outline: 'none' }}
            onClick={() => setStep(6.2)}
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
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Next
          </Button>
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
