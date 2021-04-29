import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex, Button, Heading, Avatar } from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'

const StepSicTWo = () => {
  return (
    <Box>
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Previous Schools
      </Heading>

      <Flex mt={{ lg: 16 }} px={{ lg: 10 }} flexDir='column' align='flex-start'>
        <Flex
          border='1px'
          py={{ lg: 10 }}
          px={{ lg: 5 }}
          rounded='md'
          textAlign='left'
          align='flex-start'
          bgColor='gcu.600'
          borderColor='gray.200'
          justify='space-between'
        >
          <Avatar mr={{ lg: 5 }} name='Kings College Lagos' />

          <Box>
            <Heading lineHeight='2' as='h6' fontSize='md' fontFamily='body'>
              Kings College Lagos
            </Heading>
            <Text lineHeight='2'>
              No 30 ladioke akintola lekki Phase I, Lagos
            </Text>
            <Text lineHeight='2'>Jerrysonibe@gmail.com</Text>
            <Text lineHeight='2'>Mar 2017 to Jan 2018</Text>
          </Box>
          <Button
            bg='unset'
            fontWeight='normal'
            textColor='gcu.100'
            _focus={{ bg: 'unset' }}
            _hover={{ bg: 'unset' }}
          >
            Edit
          </Button>
        </Flex>

        <Button
          bg='unset'
          leftIcon={<FiPlus />}
          fontWeight='normal'
          textColor='gcu.100'
          fontSize='sm'
          aria-label='Add Another School'
          _focus={{ bg: 'unset' }}
          _hover={{ bg: 'unset' }}
        >
          Add Another School
        </Button>

        <Flex w='100%' justify='space-between'>
          <Button
            mt={8}
            w='200px'
            rounded='0'
            type='submit'
            color='gcu.100'
            fontSize='md'
            boxShadow='lg'
            fontWeight={600}
            variant='outline'
            colorScheme='gcuButton'
            h={{ base: '3.375rem' }}
            _focus={{ outline: 'none' }}
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
            fontWeight={400}
            colorScheme='gcuButton'
            h={{ base: '3.375rem' }}
            _focus={{ outline: 'none' }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

StepSicTWo.propTypes = {
  enroll: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default StepSicTWo
