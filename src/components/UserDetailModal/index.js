/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
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

import { getformattedDate } from 'utils/mics'

const UserDetailModal = ({
  id,
  onClose,
  setSelectItem,
  handlePreview,
  ...rest
}) => {
  const [reload, setReload] = React.useState(0)
  const { getApplicant } = useApi()

  const triggerReload = () => setReload(prevState => prevState + 1)

  const { data, message, error, isLoading } = useFetch(
    // 'applicant',
    null,
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
                        bg='#F2F2F2'
                        fontSize='sm'
                        fontWeight={300}
                        title='Add to CSV Download List'
                        // onClick={handleBulkDelete}
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
                      <Text>Most Recent school report</Text>
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
                    <GridItem>
                      <Text fontSize='xs'>Date of Birth</Text>
                      <Text fontSize='sm'>
                        {getformattedDate(data.initialEnquiry?.studentInfo.dob)}
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Text fontSize='xs'>Gender</Text>
                      <Text fontSize='sm'>
                        {data.initialEnquiry?.studentInfo.gender}
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Text fontSize='xs'>Country of Birth</Text>
                      <Text fontSize='sm'>
                        {data.initialEnquiry?.studentInfo.countryOfBirth}
                      </Text>
                    </GridItem>
                    <GridItem>
                      <Text fontSize='xs'>Nationality on passport</Text>
                      <Text fontSize='sm'>
                        {data.initialEnquiry?.studentInfo.nationality}
                      </Text>
                    </GridItem>
                  </Grid>
                </DrawerBody>
                <DrawerFooter mb={6}>
                  <ActionButton
                    bg='#F2F2F2'
                    fontWeight={300}
                    fontSize='sm'
                    title='Add to CSV Download List'
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
  setSelectItem: PropTypes.func.isRequired
}

export default UserDetailModal
