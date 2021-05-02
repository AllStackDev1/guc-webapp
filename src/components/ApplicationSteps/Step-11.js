import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
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

import { StepElevenSchema } from './validations'
import CustomButton from 'components/Forms/CustomButton'

const StepEleven = ({ setStep, setEmergenyContact }) => {
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      name: '',
      relationship: '',
      contactNumber: ''
    },
    validationSchema: StepElevenSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await setEmergenyContact(values)
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: 'Emergency contact saved!'
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
              isRequired
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
              isRequired
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
              defaultValue={values.relationship}
            />
          </GridItem>
          <GridItem colSpan={{ lg: 2 }}>
            <CustomInput
              type='text'
              isRequired
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
    </Container>
  )
}

StepEleven.propTypes = {
  setStep: PropTypes.func.isRequired,
  setEmergenyContact: PropTypes.func.isRequired
}

export default StepEleven
