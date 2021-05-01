import React from 'react'
import * as yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import {
  Box,
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

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  gender: yup.string().required('Gender is required!'),
  dob: yup.string().required('Date of birth is required!')
})

const StepEightOne = ({ setStep, editData, setSibling, updateSibling }) => {
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      name: editData?.name || '',
      gender: editData?.gender || '',
      dob: editData?.dob || ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)
        if (editData) {
          await updateSibling(editData._id, values)
        } else {
          await setSibling(values)
        }
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: 'Sibling saved successfully!'
        })
        window.sessionStorage.removeItem('siblings')
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
    handleSubmit
  } = formik

  return (
    <Container
      align='center'
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '3xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Sibling
      </Heading>

      <Box as='form' onSubmit={handleSubmit}>
        <Grid
          mt={{ lg: 20 }}
          templateRows='repeat(3, 1fr)'
          templateColumns='repeat(2, 1fr)'
          gap={6}
        >
          <GridItem>
            <CustomInput
              type='text'
              label='Name'
              onBlur={handleBlur}
              onChange={handleChange}
              name='name'
              placeholder='Enter School Name'
              error={errors.name}
              touched={touched.name}
              defaultValue={values.name}
            />
          </GridItem>
          <GridItem>
            <CustomSelect
              label='Gender'
              onBlur={handleBlur}
              onChange={handleChange}
              name='gender'
              placeholder='Select Gender'
              error={errors.gender}
              touched={touched.gender}
              options={['Male', 'Female', 'Others']}
              defaultValue={values.gender}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <CustomInput
              type='date'
              label='Date of Birth'
              onBlur={handleBlur}
              onChange={handleChange}
              name='dob'
              error={errors?.dob}
              touched={touched?.dob}
              defaultValue={moment(values.dob).format('YYYY-MM-DD')}
            />
          </GridItem>
        </Grid>
        <Flex justify='flex-end'>
          <Button
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
            onClick={() => {
              if (editData) {
                setStep(8.2)
              } else {
                setStep(9)
              }
            }}
          >
            {editData ? 'Cancel' : 'Skip'}
          </Button>
          <Box mx={3} />
          <Button
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
            Save
          </Button>
        </Flex>
      </Box>
    </Container>
  )
}

StepEightOne.propTypes = {
  editData: PropTypes.object,
  setStep: PropTypes.func.isRequired,
  setSibling: PropTypes.func.isRequired,
  updateSibling: PropTypes.func.isRequired
}

export default StepEightOne
