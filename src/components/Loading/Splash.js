import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Spinner } from '@chakra-ui/react'

const Splash = ({ text }) => (
  <Flex bg='white' h='100vh' align='center' justify='center'>
    <Spinner size='lg' color='gcu.100' />
    {text && <Text className='loading-text'>{text}</Text>}
  </Flex>
)

Splash.propTypes = {
  text: PropTypes.string
}

export default Splash
