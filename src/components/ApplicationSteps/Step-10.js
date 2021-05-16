import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import {
  Box,
  Flex,
  Grid,
  Heading,
  GridItem,
  useToast,
  Container
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'
import CustomButton from 'components/Forms/CustomButton'

import FetchCard from 'components/FetchCard'

import useFetch from 'hooks/useFetch'

import { StepTenSchema } from './validations'
import { objDiff } from 'utils/mics'

const StepTen = ({
  user,
  setStep,
  setGuardianContact,
  getGuardianContact,
  updateGuardianContact
}) => {
  const [reload, setReload] = React.useState(0)
  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading } = useFetch(
    null,
    getGuardianContact,
    reload,
    {
      applicant: user._id
    }
  )

  const lists = [
    {
      id: 'relation',
      text: 'Relation to Student',
      isRequired: true,
      options: [
        'Father',
        'Mother',
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
      options: ['Mr', 'Mrs', 'Miss', 'Sir', 'Ma', 'Chief']
    },
    {
      id: 'firstName',
      text: 'First Name',
      isRequired: true
    },
    {
      id: 'familyName',
      text: 'Family Name',
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
      text:
        'I give permission for the students photo to appear on school portal',
      isRequired: true,
      options: ['Yes', 'No']
    }
  ]

  const formik = useFormik({
    initialValues: {
      state: data?.state || '',
      title: data?.title || '',
      email: data?.email || '',
      familyName: data?.familyName || '',
      firstName: data?.firstName || '',
      relation: data?.relation || '',
      occupation: data?.occupation || '',
      addressOne: data?.addressOne || '',
      addressTwo: data?.addressTwo || '',
      homeNumber: data?.homeNumber || '',
      workNumber: data?.workNumber || '',
      permissions: data?.permissions || '',
      hearAboutUs: data?.hearAboutUs || '',
      mobileNumber: data?.mobileNumber || '',
      homeLanguage: data?.homeLanguage || '',
      studentAddress: data?.studentAddress || ''
    },
    enableReinitialize: true,
    validationSchema: !data && StepTenSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let mge = 'Guardian contact information saved!'
        if (data?._id) {
          let updatedValue = objDiff(values, data)
          if (isEmpty(updatedValue)) {
            mge = 'No changes made.'
          } else {
            await updateGuardianContact(data._id, updatedValue)
            mge = 'Guardian contact information updated!'
          }
        } else {
          await setGuardianContact(values)
        }
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: mge
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
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '4xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Guardian Contact Information
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
          mt={{ base: 5, lg: 20 }}
          px={{ lg: 10 }}
          flexDir='column'
          onSubmit={handleSubmit}
        >
          <Grid templateColumns={{ lg: 'repeat(2, 1fr)' }} gap={6}>
            {lists.map((list, idx) => (
              <GridItem
                key={list.id}
                colSpan={{ lg: [14, 15].includes(idx) ? 2 : 1 }}
              >
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
                    isRequired={!data && list.isRequired}
                    value={values[list.id]}
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
                    isRequired={!data && list.isRequired}
                    defaultValue={values[list.id]}
                  />
                )}
              </GridItem>
            ))}
          </Grid>

          <Flex
            mt={6}
            mb={{ base: 12, lg: 0 }}
            flexDir={{ base: 'column-reverse', lg: 'row' }}
            justify={{ lg: 'space-between' }}
          >
            <CustomButton
              type='button'
              variant='outline'
              label='Previous'
              color='gcu.100'
              onClick={() => setStep(9)}
            />
            <Box d={{ base: 'none', lg: 'block' }} mx={4} />
            <CustomButton
              label='Next'
              type='submit'
              color='#fff'
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </Flex>
        </Flex>
      )}
    </Container>
  )
}

StepTen.propTypes = {
  user: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  setGuardianContact: PropTypes.func.isRequired,
  getGuardianContact: PropTypes.func.isRequired,
  updateGuardianContact: PropTypes.func.isRequired
}

export default StepTen
