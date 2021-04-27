import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text, Spinner, Slide } from '@chakra-ui/react'

const Overlay = ({ text }) => {
  return (
    <Slide direction='top' in={true} style={{ zIndex: 100 }}>
      <Box pos='fixed' width='100vw' bg='cf-dark.500'>
        <Flex direction='column' align='center' justify='center' h='100vh'>
          <Spinner size='lg' color='cf.400' />
          {text && (
            <Text textAlign='center' className='loading-text loading-text-b'>
              {text}
            </Text>
          )}
        </Flex>
      </Box>
    </Slide>
  )
}

Overlay.propTypes = {
  text: PropTypes.string
}

export default Overlay
