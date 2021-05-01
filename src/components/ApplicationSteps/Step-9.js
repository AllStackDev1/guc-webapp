import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
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
import { FiPlus } from 'react-icons/fi'

import CustomInput from 'components/Forms/CustomInput'
import CustomUploader from 'components/Forms/CustomUploader'
import PreviewModal from './PreviewModal'

import { fileToBase64 } from 'utils/mics'
import { StepNineSchema } from './validations'

const StepNine = ({ setStep, setHealthMedical }) => {
  const [file, setFile] = React.useState(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

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
      asthma: false,
      allergies: false,
      diabiates: false,
      epilepsy: false,
      immuneFile: '',
      requireMedicalPlan: '',
      takeRegularMedication: '',
      dietaryRestriction: '',
      physicalRestriction: '',
      otherMedicalIssues: '',
      isImmunised: ''
    },
    validationSchema: StepNineSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = {
          ...values,
          immuneFile:
            values.immuneFile && (await fileToBase64(values.immuneFile))
        }
        await setHealthMedical(data)
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: 'Health and medical saved successfully!'
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
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '6xl' }}
    >
      {file && <PreviewModal data={file} isOpen={isOpen} onClose={onClose} />}

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
                  {list.text}{' '}
                  <Text as='span' color='red.500'>
                    *
                  </Text>
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
                    placeholder='Please enter yes(with more details) or no'
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
                        mt={1}
                        color='gcu.100'
                        pos='relative'
                        align='center'
                      >
                        <Box mr={4}>
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
                    <Flex mt={1} color='gcu.100' pos='relative' align='center'>
                      <CustomUploader
                        left={0}
                        form={formik}
                        pos='absolute'
                        cursor='pointer'
                        field={{ name: 'immuneFile' }}
                        accept='application/pdf, image/jpg, image/jpeg, image/png'
                      />
                      <FiPlus />
                      <Text ml={1} fontSize='sm' fontWeight='600'>
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
              type='button'
              color='gcu.100'
              fontSize='md'
              boxShadow='lg'
              fontWeight={600}
              variant='outline'
              colorScheme='gcuButton'
              h={{ base: '3.375rem' }}
              _focus={{ outline: 'none' }}
              onClick={() => setStep(8.2)}
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
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
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
  setStep: PropTypes.func.isRequired,
  setHealthMedical: PropTypes.func.isRequired
}

export default StepNine
