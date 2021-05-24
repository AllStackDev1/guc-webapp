import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import * as yup from 'yup'
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
import CustomRadio from 'components/Forms/CustomRadio'
import FetchCard from 'components/FetchCard'

import useFetch from 'hooks/useFetch'
import { objDiff } from 'utils/mics'

export const StepSevenSchema = yup.object().shape({
  specialNeeds: yup.string().required('This field is required!'),
  details: yup.string().when('specialNeeds', {
    is: 'yes',
    then: yup.string().required('Please provide more information!')
  })
})

const StepSeven = ({
  user,
  setStep,
  setStudentBackground,
  getStudentBackground,
  updateStudentBackground
}) => {
  const [reload, setReload] = React.useState(0)
  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const lists = [
    {
      id: 'specialNeeds',
      text: 'Does your child have special needs, either emotional or physical?',
      options: ['yes', 'no'],
      isRequired: true
    },
    {
      id: 'details',
      text: 'If yes provide more information',
      isRequired: false
    }
  ]

  const { data, error, isLoading } = useFetch(
    null,
    getStudentBackground,
    reload,
    {
      applicant: user._id
    }
  )

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      specialNeeds: data?.specialNeeds || 'no',
      details: data?.details || ''
    },
    validationSchema: !data && StepSevenSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let mge = 'Student background information saved!'
        if (data?._id) {
          let updatedValue = objDiff(values, data)
          if (isEmpty(updatedValue)) {
            mge = 'No changes made.'
          } else {
            await updateStudentBackground(data._id, updatedValue)
            mge = 'Student background information updated!'
          }
        } else {
          await setStudentBackground(values)
        }
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: mge
        })
        window.sessionStorage.setItem('step', 8.2)
        setStep(8.2)
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
    setFieldValue,
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
      {isLoading || error ? (
        <FetchCard
          h='60vh'
          align='center'
          justify='center'
          direction='column'
          error={error}
          loading={isLoading}
          reload={triggerReload}
          text='Loading'
        />
      ) : (
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
                opacity={idx && formik.values.specialNeeds === 'no' ? 0.2 : 1}
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
                    {!data && list.isRequired && (
                      <Text as='span' color='red.500'>
                        *
                      </Text>
                    )}
                  </Text>
                </Flex>

                <Box w={{ base: '93%', lg: '50%' }} mt={{ base: 2, lg: 0 }}>
                  {list.options ? (
                    <CustomRadio
                      name={list.id}
                      direction='row'
                      options={list.options}
                      error={errors[list.id]}
                      setFieldValue={setFieldValue}
                      value={values[list.id]}
                    />
                  ) : (
                    <CustomTextarea
                      isRequired={!data && list.isRequired}
                      name={list.id}
                      onBlur={handleBlur}
                      placeholder='If yes provide more information'
                      error={errors[list.id]}
                      touched={touched[list.id]}
                      onChange={handleChange}
                      defaultValue={values[list.id]}
                    />
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
      )}
    </Container>
  )
}

StepSeven.propTypes = {
  user: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  setStudentBackground: PropTypes.func.isRequired,
  getStudentBackground: PropTypes.func.isRequired,
  updateStudentBackground: PropTypes.func.isRequired
}

export default StepSeven
