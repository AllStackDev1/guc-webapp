import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  ListItem,
  OrderedList
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'

const validationSchema = yup.object().shape({
  specialNeeds: yup.string().required('First name is required!'),
  enrollNetwork: yup.string().required('Last name is required!')
})

const StepSeven = ({ enroll, setStep, setErrorMessage, setSuccessMessage }) => {
  const lists = [
    {
      id: 'specialNeeds',
      text: 'Does your child have special needs, either emotional or physical?'
    },
    {
      id: 'enrollNetwork',
      text:
        'What is the anticipated length of time you will have your childen enrolled at Network?'
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
    <Box>
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Student Background
      </Heading>

      <Flex
        as='form'
        mt={{ lg: 20 }}
        px={{ lg: 10 }}
        flexDir='column'
        onSubmit={handleSubmit}
      >
        <OrderedList spacing={3}>
          {lists.map(list => (
            <ListItem
              d='flex'
              key={list.id}
              textAlign='left'
              alignItems='center'
            >
              <Text
                w='80%'
                textAlign='left'
                fontWeight={500}
                fontSize={{ base: 'xs', lg: 'sm' }}
                ml={2}
              >
                {list.text}
              </Text>
              <CustomInput
                type='text'
                isRequired
                name={list.id}
                onBlur={handleBlur}
                error={errors.phoneNumber?.[list.id]}
                touched={touched.phoneNumber?.[list.id]}
                onChange={handleChange}
                defaultValue={values.phoneNumber?.[list.id]}
              />
            </ListItem>
          ))}
        </OrderedList>

        <Flex
          mt={{ lg: 16 }}
          px={{ lg: 10 }}
          flexDir='column'
          align='flex-start'
        >
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
              fontWeight={400}
              colorScheme='gcuButton'
              h={{ base: '3.375rem' }}
              _focus={{ outline: 'none' }}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

StepSeven.propTypes = {
  enroll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepSeven
