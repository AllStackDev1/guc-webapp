import React, { useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import {
  Box,
  Tab,
  Tabs,
  Flex,
  Text,
  Grid,
  Button,
  TabList,
  useToast,
  Heading,
  TabPanel,
  GridItem,
  Checkbox,
  TabPanels,
  Container,
  useDisclosure
} from '@chakra-ui/react'
import countryList from 'react-select-country-list'

import CustomInput from 'components/Forms/CustomInput'
import CustomSelect from 'components/Forms/CustomSelect'
import CustomUploader from 'components/Forms/CustomUploader'
import CustomButton from 'components/Forms/CustomButton'
import PreviewModal from 'components/PreviewModal'
import FetchCard from 'components/FetchCard'

import useFetch from 'hooks/useFetch'
import { StepSixSchema } from './validations'
import { fileToBase64, objDiff } from 'utils/mics'

const StepSixOne = ({
  user,
  setStep,
  setInitialEnquiry,
  getInitialEnquiry,
  updateInitialEnquiry
}) => {
  const [docOne, setDocOne] = useState(false)
  const [docTwo, setDocTwo] = useState(false)
  const [docThree, setDocThree] = useState(false)
  const [file, setFile] = useState(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [reload, setReload] = React.useState(0)

  const tabRef = useRef(null)

  const countries = useMemo(
    () =>
      countryList()
        .getData()
        .map(e => e.label),
    []
  )

  const toast = useToast()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, error, isLoading } = useFetch(null, getInitialEnquiry, reload, {
    applicant: user._id
  })

  const formik = useFormik({
    initialValues: {
      documents: {
        schoolReport: data?.documents?.schoolReport,
        passportPhoto: data?.documents?.passportPhoto,
        birthCertOrPassport: data?.documents?.birthCertOrPassport
      },
      studentInfo: {
        dob: data?.studentInfo?.dob || '',
        gender: data?.studentInfo?.gender || '',
        familyName: data?.studentInfo?.familyName || '',
        religion: data?.studentInfo?.religion || '',
        firstName: data?.studentInfo?.firstName || '',
        middleName: data?.studentInfo?.middleName || '',
        nationality: data?.studentInfo?.nationality || '',
        homeLanguage: data?.studentInfo?.homeLanguage || '',
        preferedName: data?.studentInfo?.preferedName || '',
        firstLanguage: data?.studentInfo?.firstLanguage || '',
        countryOfBirth: data?.studentInfo?.countryOfBirth || '',
        dualNationality: data?.studentInfo?.dualNationality || ''
      }
    },
    enableReinitialize: true,
    validationSchema: !data && StepSixSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const _values = {
          ...values,
          documents: {
            schoolReport: await fileToBase64(values.documents.schoolReport),
            passportPhoto: await fileToBase64(values.documents.passportPhoto),
            birthCertOrPassport: await fileToBase64(
              values.documents.birthCertOrPassport
            )
          }
        }
        let mge = 'Initial enquiry saved successfully!'
        if (data?._id) {
          let updatedValue = objDiff(_values, data)
          if (isEmpty(updatedValue)) {
            mge = 'No changes made.'
          } else {
            await updateInitialEnquiry(data._id, updatedValue)
            mge = 'Initial enquiry updated successfully!'
          }
        } else {
          await setInitialEnquiry(_values)
        }
        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          position: 'top-right',
          title: 'Success',
          description: mge
        })
        window.sessionStorage.setItem('step', 6.2)
        setStep(6.2)
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
    dirty,
    isValid,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    handleSubmit
  } = formik

  const tabBtnStyle = {
    fontSize: { base: 'xs', lg: 'md' },
    color: 'gray.400',
    fontWeight: '600',
    _focus: { outline: 'none' },
    _selected: { color: 'gcu.100', borderColor: 'gcu.100' }
  }

  const tabOne = [
    {
      id: 1,
      checked: docOne,
      name: 'birthCertOrPassport',
      toggle: () => setDocOne(!docOne),
      title: 'Birth Certificate / Passport'
    },
    {
      id: 2,
      checked: docTwo,
      name: 'schoolReport',
      toggle: () => setDocTwo(!docTwo),
      title: 'Most recent school report'
    },
    {
      id: 3,
      checked: docThree,
      name: 'passportPhoto',
      title: 'Passport Photo',
      toggle: () => setDocThree(!docThree)
    }
  ]

  const tabTwo = [
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
      id: 'middleName',
      text: 'Middle Name',
      isRequired: true
    },
    {
      id: 'preferedName',
      text: 'Prefered Name (Name)',
      isRequired: true
    },
    {
      id: 'dob',
      text: 'Date of birth',
      isRequired: true
    },
    {
      id: 'gender',
      text: 'Gender',
      isRequired: true,
      options: ['Male', 'Female', 'Others']
    },
    {
      id: 'countryOfBirth',
      text: 'Country of birth',
      isRequired: true,
      options: countries
    },
    {
      id: 'nationality',
      text: 'Nationality  (as it appears in passport)',
      isRequired: true,
      options: countries
    },
    {
      id: 'dualNationality',
      text: 'Dual Nationality (if applicable)',
      isRequired: false,
      options: countries
    },
    {
      id: 'firstLanguage',
      text: 'First Language',
      isRequired: true
    },
    {
      id: 'homeLanguage',
      text: 'Language Spoken at home',
      isRequired: true
    },
    {
      id: 'religion',
      text: 'Religion',
      isRequired: false
    }
  ]

  const handlePreview = file => {
    setFile(file)
    onOpen()
  }

  const handleNext = e => {
    e.preventDefault()
    setFieldTouched('documents.schoolReport', true)
    setFieldTouched('documents.passportPhoto', true)
    setFieldTouched('documents.birthCertOrPassport', true)
    if (tabRef.current && dirty && isEmpty(errors.documents)) {
      tabRef.current.focus()
      tabRef.current.click()
    }
  }

  return (
    <Container
      align='center'
      mt={{ base: 8, lg: 4 }}
      px={{ base: 5, lg: 10 }}
      minW={{ lg: '4xl' }}
    >
      {file && <PreviewModal data={file} isOpen={isOpen} onClose={onClose} />}

      <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
        Initial Enquiry
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
        <Box as='form' onSubmit={handleSubmit} noValidate>
          <Text
            my={{ base: 4, lg: 8 }}
            fontSize={{ base: 'sm', lg: 'inherit' }}
          >
            only upload <b>jpg, png</b> and <b>pdf</b> files.
          </Text>
          <Tabs isFitted>
            <TabList w={{ lg: '70%' }}>
              <Tab {...tabBtnStyle}>Document Upload</Tab>
              <Tab ref={tabRef} {...tabBtnStyle}>
                Student Information
              </Tab>
            </TabList>

            <TabPanels mt={{ lg: 8 }}>
              <TabPanel>
                {tabOne.map(e => (
                  <Flex
                    py={2}
                    key={e.id}
                    flexDir={{ base: 'column', lg: 'row' }}
                    align={{ lg: 'center' }}
                    justify='space-between'
                  >
                    <Box textAlign='left'>
                      <Text
                        color='gray.500'
                        fontWeight='500'
                        fontSize={{ base: 'sm', lg: 'lg' }}
                      >
                        {e.title}{' '}
                        {!data && (
                          <Text as='span' color='gcu.100'>
                            *
                          </Text>
                        )}
                      </Text>
                      {errors.documents?.[e.name] &&
                        touched.documents?.[e.name] && (
                          <Text fontSize='xs' color='red.500'>
                            {errors.documents[e.name]}
                          </Text>
                        )}
                    </Box>

                    <Flex>
                      <Checkbox
                        color='gray.500'
                        fontWeight='500'
                        colorScheme='green'
                        checked={e.checked}
                        onChange={e.toggle}
                        isDisabled={values.documents[e.name]}
                      />
                      {e.checked &&
                        (values.documents[e.name] ? (
                          <>
                            <Box mx={2} d={{ base: 'none', lg: 'block' }}>
                              <Button
                                p={0}
                                bg='unset'
                                type='button'
                                color='gcu.100'
                                _hover={{ bg: 'unset' }}
                                fontSize={{ base: 'xs', lg: 'inherit' }}
                                onClick={_ => {
                                  _.preventDefault()
                                  handlePreview(values.documents[e.name])
                                }}
                              >
                                Preview
                              </Button>
                            </Box>

                            <Box ml={{ base: 2, lg: 0 }}>
                              <Button
                                p={0}
                                bg='unset'
                                type='button'
                                color='gcu.100'
                                _hover={{ bg: 'unset' }}
                                fontSize={{ base: 'xs', lg: 'inherit' }}
                                onClick={_ => {
                                  _.preventDefault()
                                  return setFieldValue(
                                    `documents.${e.name}`,
                                    undefined
                                  )
                                }}
                              >
                                Remove
                              </Button>
                            </Box>
                          </>
                        ) : (
                          <Flex ml={2} pos='relative' align='center'>
                            <CustomUploader
                              left={0}
                              form={formik}
                              pos='absolute'
                              cursor='pointer'
                              field={{ name: `documents.${e.name}` }}
                              accept='application/pdf, image/jpg, image/jpeg, image/png'
                            />
                            <Text
                              color='gcu.100'
                              fontSize={{ base: 'xs', lg: 'inherit' }}
                              fontWeight='600'
                            >
                              Click to upload
                            </Text>
                          </Flex>
                        ))}
                    </Flex>
                  </Flex>
                ))}
              </TabPanel>
              <TabPanel>
                <Grid
                  templateColumns={{
                    base: 'repeat(1, 1fr)',
                    lg: 'repeat(2, 1fr)'
                  }}
                  gap={{ base: 3, lg: 6 }}
                >
                  {tabTwo.map((list, idx) => (
                    <GridItem
                      key={list.id}
                      colSpan={[14, 15].includes(idx) ? 2 : 1}
                    >
                      {list.options ? (
                        <CustomSelect
                          label={list.text}
                          onBlur={handleBlur}
                          options={list.options}
                          onChange={handleChange}
                          placeholder='Select Option'
                          isRequired={!data && list.isRequired}
                          name={`studentInfo.${list.id}`}
                          error={errors.studentInfo?.[list.id]}
                          touched={touched.studentInfo?.[list.id]}
                          defaultValue={values.studentInfo?.[list.id]}
                        />
                      ) : (
                        <CustomInput
                          label={list.text}
                          placeholder={list.text}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isRequired={!data && list.isRequired}
                          name={`studentInfo.${list.id}`}
                          error={errors.studentInfo?.[list.id]}
                          touched={touched.studentInfo?.[list.id]}
                          defaultValue={values.studentInfo?.[list.id]}
                          type={list.id === 'dob' ? 'date' : 'text'}
                        />
                      )}
                    </GridItem>
                  ))}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Flex
            px={4}
            w='100%'
            mt={{ base: 4, lg: 8 }}
            mb={{ base: 4, lg: 0 }}
            justify={{ base: 'center', lg: 'flex-end' }}
          >
            <CustomButton
              label='Next'
              color='#fff'
              type={(isValid && dirty) || data ? 'submit' : 'button'}
              onClick={async e => {
                if (!(isValid && dirty) && !data) {
                  handleNext(e)
                }
              }}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            />
          </Flex>
        </Box>
      )}
    </Container>
  )
}

StepSixOne.propTypes = {
  user: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  setInitialEnquiry: PropTypes.func.isRequired,
  getInitialEnquiry: PropTypes.func.isRequired,
  updateInitialEnquiry: PropTypes.func.isRequired
}

export default StepSixOne
