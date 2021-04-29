import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  Flex,
  Button,
  Heading,
  Grid,
  GridItem,
  Container
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'

const validationSchema = yup.object().shape({
  contactInfo: yup.object().shape({
    relation: yup.string(),
    title: yup.string(),
    forename: yup.string(),
    surename: yup.string(),
    email: yup.string(),
    occupation: yup.string(),
    addressOne: yup.string(),
    addressTwo: yup.string(),
    township: yup.string(),
    mobileNumber: yup.string(),
    homeNumber: yup.string(),
    workNumber: yup.string(),
    homeLanguage: yup.string(),
    studentAddress: yup.string(),
    hearAboutUs: yup.string(),
    permissions: yup.string()
  })
})

const StepNine = ({ enroll, setStep, setErrorMessage, setSuccessMessage }) => {
  const lists = [
    {
      id: 'relation',
      text: 'Relation to Student'
    },
    {
      id: 'title',
      text: 'Select Title'
    },
    {
      id: 'forename',
      text: 'Forename'
    },
    {
      id: 'surename',
      text: 'Surename'
    },
    {
      id: 'email',
      text: 'Email address'
    },
    {
      id: 'occupation',
      text: 'Occupation'
    },
    {
      id: 'addressOne',
      text: 'Address 1'
    },
    {
      id: 'addressTwo',
      text: 'Address 2'
    },
    {
      id: 'township',
      text: 'Township'
    },
    {
      id: 'mobileNumber',
      text: 'Mobile Number'
    },
    {
      id: 'homeNumber',
      text: 'Home Number'
    },
    {
      id: 'workNumber',
      text: 'Work Number'
    },
    {
      id: 'homeLanguage',
      text: 'Language Spoken at Home'
    },
    {
      id: 'studentAddress',
      text: 'Address of student'
    },
    {
      id: 'hearAboutUs',
      text: 'How did u hear about us'
    },
    {
      id: 'permissions',
      text: 'I give permission for the students photo to appear on:'
    }
  ]

  const formik = useFormik({
    initialValues: {
      specialNeeds: '',
      enrollNetwork: ''
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
        Contact Information
      </Heading>

      <Flex
        as='form'
        mt={{ lg: 20 }}
        px={{ lg: 10 }}
        flexDir='column'
        onSubmit={handleSubmit}
      >
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          {lists.map((list, idx) => (
            <GridItem key={list.id} colSpan={[14, 15].includes(idx) ? 2 : 1}>
              {[1, 14, 15].includes(idx) ? (
                <CustomSelect
                  isRequired
                  label={list.text}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name={list.id}
                  placeholder='Select Option'
                  error={errors[list.id]}
                  touched={touched[list.id]}
                  options={['Male', 'Female', 'Others']}
                  defaultValue={values[list.id]}
                />
              ) : (
                <CustomInput
                  type='text'
                  isRequired
                  name={list.id}
                  label={list.text}
                  onBlur={handleBlur}
                  error={errors.list?.id}
                  touched={touched.list?.id}
                  onChange={handleChange}
                  defaultValue={values.list?.id}
                />
              )}
            </GridItem>
          ))}
        </Grid>

        <Flex mt={{ lg: 12 }} flexDir='column' align='flex-start'>
          <Flex w='100%' justify='space-between'>
            <Button
              mt={8}
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
              Previous
            </Button>
            <Button
              mt={8}
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
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

StepNine.propTypes = {
  enroll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepNine
