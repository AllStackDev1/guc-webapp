import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  useToast,
  ListItem,
  Container,
  OrderedList
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'

import { StepSevenSchema } from './validations'

const StepSeven = ({ setStep, setStudentBackground }) => {
  const toast = useToast()

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
    validationSchema: StepSevenSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await setStudentBackground(values)
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: 'Student background information saved!'
        })
        window.sessionStorage.setItem('step', 8.1)
        setStep(8.1)
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
      minW={{ lg: '5xl' }}
    >
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
          {lists.map((list, idx) => (
            <ListItem
              d='flex'
              key={list.id}
              textAlign='left'
              alignItems='center'
              justifyContent='space-between'
            >
              <Flex w='45%' align='center'>
                <Text mr={4} fontWeight='bold'>
                  {idx + 1}.
                </Text>
                <Text
                  textAlign='left'
                  fontWeight={500}
                  fontSize={{ base: 'xs', lg: 'sm' }}
                >
                  {list.text}{' '}
                  <Text as='span' color='red.500'>
                    *
                  </Text>
                </Text>
              </Flex>

              <Box w='50%'>
                <CustomInput
                  type='text'
                  isRequired
                  name={list.id}
                  onBlur={handleBlur}
                  placeholder='Please enter yes(with more details) or no'
                  error={errors[list.id]}
                  touched={touched[list.id]}
                  onChange={handleChange}
                  defaultValue={values[list.id]}
                />
              </Box>
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
              type='button'
              color='gcu.100'
              fontSize='md'
              boxShadow='lg'
              fontWeight={600}
              variant='outline'
              colorScheme='gcuButton'
              h={{ base: '3.375rem' }}
              _focus={{ outline: 'none' }}
              onClick={() => setStep(6.2)}
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

StepSeven.propTypes = {
  setStep: PropTypes.func.isRequired,
  setStudentBackground: PropTypes.func.isRequired
}

export default StepSeven
