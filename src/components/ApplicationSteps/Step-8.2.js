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
import CustomButton from 'components/Forms/CustomButton'

const StepEightTwo = ({ setStep, setEditData, getSiblings, deleteSibling }) => {
  const [reload, setReload] = React.useState(0)
  const [isSubmitting, setSubmitting] = React.useState(false)
  const triggerReload = () => setReload(prevState => prevState + 1)
  const toast = useToast()

  const { data, error, isLoading } = useFetch('siblings', getSiblings, reload)

  const handleAdd = () => {
    setEditData({})
    setStep(8.1)
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
        mt={{ base: 8, lg: 4 }}
        px={{ base: 5, lg: 10 }}
        minW={{ lg: '3xl' }}
      >
        <Heading fontWeight='bold' fontSize={{ base: 'lg', lg: '2.625rem' }}>
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
            mt={{ base: 5, lg: 16 }}
            px={{ lg: 10 }}
            flexDir='column'
            align='flex-start'
          >
            {data?.map(e => (
              <Flex
                py={5}
                w='100%'
                key={e._id}
                border='1px'
                rounded='md'
                px={{ base: 3, lg: 5 }}
                pos='relative'
                textAlign='left'
                bgColor='gcu.600'
                borderColor='gray.200'
              >
                <Flex w={8} h={8} align='center' bgColor='gcu.50'>
                  <Icon mx='auto' as={CalendarIcon} />
                </Flex>

                <Box ml={5} fontSize={{ base: 'sm', lg: 'md' }}>
                  <Heading
                    lineHeight='2'
                    as='h6'
                    fontSize={{ base: 'sm', lg: 'md' }}
                    fontFamily='body'
                  >
                    {e.name}
                  </Heading>
                  <Text lineHeight={{ lg: '2' }}>{e.gender}</Text>
                  <Text lineHeight={{ lg: '2' }}>
                    {getformattedDate(e.dob)}
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
              leftIcon={<FiPlus />}
              fontWeight='bold'
              textColor='gcu.100'
              fontSize='sm'
              aria-label='Add other School'
              _focus={{ bg: 'unset' }}
              _hover={{ bg: 'unset' }}
              onClick={() => handleAdd()}
            >
              Add other siblings
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
                onClick={() => setStep(7)}
              />

              <CustomButton
                label='Next'
                color='#fff'
                type='button'
                onClick={() => setStep(9)}
              />
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
