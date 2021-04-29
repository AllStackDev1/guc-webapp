/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Text,
  Grid,
  GridItem,
  Button,
  Heading,
  Container,
  Checkbox
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'

const validationSchema = yup.object().shape({
  previousSchool: yup.object().shape({
    name: yup.string().required('School name is required!'),
    address: yup.string().required('School address is required!'),
    email: yup.string().email('Invalid email!').required('Email is required!'),
    endDate: yup.string().required('Date of Leaving is required!'),
    startDate: yup.string().required('Date of Arrival is required!')
  })
})

const StepSixOne = ({
  enroll,
  setStep,
  setErrorMessage,
  setSuccessMessage
}) => {
  const formik = useFormik({
    initialValues: {
      previousSchool: {
        name: '',
        email: '',
        address: '',
        endDate: '',
        startDate: ''
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
    isSubmitting,
    handleSubmit
  } = formik

  const tabBtnStyle = {
    fontSize: 'md',
    color: 'gray.400',
    fontWeight: '600',
    _focus: { outline: 'none' },
    _selected: { color: 'gcu.100', borderColor: 'gcu.100' }
  }

  const tabOne = [
    {
      id: 1,
      title: 'Birth Certificate / Passport',
      remove: () => {},
      preview: () => {},
      upload: () => {}
    },
    {
      id: 2,
      title: 'Immunisation History',
      remove: () => {},
      preview: () => {},
      upload: () => {}
    },
    {
      id: 3,
      title: 'Passport Photo',
      remove: () => {},
      preview: () => {},
      upload: () => {}
    }
  ]

  const tabTwo = [
    {
      id: 'firstName',
      text: 'First Name'
    },
    {
      id: 'surName',
      text: 'Surname'
    },
    {
      id: 'middleName',
      text: 'Middle Name'
    },
    {
      id: 'preferedName',
      text: 'Prefered Name (Name)'
    },
    {
      id: 'dob',
      text: 'Date of birth'
    },
    {
      id: 'gender',
      text: 'Gender'
    },
    {
      id: 'countryOfBirth',
      text: 'Country of birth'
    },
    {
      id: 'nationality',
      text: 'Nationality  (as it appears in passport)'
    },
    {
      id: 'dualNationality',
      text: 'Dual Nationality (if applicable)'
    },
    {
      id: 'firstLanguage',
      text: 'First Language'
    },
    {
      id: 'homeLanguage',
      text: 'Language Spoken at home'
    },
    {
      id: 'religion',
      text: 'Religion'
    }
  ]

  return (
    <Container align='center' mt={{ lg: 4 }} minW={{ lg: '4xl' }}>
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Initial Enquiry
      </Heading>

      <Tabs mt={8} isFitted>
        <TabList w='70%'>
          <Tab {...tabBtnStyle}>Document Upload</Tab>
          <Tab {...tabBtnStyle}>Student Information</Tab>
        </TabList>

        <TabPanels mt={8}>
          <TabPanel>
            {tabOne.map(e => (
              <Flex py={2} key={e.id} justify='space-between'>
                <Text color='gray.500' fontWeight='500' fontSize='lg'>
                  {e.title}
                </Text>
                <Flex>
                  <Checkbox
                    color='gray.500'
                    fontWeight='500'
                    fontSize='lg'
                    checked={false}
                  />
                  <Button
                    ml={2}
                    px={0}
                    bg='unset'
                    color='gcu.100'
                    _hover={{ bg: 'unset' }}
                    onClick={e.upload}
                  >
                    Click to upload
                  </Button>
                  <Button
                    px={2}
                    bg='unset'
                    color='gcu.100'
                    _hover={{ bg: 'unset' }}
                    onClick={e.preview}
                  >
                    Preview
                  </Button>
                  <Button
                    px={0}
                    bg='unset'
                    color='gcu.100'
                    _hover={{ bg: 'unset' }}
                    onClick={e.remove}
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            ))}
          </TabPanel>
          <TabPanel>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              {tabTwo.map((list, idx) => (
                <GridItem
                  key={list.id}
                  colSpan={[14, 15].includes(idx) ? 2 : 1}
                >
                  {[5, 6, 7, 8].includes(idx) ? (
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
                      type={list.id === 'dob' ? 'date' : 'text'}
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
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex mt={8} w='100%' px={4} justify='flex-end'>
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
        >
          Next
        </Button>
      </Flex>
    </Container>
  )
}

StepSixOne.propTypes = {
  enroll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepSixOne
