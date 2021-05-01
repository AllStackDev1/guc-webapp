import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import {
  Flex,
  Grid,
  Button,
  Heading,
  GridItem,
  useToast,
  Container
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'

import { StepTenSchema } from './validations'

const StepTen = ({ setStep, setguardianContact }) => {
  const toast = useToast()
  const lists = [
    {
      id: 'relation',
      text: 'Relation to Student',
      isRequired: true,
      options: [
        'Father',
        'Monther',
        'Grand Father',
        'Grand Mother',
        'Uncle',
        'Aunty',
        'Sister',
        'Brother',
        'Guardian'
      ]
    },
    {
      id: 'title',
      text: 'Select Title',
      isRequired: true,
      options: ['Mr', 'Mrs', 'Sir', 'Ma', 'Chief']
    },
    {
      id: 'forename',
      text: 'Forename',
      isRequired: true
    },
    {
      id: 'surname',
      text: 'Surname',
      isRequired: true
    },
    {
      id: 'email',
      text: 'Email address',
      isRequired: true
    },
    {
      id: 'occupation',
      text: 'Occupation',
      isRequired: true
    },
    {
      id: 'addressOne',
      text: 'Address 1',
      isRequired: true
    },
    {
      id: 'addressTwo',
      text: 'Address 2'
    },
    {
      id: 'state',
      text: 'State',
      isRequired: true
    },
    {
      id: 'mobileNumber',
      text: 'Mobile Number',
      type: 'phone',
      isRequired: true
    },
    {
      id: 'homeNumber',
      type: 'phone',
      text: 'Home Number'
    },
    {
      id: 'workNumber',
      type: 'phone',
      text: 'Work Number'
    },
    {
      id: 'homeLanguage',
      text: 'Language Spoken at Home',
      isRequired: true
    },
    {
      id: 'studentAddress',
      text: 'Address of student',
      isRequired: true
    },
    {
      id: 'hearAboutUs',
      text: 'How did u hear about us',
      isRequired: true,
      options: [
        'Search Engine',
        'Facebook',
        'LinkedIn',
        'TV',
        'Radio',
        'Friend',
        'Others'
      ]
    },
    {
      id: 'permissions',
      text: 'I give permission for the students photo to appear on:',
      isRequired: true,
      options: ['Yes', 'No']
    }
  ]

  const formik = useFormik({
    initialValues: {
      state: '',
      title: '',
      email: '',
      surname: '',
      forename: '',
      relation: '',
      occupation: '',
      addressOne: '',
      addressTwo: '',
      homeNumber: '',
      workNumber: '',
      permissions: '',
      hearAboutUs: '',
      mobileNumber: '',
      homeLanguage: '',
      studentAddress: ''
    },
    validationSchema: StepTenSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await setguardianContact(values)
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: 'Guardian contact information saved!'
        })
        window.sessionStorage.setItem('step', 11)
        setStep(11)
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
      minW={{ lg: '4xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Guardian Contact Information
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
              {list.options ? (
                <CustomSelect
                  name={list.id}
                  label={list.text}
                  onBlur={handleBlur}
                  options={list.options}
                  onChange={handleChange}
                  error={errors[list.id]}
                  touched={touched[list.id]}
                  placeholder='Select Option'
                  isRequired={list.isRequired}
                  defaultValue={values[list.id]}
                />
              ) : (
                <CustomInput
                  type='text'
                  name={list.id}
                  label={list.text}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors[list.id]}
                  placeholder={list.text}
                  touched={touched[list.id]}
                  isRequired={list.isRequired}
                  defaultValue={values[list.id]}
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
              type='button'
              color='gcu.100'
              fontSize='md'
              boxShadow='lg'
              fontWeight={600}
              variant='outline'
              colorScheme='gcuButton'
              h={{ base: '3.375rem' }}
              _focus={{ outline: 'none' }}
              onClick={() => setStep(9)}
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
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

StepTen.propTypes = {
  setStep: PropTypes.func.isRequired,
  setguardianContact: PropTypes.func.isRequired
}

export default StepTen
