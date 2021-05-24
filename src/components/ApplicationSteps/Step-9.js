import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  Checkbox,
  ListItem,
  useToast,
  Container,
  OrderedList,
  useDisclosure
} from '@chakra-ui/react'
import { FiPlus, FiFileMinus } from 'react-icons/fi'

import CustomTextarea from 'components/Forms/CustomTextarea'
import CustomUploader from 'components/Forms/CustomUploader'
import CustomButton from 'components/Forms/CustomButton'
import PreviewModal from 'components/PreviewModal'
import FetchCard from 'components/FetchCard'

import useFetch from 'hooks/useFetch'

import { fileToBase64 } from 'utils/mics'
import { StepNineSchema } from './validations'
import { objDiff } from 'utils/mics'

const StepNine = ({
  user,
  setStep,
  setHealthMedical,
  getHealthMedical,
  updateHealthMedical
}) => {
  const [file, setFile] = React.useState(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [reload, setReload] = React.useState(0)
  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading } = useFetch(null, getHealthMedical, reload, {
    applicant: user._id
  })

  const lists = [
    {
      id: 1,
      text:
        'Has your child been diagnosed with any of the following: (please tick appropriate and provide details)',
      fields: ['asthma', 'allergies', 'diabetes', 'epilepsy']
    },
    {
      id: 2,
      text: 'Does your child require a medical plan?',
      field: 'requireMedicalPlan'
    },
    {
      id: 3,
      text: 'Does your child take regular medication?',
      field: 'takeRegularMedication'
    },
    {
      id: 4,
      text: 'Are there any dietary restrictions?',
      field: 'dietaryRestriction'
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
      field: 'isImmunised',
      file: 'immuneFile'
    }
  ]

  const formik = useFormik({
    initialValues: {
      asthma: data?.asthma || false,
      allergies: data?.allergies || false,
      diabetes: data?.diabetes || false,
      epilepsy: data?.epilepsy || false,
      immuneFile: data?.immuneFile || '',
      requireMedicalPlan: data?.requireMedicalPlan || '',
      takeRegularMedication: data?.takeRegularMedication || '',
      dietaryRestriction: data?.dietaryRestriction || '',
      physicalRestriction: data?.physicalRestriction || '',
      otherMedicalIssues: data?.otherMedicalIssues || '',
      isImmunised: data?.isImmunised || ''
    },
    enableReinitialize: true,
    validationSchema: !data && StepNineSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const _values = {
          ...values,
          immuneFile:
            values.immuneFile && (await fileToBase64(values.immuneFile))
        }
        let mge = 'Health and medical saved successfully!'
        if (data?._id) {
          let updatedValue = objDiff(_values, data)
          if (isEmpty(updatedValue)) {
            mge = 'No changes made.'
          } else {
            await updateHealthMedical(data._id, updatedValue)
            mge = 'Health and medical updated!'
          }
        } else {
          await setHealthMedical(_values)
        }
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: mge
        })
        window.sessionStorage.setItem('step', 10)
        setStep(10)
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
    setFieldValue,
    isSubmitting,
    handleSubmit
  } = formik

  const handlePreview = file => {
    setFile(file)
    onOpen()
  }

  return (
    <Container
      align='center'
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '6xl' }}
    >
      {file && <PreviewModal data={file} isOpen={isOpen} onClose={onClose} />}

      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Health and Medical
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
          <OrderedList spacing={{ base: 5, lg: 8 }} ml={0}>
            {lists.map(list => (
              <ListItem
                d='flex'
                key={list.id}
                flexDir={{ base: 'column', lg: 'row' }}
                textAlign='left'
                alignItems={{ base: 'flex-end', lg: 'center' }}
                justifyContent='space-between'
              >
                <Flex align='center' w={{ base: '100%', lg: '50%' }}>
                  <Text mr={3} fontWeight='bold'>
                    {list.id}.
                  </Text>
                  <Text
                    w='100%'
                    textAlign='left'
                    fontWeight={500}
                    fontSize={{ base: 'xs', lg: 'sm' }}
                  >
                    {list.text}{' '}
                    {!data && (
                      <Text as='span' color='red.500'>
                        *
                      </Text>
                    )}
                  </Text>
                </Flex>

                <Box w={{ base: '93%', lg: '40%' }} mt={{ base: 1, lg: 0 }}>
                  {list.fields && (
                    <Flex
                      w={{ lg: '60%' }}
                      flexWrap={{ lg: 'wrap' }}
                      justify='space-between'
                    >
                      {list.fields.map(e => (
                        <Checkbox
                          key={e}
                          name={e}
                          isChecked={values[e]}
                          onChange={handleChange}
                          colorScheme='gcuButton'
                          textTransform='capitalize'
                        >
                          <Text fontSize={{ base: 'xs', lg: 'sm' }}>{e}</Text>
                        </Checkbox>
                      ))}
                    </Flex>
                  )}
                  {list.field && (
                    <CustomTextarea
                      isRequired={!data}
                      name={list.field}
                      onBlur={handleBlur}
                      placeholder='Please enter yes with more details or no'
                      error={errors[list.field]}
                      touched={touched[list.field]}
                      onChange={handleChange}
                      defaultValue={values[list.field]}
                    />
                  )}
                  {list.file &&
                    (values.immuneFile ? (
                      <>
                        <Flex
                          mt={{ lg: 1 }}
                          color='gcu.100'
                          pos='relative'
                          align='center'
                        >
                          <Box mr={4} d={{ base: 'none', lg: 'block' }}>
                            <Button
                              p={0}
                              bg='unset'
                              type='button'
                              _hover={{ bg: 'unset' }}
                              onClick={e => {
                                e.preventDefault()
                                handlePreview(values.immuneFile)
                              }}
                            >
                              Preview
                            </Button>
                          </Box>
                          <Box>
                            <Button
                              p={0}
                              bg='unset'
                              type='button'
                              fontSize={{ base: 'sm', lg: 'inherit' }}
                              rightIcon={<FiFileMinus />}
                              _hover={{ bg: 'unset' }}
                              onClick={e => {
                                e.preventDefault()
                                return setFieldValue('immuneFile', undefined)
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Flex>
                        {errors.immuneFile && (
                          <Text color='red.500' fontSize='xs'>
                            {errors.immuneFile}
                          </Text>
                        )}
                      </>
                    ) : (
                      <Flex
                        mt={{ lg: 1 }}
                        color='gcu.100'
                        pos='relative'
                        align='center'
                      >
                        <CustomUploader
                          left={0}
                          form={formik}
                          pos='absolute'
                          cursor='pointer'
                          field={{ name: 'immuneFile' }}
                          accept='application/pdf, image/jpg, image/jpeg, image/png'
                        />
                        <FiPlus />
                        <Text
                          ml={1}
                          fontSize={{ base: 'xs', lg: 'sm' }}
                          fontWeight='600'
                        >
                          Attach a copy of immunisation history
                          <Text as='span' ml={1} fontSize='xs'>
                            (optional)
                          </Text>
                        </Text>
                      </Flex>
                    ))}
                </Box>
              </ListItem>
            ))}
          </OrderedList>

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
              onClick={() => setStep(8.2)}
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

StepNine.propTypes = {
  user: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  setHealthMedical: PropTypes.func.isRequired,
  getHealthMedical: PropTypes.func.isRequired,
  updateHealthMedical: PropTypes.func.isRequired
}

export default StepNine
