import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Button,
  Icon,
  Image,
  Grid,
  GridItem
} from '@chakra-ui/react'

import useApi from 'context/api'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'

import ActionButton from 'components/ActionButton'
import { ArrowLeftIcon } from 'theme/Icons'
import { FaFile } from 'react-icons/fa'

import CustomAccordion from 'components/CustomAccordion'

const UserDetailModal = ({
  id,
  onClose,
  setSelectItem,
  handlePreview,
  handleAddToList,
  ...rest
}) => {
  const [reload, setReload] = React.useState(0)
  const { getApplicant } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, message, error, isLoading } = useFetch(
    `applicant_${id}`,
    getApplicant,
    reload,
    id
  )

  // const onClose = rest.onClose

  // React.useEffect(() => {
  //   if (!id) {
  //     onClose()
  //   }
  // }, [id, onClose])

  const details = [
    {
      id: 1,
      title: 'Student Information',
      layout: 'grid',
      data: [
        {
          id: 'firstName',
          title: 'First Name',
          value: data?.initialEnquiry?.studentInfo?.firstName
        },
        {
          id: 'familyName',
          title: 'Family Name',
          value: data?.initialEnquiry?.studentInfo?.familyName
        },
        {
          id: 'middleName',
          title: 'Middle Name',
          value: data?.initialEnquiry?.studentInfo?.middleName
        },
        {
          id: 'preferedName',
          title: 'Prefered Name',
          value: data?.initialEnquiry?.studentInfo?.preferedName
        },
        {
          id: 'dob',
          title: 'Date of Birth',
          isDate: true,
          value: data?.initialEnquiry?.studentInfo.dob
        },
        {
          id: 'gender',
          title: 'Gender',
          value: data?.initialEnquiry?.studentInfo.gender
        },
        {
          id: 'countryOfBirth',
          title: 'Country of Birth',
          value: data?.initialEnquiry?.studentInfo.countryOfBirth
        },
        {
          id: 'nationality',
          title: 'Nationality on Passport',
          value: data?.initialEnquiry?.studentInfo.nationality
        },
        {
          id: 'dualNationality',
          title: 'Dual Nationality',
          value: data?.initialEnquiry?.studentInfo.dualNationality
        },
        {
          id: 'firstLanguage',
          title: 'first Language',
          value: data?.initialEnquiry?.studentInfo.firstLanguage
        },
        {
          id: 'homeLanguage',
          title: 'Language Spoken at home',
          value: data?.initialEnquiry?.studentInfo.homeLanguage
        },
        {
          id: 'religion',
          title: 'Religion',
          value: data?.initialEnquiry?.studentInfo.religion
        }
      ]
    },
    {
      id: 2,
      title: 'Previous School',
      layout: 'grid-gray-bg',
      data: data?.previousSchools,
      keys: [
        {
          id: 'name',
          title: 'School Name'
        },
        {
          id: 'address',
          title: 'Address'
        },
        {
          id: 'email',
          title: 'Email address'
        },
        {
          id: 'dateOfArrival',
          isDate: true,
          title: 'Date of Arrival'
        }
      ]
    },
    {
      id: 3,
      title: 'Student Background',
      layout: 'list',
      data: [
        {
          id: 'specialNeeds',
          title:
            'Does your child have special needs, either emotional or physical?',
          value: data?.studentBackground?.specialNeeds
        },
        {
          id: 'details',
          title: 'More information on  students medicals.',
          value:
            data?.studentBackground?.details ||
            data?.studentBackground?.enrollNetwork
        }
      ]
    },
    {
      id: 4,
      title: 'Sibling(s)',
      layout: 'grid-gray-bg',
      data: data?.siblings,
      keys: [
        {
          id: 'name',
          title: 'Name'
        },
        {
          id: 'gender',
          title: 'Gender'
        },
        {
          id: 'dob',
          isDate: true,
          title: 'Date of Birth'
        }
      ]
    },
    {
      id: 5,
      title: 'Health & Medical',
      layout: 'list',
      data: [
        {
          id: 'diagnosed',
          title:
            'Has your child been diagnosed with any of the following: (please tick appropriate and provide details)',
          value: data?.healthAndMedical,
          checkboxes: ['asthma', 'allergies', 'epilepsy', 'diabiates']
        },
        {
          id: 'requireMedicalPlan',
          title: 'Does your child require a medical plan?',
          value: data?.healthAndMedical?.requireMedicalPlan
        },
        {
          id: 'takeRegularMedication',
          title: 'Does your child take regular medication?',
          value: data?.healthAndMedical?.takeRegularMedication
        },
        {
          id: 'dietaryRestriction',
          title: 'Are there any dietary restrictions?',
          value: data?.healthAndMedical?.dietaryRestriction
        },
        {
          id: 'physicalRestriction',
          title: 'Does your child have any physical restriction?',
          value: data?.healthAndMedical?.physicalRestriction
        },
        {
          id: 'otherMedicalIssues',
          title: 'Does your child have any other medical issues?',
          value: data?.healthAndMedical?.otherMedicalIssues
        },
        {
          id: 'isImmunised',
          title: 'Is your child immunised?',
          value: data?.healthAndMedical?.isImmunised,
          immuneFile: data?.healthAndMedical?.immuneFile
        }
      ]
    },
    {
      id: 6,
      title: 'Contact Information',
      layout: 'grid',
      data: [
        {
          id: 'relation',
          title: 'Relation to Student',
          value: data?.guardianContactInformation?.relation
        },
        {
          id: 'title',
          title: 'Title',
          value: data?.guardianContactInformation?.title
        },
        {
          id: 'firstName',
          title: 'First name',
          value: data?.guardianContactInformation?.firstName
        },
        {
          id: 'familyName',
          title: 'Family Name',
          value: data?.guardianContactInformation?.familyName
        },
        {
          id: 'email',
          title: 'Email address',
          value: data?.guardianContactInformation?.email
        },
        {
          id: 'occupation',
          title: 'Occupation',
          value: data?.guardianContactInformation?.occupation
        },
        {
          id: 'addressOne',
          title: 'Address 1',
          value: data?.guardianContactInformation?.addressOne
        },
        {
          id: 'addressTwo',
          title: 'Address 2',
          value: data?.guardianContactInformation?.addressTwo
        },
        {
          id: 'state',
          title: 'State',
          value: data?.guardianContactInformation?.state
        },
        {
          id: 'mobileNumber',
          title: 'Mobile Number',
          value: data?.guardianContactInformation?.mobileNumber
        },
        {
          id: 'homeNumber',
          title: 'Home Number',
          value: data?.guardianContactInformation?.homeNumber
        },
        {
          id: 'workNumber',
          title: 'Work Number',
          value: data?.guardianContactInformation?.workNumber
        },
        {
          id: 'homeLanguage',
          title: 'Language Spoken at home',
          value: data?.guardianContactInformation?.homeLanguage
        },
        {
          id: 'studentAddress',
          title: 'Address of Student',
          value: data?.guardianContactInformation?.studentAddress
        },
        {
          id: 'hearAboutUs',
          title: 'How did you hear about us',
          value: data?.guardianContactInformation?.hearAboutUs
        },
        {
          id: 'permissions',
          title:
            'I give permission for the students photo to appear on school portal',
          value: data?.guardianContactInformation?.permissions
        }
      ]
    },
    {
      id: 7,
      title: 'Emergency Contact',
      layout: 'grid',
      data: [
        {
          id: 'name',
          title: 'Name',
          value: data?.emergencyContact?.name
        },
        {
          id: 'relationship',
          title: 'Relationship to Student',
          value: data?.emergencyContact?.relationship
        },
        {
          id: 'contactNumber',
          title: 'Contact Number',
          value: data?.emergencyContact?.contactNumber
        }
      ]
    },
    {
      id: 8,
      title: 'Office Use',
      layout: 'grid',
      data: [
        {
          id: 'submssionDate',
          title: 'Submssion Date',
          isDate: true,
          value: data?.emergencyContact?.createdAt
        },
        {
          id: 'waitingList',
          title: 'Waiting List',
          value: data?.officeUse?.waitingList || '---'
        },
        {
          id: 'class',
          title: 'Class',
          value: '2020/2021'
        },
        {
          id: 'academicYear',
          title: 'Academic Year',
          value: '2020/2021'
        },
        {
          id: 'observationDate',
          title: 'Observation Date',
          value: data?.officeUse?.observationDate || '---'
        },
        {
          id: 'observationResult',
          title: 'Observation Result',
          value: data?.officeUse?.observationResult || '---'
        },
        {
          id: 'startDate',
          title: 'Start Date',
          value: data?.officeUse?.startDate || '---'
        },
        {
          id: 'schoolReport',
          title: 'Most Resent School report',
          value: data?.initialEnquiry?.documents?.schoolReport,
          file: true
        },
        {
          id: 'birthCertOrPassport',
          title: 'Birth Cetificate',
          value: data?.initialEnquiry?.documents?.birthCertOrPassport,
          file: true
        }
      ]
    }
  ]

  return (
    <Drawer
      size='lg'
      placement='right'
      onClose={() => {
        setSelectItem(null)
        onClose()
      }}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent p={10}>
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
          <>
            <Flex>
              <Button
                cursor='pointer'
                bg='unset'
                _hover={{
                  bg: 'unset'
                }}
                _active={{
                  bg: 'unset'
                }}
                onClick={() => {
                  setSelectItem(null)
                  onClose()
                }}
              >
                <Icon as={ArrowLeftIcon} boxSize={10} />
              </Button>
            </Flex>
            {data.initialEnquiry ? (
              <>
                <DrawerHeader
                  fontWeight='700'
                  fontFamily='heading'
                  fontSize='35px'
                >
                  {data.initialEnquiry?.studentInfo?.firstName +
                    ' ' +
                    data.initialEnquiry?.studentInfo?.familyName}
                </DrawerHeader>
                <DrawerBody>
                  <Grid
                    templateColumns='repeat(2, 1fr)'
                    gap={{ base: 3, lg: 6 }}
                    mb={{ base: 5, lg: 16 }}
                  >
                    <GridItem>
                      <Image
                        w={36}
                        h={36}
                        alt='Passport Photo'
                        src={data.initialEnquiry?.documents?.passportPhoto}
                      />
                    </GridItem>
                    <GridItem d='flex' alignItems='center'>
                      <ActionButton
                        px={4}
                        rounded='md'
                        color='#fff'
                        fontSize='sm'
                        fontWeight={300}
                        boxShadow='lg'
                        colorScheme='gcuButton'
                        title='Add to CSV Download List'
                        onClick={() => handleAddToList(id)}
                      />
                    </GridItem>
                    <GridItem>
                      <Text fontSize='xs'>Birth Certificate</Text>
                      <Flex mt={2} align='center'>
                        <Icon as={FaFile} boxSize={8} />
                        <Box ml={2} />
                        <Button
                          p={0}
                          bg='unset'
                          type='button'
                          color='gcu.100'
                          _hover={{ bg: 'unset' }}
                          fontSize={{ base: 'xs', lg: 'sm' }}
                          onClick={_ => {
                            return handlePreview(
                              data.initialEnquiry?.documents
                                ?.birthCertOrPassport
                            )
                          }}
                        >
                          View
                        </Button>
                      </Flex>
                    </GridItem>
                    <GridItem>
                      <Text fontSize='xs'>Most Recent school report</Text>
                      <Flex mt={2} align='center'>
                        <Icon as={FaFile} boxSize={8} />
                        <Box ml={2} />
                        <Button
                          p={0}
                          bg='unset'
                          type='button'
                          color='gcu.100'
                          _hover={{ bg: 'unset' }}
                          fontSize={{ base: 'xs', lg: 'sm' }}
                          onClick={_ => {
                            return handlePreview(
                              data.initialEnquiry?.documents?.schoolReport
                            )
                          }}
                        >
                          View
                        </Button>
                      </Flex>
                    </GridItem>
                  </Grid>
                  <CustomAccordion
                    details={details}
                    handlePreview={handlePreview}
                  />
                </DrawerBody>
                <DrawerFooter>
                  <ActionButton
                    px={4}
                    rounded='md'
                    fontSize='sm'
                    color='#fff'
                    boxShadow='lg'
                    colorScheme='gcuButton'
                    fontWeight={300}
                    title='Add to CSV Download List'
                    onClick={() => handleAddToList(id)}
                  />
                </DrawerFooter>
              </>
            ) : (
              <Flex h='60vh' align='center' w='full' justify='center'>
                <Text>{message}</Text>
              </Flex>
            )}
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}

UserDetailModal.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
  finalFocusRef: PropTypes.any.isRequired,
  setSelectItem: PropTypes.func.isRequired,
  handleAddToList: PropTypes.func.isRequired
}

export default UserDetailModal
