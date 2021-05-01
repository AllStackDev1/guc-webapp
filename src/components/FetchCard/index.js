import React from 'react'
import PropTypes from 'prop-types'
import { IoIosRefresh } from 'react-icons/io'
import { Flex, Text, Button, Spinner } from '@chakra-ui/react'

const FetchCard = ({ loading, error, text, reload, ...rest }) => {
  return (
    <Flex {...rest}>
      <Flex
        textAlign='center'
        align='center'
        justify='center'
        direction='column'
      >
        <>
          {loading && <Spinner size='md' color='gcu.100' />}
          {text && !error && (
            <Text className='loading-text loading-text-b'>{text}</Text>
          )}
          {error && (
            <>
              <Text fontSize='md' ml={2} color='gcu.100'>
                Something went wrong
              </Text>
              <Button
                size='md'
                color='white'
                rounded='20px'
                colorScheme='gcuButton'
                onClick={() => reload()}
                leftIcon={<IoIosRefresh size={25} />}
                _hover={{ bg: 'gcu.100' }}
              >
                <Text fontSize='sm'>Try again</Text>
              </Button>
            </>
          )}
        </>
      </Flex>
    </Flex>
  )
}

FetchCard.propTypes = {
  reload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  text: PropTypes.any
}

export default FetchCard
