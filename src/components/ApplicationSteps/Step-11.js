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
import CustomSelect from 'components/Forms/CustomSelect'

const validationSchema = yup.object().shape({
  emergencyContact: yup.object().shape({
    name: yup.string().required('Name is required!'),
    relationship: yup.string().required('Relationship type is required!'),
    phoneNumber: yup.string().required('Phone number is required!')
  })
})

const StepEleven = ({
  enroll,
  setStep,
  setErrorMessage,
  setSuccessMessage
}) => {
  const formik = useFormik({
    initialValues: {
      emergencyContact: {
        name: '',
        relationship: '',
        phoneNumber: ''
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
      minW={{ lg: '4xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Emergency Contact
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
              label='Name'
              onBlur={handleBlur}
              onChange={handleChange}
              name='emergencyContact.name'
              placeholder='Enter Name'
              error={errors.emergencyContact?.name}
              touched={touched.emergencyContact?.name}
              defaultValue={values.emergencyContact?.name}
            />
          </GridItem>
          <GridItem>
            <CustomSelect
              isRequired
              label='Relationship to student'
              onBlur={handleBlur}
              onChange={handleChange}
              name='emergencyContact.relationship'
              placeholder='Select Option'
              options={[
                'Mother',
                'Father',
                'Uncle',
                'Aunt',
                'Brother',
                'Sister',
                'Grand Father',
                'Grand Mother'
              ]}
              error={errors.emergencyContact?.relationship}
              touched={touched.emergencyContact?.relationship}
              defaultValue={values.emergencyContact?.relationship}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <CustomInput
              type='text'
              isRequired
              label='Contact Number'
              onBlur={handleBlur}
              onChange={handleChange}
              name='emergencyContact.phoneNumber'
              placeholder='Enter contact number'
              error={errors.emergencyContact?.phoneNumber}
              touched={touched.emergencyContact?.phoneNumber}
              defaultValue={values.emergencyContact?.phoneNumber}
            />
          </GridItem>
        </Grid>

        <Flex w='100%' justify='space-between'>
          <Button
            w='200px'
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
            Previous
          </Button>
          <Button
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

StepEleven.propTypes = {
  enroll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepEleven
