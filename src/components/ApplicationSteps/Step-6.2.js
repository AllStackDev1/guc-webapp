import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Flex,
  Button,
  Avatar,
  Heading,
  useToast,
  Container,
  IconButton
} from '@chakra-ui/react'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'
import Overlay from 'components/Loading/Overlay'
import { getformattedDate } from 'utils/mics'
import CustomButton from 'components/Forms/CustomButton'

const StepSixTwo = ({
  setView,
  history,
  setEditData,
  getPreviousSchools,
  deletePreviousSchool
}) => {
  const [reload, setReload] = React.useState(0)
  const [isSubmitting, setSubmitting] = React.useState(false)
  const triggerReload = () => setReload(prevState => prevState + 1)
  const toast = useToast()

  const { data, error, isLoading } = useFetch(
    'previous-schoools',
    getPreviousSchools,
    reload
  )

  const handleAdd = () => {
    setEditData(null)
    setView(6.1)
  }

  const handleEdit = e => {
    setEditData(e)
    setView(6.1)
  }

  const handleDelete = async id => {
    try {
      setSubmitting(true)
      await deletePreviousSchool(id)
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Success',
        description: 'Previous schoool removed successfully!'
      })
      window.sessionStorage.removeItem('previous-schoools')
      window.location.reload()
    } catch (error) {
      let eMgs
      if (error?.data?.message === 'celebrate request validation failed') {
        eMgs = 'Invalid data, please check form.'
      } else {
        eMgs =
          error?.message || error?.data?.message || 'Unexpected network error.'
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

  React.useEffect(() => {
    if (!isLoading && !error && !data?.length) {
      setView(6.1)
    }
  }, [isLoading, error, data, setView])

  return (
    <div>
      {isSubmitting && <Overlay text='Deleting record' />}
      <Container
        align='center'
        mt={{ base: 8, lg: 4 }}
        px={{ base: 5, lg: 10 }}
        minW={{ lg: '3xl' }}
      >
        <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
          Previous Schools
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
            mt={{ base: 8, lg: 16 }}
            px={{ lg: 10 }}
            flexDir='column'
            align='flex-start'
          >
            {data?.map(e => (
              <Flex
                w='100%'
                mb={4}
                key={e._id}
                border='1px'
                rounded='md'
                py={{ base: 5, lg: 10 }}
                px={{ base: 3, lg: 5 }}
                pos='relative'
                textAlign='left'
                align='flex-start'
                bgColor='#FBFBFB'
                borderColor='gray.200'
              >
                <Avatar bg='gcu.100' color='white' name={e.name} />

                <Box ml={8} fontSize={{ base: 'sm', lg: 'md' }}>
                  <Heading
                    as='h6'
                    lineHeight={{ lg: '2' }}
                    fontSize={{ base: 'sm', lg: 'md' }}
                    fontFamily='body'
                  >
                    {e.name}
                  </Heading>
                  <Text lineHeight='2'>{e.address}</Text>
                  <Text lineHeight='2'>{e.email}</Text>
                  <Text lineHeight='2'>
                    {getformattedDate(e.dateOfArrival)} to{' '}
                    {getformattedDate(e.dateOfLeaving)}
                  </Text>
                </Box>

                <Flex pos='absolute' top={0} right={0}>
                  <IconButton
                    bg='unset'
                    type='button'
                    textColor='gcu.100'
                    aria-label='Edit'
                    icon={<FiEdit2 />}
                    onClick={() => handleEdit(e)}
                  />
                  <Box mx={2} />
                  <IconButton
                    bg='unset'
                    type='button'
                    textColor='gcu.100'
                    aria-label='Remove'
                    icon={<FiTrash2 />}
                    onClick={() => handleDelete(e._id)}
                  />
                </Flex>
              </Flex>
            ))}

            <Button
              bg='unset'
              type='button'
              fontSize='sm'
              fontWeight='bold'
              textColor='gcu.100'
              leftIcon={<FiPlus />}
              aria-label='Add Another School'
              _focus={{ bg: 'unset' }}
              _hover={{ bg: 'unset' }}
              onClick={() => handleAdd()}
            >
              Add Another School
            </Button>

            <Flex
              w='100%'
              mt={5}
              flexDir={{ base: 'column-reverse', lg: 'row' }}
              justify={{ lg: 'space-between' }}
            >
              <CustomButton
                color='gcu.100'
                variant='outline'
                label='Previous'
                type='button'
                onClick={() => history.push('/applicant/initial-enquiry')}
              />

              <CustomButton
                label='Next'
                color='#fff'
                type='button'
                onClick={() => history.push('/applicant/student-background')}
              />
            </Flex>
          </Flex>
        )}
      </Container>
    </div>
  )
}

StepSixTwo.propTypes = {
  setView: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setEditData: PropTypes.func.isRequired,
  deletePreviousSchool: PropTypes.func.isRequired,
  getPreviousSchools: PropTypes.func.isRequired
}

export default StepSixTwo
