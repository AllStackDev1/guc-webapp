import React from 'react'
import * as yup from 'yup'
import moment from 'moment'
import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Flex,
  Grid,
  Icon,
  Heading,
  useToast,
  GridItem,
  Container
} from '@chakra-ui/react'
import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'
import CustomButton from 'components/Forms/CustomButton'
import { FiChevronLeft } from 'react-icons/fi'

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  gender: yup.string().required('Gender is required!'),
  dob: yup.string().required('Date of birth is required!')
})

const StepEightOne = ({
  setView,
  history,
  editData,
  setSibling,
  updateSibling
}) => {
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
        if (editData?._id) {
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
        setView(8.2)
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
      minW={{ lg: '3xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Sibling(s)
      </Heading>

      <Box as='form' onSubmit={handleSubmit}>
        <Grid
          mt={{ lg: 20 }}
          templateRows={{ lg: 'repeat(2, 1fr)' }}
          templateColumns={{ lg: 'repeat(2, 1fr)' }}
          gap={{ base: 3, lg: 6 }}
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
          <GridItem colSpan={{ lg: 2 }}>
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
        <Flex mt={6} align='center' justify='space-between'>
          <Flex
            role='button'
            color='gcu.100'
            onClick={() => history.push('/applicant/student-background')}
          >
            <Icon as={FiChevronLeft} boxSize={6} />
            <Text fontSize='md' fontWeight={600}>
              Previous
            </Text>
          </Flex>
          <Flex
            flexDir={{ base: 'column-reverse', lg: 'row' }}
            justify={{ lg: 'flex-end' }}
          >
            <CustomButton
              type='button'
              variant='outline'
              label={editData ? 'Cancel' : 'Skip'}
              color='gcu.100'
              onClick={() => {
                if (editData) {
                  setView(8.2)
                } else {
                  history.push('/applicant/health-and-medical')
                }
              }}
            />
            <Box d={{ base: 'none', lg: 'block' }} mx={4} />
            <CustomButton
              label='Save'
              type='submit'
              color='#fff'
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </Flex>
        </Flex>
      </Box>
    </Container>
  )
}

StepEightOne.propTypes = {
  editData: PropTypes.object,
  history: PropTypes.object.isRequired,
  setView: PropTypes.func.isRequired,
  setSibling: PropTypes.func.isRequired,
  updateSibling: PropTypes.func.isRequired
}

export default StepEightOne
