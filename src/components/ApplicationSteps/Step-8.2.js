import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Text,
  Icon,
  IconButton,
  Button,
  useToast,
  Heading,
  Container
} from '@chakra-ui/react'
import { CalendarIcon } from 'theme/Icons'

import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import useFetch from 'hooks/useFetch'
import FetchCard from 'components/FetchCard'
import Overlay from 'components/Loading/Overlay'
import { getformattedDate } from 'utils/mics'

const StepEightTwo = ({ setStep, setEditData, getSiblings, deleteSibling }) => {
  const [reload, setReload] = React.useState(0)
  const [isSubmitting, setSubmitting] = React.useState(false)
  const triggerReload = () => setReload(prevState => prevState + 1)
  const toast = useToast()

  const { data, error, isLoading } = useFetch('siblings', getSiblings, reload)

  const handleAdd = () => {
    setEditData(null)
    setStep(6.1)
  }

  const handleEdit = e => {
    setEditData(e)
    setStep(8.1)
  }

  const handleDelete = async id => {
    try {
      setSubmitting(true)
      await deleteSibling(id)
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Success',
        description: 'Sibling removed successfully!'
      })
      window.sessionStorage.removeItem('siblings')
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
      setStep(8.1)
    }
  }, [isLoading, error, data, setStep])

  return (
    <>
      {isSubmitting && <Overlay text='Deleting record' />}
      <Container
        align='center'
        mt={{ lg: 4 }}
        px={{ lg: 10 }}
        minW={{ lg: '3xl' }}
      >
        <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
          Sibling
        </Heading>
        {isLoading || error ? (
          <FetchCard
            mx='auto'
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
            mt={{ lg: 16 }}
            px={{ lg: 10 }}
            flexDir='column'
            align='flex-start'
          >
            {data?.map(e => (
              <Flex
                w='100%'
                key={e._id}
                border='1px'
                rounded='md'
                py={{ lg: 5 }}
                px={{ lg: 5 }}
                pos='relative'
                textAlign='left'
                bgColor='gcu.600'
                borderColor='gray.200'
              >
                <Flex w={8} h={8} align='center' bgColor='gcu.50'>
                  <Icon mx='auto' as={CalendarIcon} />
                </Flex>

                <Box ml={5}>
                  <Heading
                    lineHeight='2'
                    as='h6'
                    fontSize='md'
                    fontFamily='body'
                  >
                    {e.name}
                  </Heading>
                  <Text lineHeight='2'>{e.gender}</Text>
                  <Text lineHeight='2'>{getformattedDate(e.dob)}</Text>
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
              leftIcon={<FiPlus />}
              fontWeight='bold'
              textColor='gcu.100'
              fontSize='sm'
              aria-label='Add Another School'
              _focus={{ bg: 'unset' }}
              _hover={{ bg: 'unset' }}
              onClick={() => handleAdd()}
            >
              Add Another Siblings
            </Button>

            <Flex w='100%' justify='space-between'>
              <Button
                mt={8}
                w='200px'
                rounded='0'
                type='submit'
                color='gcu.100'
                fontSize='sm'
                boxShadow='lg'
                fontWeight={600}
                variant='outline'
                colorScheme='gcuButton'
                h={{ base: '3.375rem' }}
                _focus={{ outline: 'none' }}
                onClick={() => setStep(7)}
              >
                Previous
              </Button>
              <Button
                mt={8}
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
                onClick={() => setStep(9)}
              >
                Next
              </Button>
            </Flex>
          </Flex>
        )}
      </Container>
    </>
  )
}

StepEightTwo.propTypes = {
  setStep: PropTypes.func.isRequired,
  setEditData: PropTypes.func.isRequired,
  getSiblings: PropTypes.func.isRequired,
  deleteSibling: PropTypes.func.isRequired
}

export default StepEightTwo
