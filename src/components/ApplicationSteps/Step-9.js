/* eslint-disable no-unused-vars */
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
  Checkbox,
  ListItem,
  Container,
  OrderedList
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

import CustomInput from 'components/Forms/CustomInput'

const validationSchema = yup.object().shape({
  health: yup.object().shape({
    asthma: yup.bool(),
    allergies: yup.bool(),
    diabiates: yup.bool(),
    epilepsy: yup.bool(),
    requireMedicalPlan: yup.string(),
    regularMedication: yup.string(),
    dietaryRestrictions: yup.string(),
    physicalRestriction: yup.string(),
    otherMedicalIssues: yup.string(),
    isImmune: yup.string(),
    immuneFile: yup.string()
  })
})
// enrollNetwork: yup.string().required('Last name is required!')

const StepNine = ({ enroll, setStep, setErrorMessage, setSuccessMessage }) => {
  const lists = [
    {
      id: 1,
      text:
        'Has your child been diagnosed with any of the following: (please tick appropriate and provide details)',
      fields: ['asthma', 'allergies', 'diabiates', 'epilepsy']
    },
    {
      id: 2,
      text: 'Does your child require a medical plan?',
      field: 'requireMedicalPlan'
    },
    {
      id: 3,
      text: 'Does your child take regular medication?',
      field: 'regularMedication'
    },
    {
      id: 4,
      text: 'Are there any dietary restrictions?',
      field: 'dietaryRestrictions'
    },
    {
      id: 5,
      text: 'Does your child have any physical restriction?',
      field: 'physicalRestriction'
    },
    {
      id: 6,
      text: 'Does your child have any other medical issues?',
      field: 'otherMedicalIssues'
    },
    {
      id: 7,
      text:
        'Is your child immunised? (Please attach a copy of the immunisation history)',
      field: 'isImmune',
      file: 'immuneFile'
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
    isSubmitting,
    handleSubmit
  } = formik

  return (
    <Container
      align='center'
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '6xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Health and Medical
      </Heading>

      <Flex
        as='form'
        mt={{ lg: 20 }}
        px={{ lg: 10 }}
        flexDir='column'
        onSubmit={handleSubmit}
      >
        <OrderedList spacing={8}>
          {lists.map(list => (
            <ListItem
              d='flex'
              key={list.id}
              textAlign='left'
              align='center'
              justifyContent='space-between'
            >
              <Flex align='center' w='50%'>
                <Text mr={3} fontWeight='bold'>
                  {list.id}.
                </Text>
                <Text
                  w='100%'
                  textAlign='left'
                  fontWeight={500}
                  fontSize={{ base: 'xs', lg: 'sm' }}
                >
                  {list.text}
                </Text>
              </Flex>

              <Box w='40%'>
                {list.fields && (
                  <Flex w='60%' flexWrap='wrap' justify='space-between'>
                    {list.fields.map(e => (
                      <Checkbox
                        key={e}
                        name={e}
                        onChange={handleChange}
                        colorScheme='gcuButton'
                        textTransform='capitalize'
                      >
                        {e}
                      </Checkbox>
                    ))}
                  </Flex>
                )}
                {list.field && (
                  <CustomInput
                    type='text'
                    isRequired
                    name={list.field}
                    onBlur={handleBlur}
                    error={errors.list?.field}
                    touched={touched.list?.field}
                    onChange={handleChange}
                    defaultValue={values.list?.field}
                  />
                )}
                {list.file && (
                  <Button
                    px={0}
                    bg='unset'
                    fontSize='sm'
                    fontWeight='600'
                    textColor='gcu.100'
                    leftIcon={<FiPlus />}
                    _focus={{ bg: 'unset' }}
                    _hover={{ bg: 'unset' }}
                    aria-label='Attach a copy of immunisation history'
                  >
                    Attach a copy of immunisation history
                  </Button>
                )}
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
