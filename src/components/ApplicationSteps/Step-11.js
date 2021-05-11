import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import {
  Box,
  Flex,
  Grid,
  Heading,
  useToast,
  GridItem,
  Container
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'
import CustomButton from 'components/Forms/CustomButton'

import FetchCard from 'components/FetchCard'

import useFetch from 'hooks/useFetch'

import { StepElevenSchema } from './validations'
import { objDiff } from 'utils/mics'

const StepEleven = ({
  user,
  setStep,
  setEmergenyContact,
  getEmergenyContact,
  updateEmergenyContact
}) => {
  const [reload, setReload] = React.useState(0)
  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading } = useFetch(
    null,
    getEmergenyContact,
    reload,
    {
      applicant: user._id
    }
  )

  const formik = useFormik({
    initialValues: {
      name: data?.name || '',
      relationship: data?.relationship || '',
      contactNumber: data?.contactNumber || ''
    },
    enableReinitialize: true,
    validationSchema: !data && StepElevenSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let mge = 'Emergency contact saved!'
        if (data?._id) {
          let updatedValue = objDiff(values, data)
          if (isEmpty(updatedValue)) {
            mge = 'No changes made.'
          } else {
            await updateEmergenyContact(data._id, updatedValue)
            mge = 'Emergency contact updated!'
          }
        } else {
          await setEmergenyContact(values)
        }
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: mge
        })
        window.sessionStorage.setItem('step', 12)
        setStep(12)
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
        Emergency Contact
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
          <Grid
            templateRows={{ lg: 'repeat(2, 1fr)' }}
            templateColumns={{ lg: 'repeat(2, 1fr)' }}
            gap={{ base: 3, lg: 6 }}
          >
            <GridItem>
              <CustomInput
                type='text'
                isRequired={!data}
                label='Name'
                onBlur={handleBlur}
                onChange={handleChange}
                name='name'
                placeholder='Enter Name'
                error={errors.name}
                touched={touched.name}
                defaultValue={values.name}
              />
            </GridItem>
            <GridItem>
              <CustomSelect
                isRequired={!data}
                label='Relationship to student'
                onBlur={handleBlur}
                onChange={handleChange}
                name='relationship'
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
                error={errors.relationship}
                touched={touched.relationship}
                value={values.relationship}
              />
            </GridItem>
            <GridItem colSpan={{ lg: 2 }}>
              <CustomInput
                type='text'
                isRequired={!data}
                label='Contact Number'
                onBlur={handleBlur}
                onChange={handleChange}
                name='contactNumber'
                placeholder='Enter contact number'
                error={errors.contactNumber}
                touched={touched.contactNumber}
                defaultValue={values.contactNumber}
              />
            </GridItem>
          </Grid>

          <Flex
            mt={6}
            flexDir={{ base: 'column-reverse', lg: 'row' }}
            justify={{ lg: 'space-between' }}
          >
            <CustomButton
              type='button'
              variant='outline'
              label='Previous'
              color='gcu.100'
              onClick={() => setStep(10)}
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

StepEleven.propTypes = {
  user: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  setEmergenyContact: PropTypes.func.isRequired,
  getEmergenyContact: PropTypes.func.isRequired,
  updateEmergenyContact: PropTypes.func.isRequired
}

export default StepEleven
