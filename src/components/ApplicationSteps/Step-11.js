import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import {
  Flex,
  Grid,
  Button,
  Heading,
  useToast,
  GridItem,
  Container
} from '@chakra-ui/react'

import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'

import { StepElevenSchema } from './validations'

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
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '4xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Emergency Contact
      </Heading>

      <Flex
        as='form'
        mt={{ lg: 16 }}
        px={{ lg: 10 }}
        flexDir='column'
        onSubmit={handleSubmit}
      >
        <Grid
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(2, 1fr)'
          gap={6}
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
          <GridItem colSpan={2}>
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

        <Flex w='100%' justify='space-between'>
          <Button
            w='200px'
            rounded='0'
            type='button'
            color='gcu.100'
            fontSize='sm'
            boxShadow='lg'
            fontWeight={600}
            variant='outline'
            colorScheme='gcuButton'
            h={{ base: '3.375rem' }}
            _focus={{ outline: 'none' }}
            onClick={() => setStep(10)}
          >
            Previous
          </Button>
          <Button
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
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Next
          </Button>
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
