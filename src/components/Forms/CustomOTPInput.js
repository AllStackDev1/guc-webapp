import React from 'react'
import PropTypes from 'prop-types'
import OtpInput from 'react-otp-input'
import { Box, Text } from '@chakra-ui/react'

const CustomOTPInput = ({ mt, error, ...rest }) => {
  return (
    <Box mx='auto' my={mt} w={{ base: '100%', lg: 120 }}>
      <OtpInput
        isInputNum
        numInputs={6}
        shouldAutoFocus
        hasErrored={error}
        separator={<Text as='span'> </Text>}
        className='otp-input'
        errorStyle={{ borderColor: '#E53E3E' }}
        containerStyle={{ justifyContent: 'space-around' }}
        {...rest}
      />
      {error && (
        <Text
          align='left'
          mt={1}
          color='red.500'
          fontSize={{ base: 'xs', lg: 'sm' }}
        >
          {error}
        </Text>
      )}
    </Box>
  )
}

CustomOTPInput.propTypes = {
  mt: PropTypes.any,
  error: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
}

export default CustomOTPInput
