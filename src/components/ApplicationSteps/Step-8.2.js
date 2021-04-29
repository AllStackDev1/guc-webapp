import React from 'react'
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  Heading,
  Container
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { CalendarIcon } from 'theme/Icons'

const StepEightTwo = () => {
  return (
    <Container
      align='center'
      mt={{ lg: 4 }}
      px={{ lg: 10 }}
      minW={{ lg: '3xl' }}
    >
      <Heading fontWeight='bold' fontSize={{ base: '', lg: '2.625rem' }}>
        Sibling
      </Heading>

      <Flex mt={{ lg: 16 }} px={{ lg: 10 }} flexDir='column' align='flex-start'>
        <Flex
          w='100%'
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
            <Heading lineHeight='2' as='h6' fontSize='md' fontFamily='body'>
              Jerry Ikenna Ibeawuchi
            </Heading>
            <Text lineHeight='2'>Male</Text>
            <Text lineHeight='2'>June / 20 / 2021</Text>
          </Box>

          <Button
            bg='unset'
            right={10}
            pos='absolute'
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
          fontWeight='bold'
          textColor='gcu.100'
          fontSize='sm'
          aria-label='Add Another School'
          _focus={{ bg: 'unset' }}
          _hover={{ bg: 'unset' }}
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
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default StepEightTwo
