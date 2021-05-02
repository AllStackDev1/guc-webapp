import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import {
  Box,
  Text,
  Flex,
  Heading,
  useToast,
  ListItem,
  Container,
  OrderedList
} from '@chakra-ui/react'

import CustomTextarea from 'components/Forms/CustomTextarea'
import CustomButton from 'components/Forms/CustomButton'

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
        'WWhat is the anticipated length of time you will have your child enrolled at Network?'
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
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '5xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Student Background
      </Heading>

      <Flex
        as='form'
        mt={{ base: 6, lg: 16 }}
        px={{ lg: 10 }}
        flexDir='column'
        onSubmit={handleSubmit}
      >
        <OrderedList spacing={{ base: 5, lg: 3 }} ml={0}>
          {lists.map((list, idx) => (
            <ListItem
              d='flex'
              key={list.id}
              flexDir={{ base: 'column', lg: 'row' }}
              textAlign='left'
              alignItems={{ base: 'flex-end', lg: 'center' }}
              justifyContent='space-between'
            >
              <Flex w={{ base: '100%', lg: '45%' }} align='center'>
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

              <Box w={{ base: '93%', lg: '50%' }} mt={{ base: 2, lg: 0 }}>
                <CustomTextarea
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
          <Flex
            w='100%'
            mt={8}
            flexDir={{ base: 'column-reverse', lg: 'row' }}
            justify='space-between'
          >
            <CustomButton
              color='gcu.100'
              variant='outline'
              label='Previous'
              type='button'
              onClick={() => setStep(6.2)}
            />

            <CustomButton
              label='Next'
              color='#fff'
              type='submit'
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
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
