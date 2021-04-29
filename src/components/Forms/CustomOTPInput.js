import React from 'react'
import PropTypes from 'prop-types'
import OtpInput from 'react-otp-input'
import { Box, Text } from '@chakra-ui/react'

const CustomOTPInput = ({ mt, error, ...rest }) => {
  return (
    <Box mx='auto' my={mt} w={{ lg: 120 }}>
      <OtpInput
        isInputNum
        numInputs={6}
        shouldAutoFocus
        hasErrored={error}
        separator={<Text as='span'> </Text>}
        inputStyle={{
          fontFamily: 'TRYVesterbro',
          borderRadius: '0.375rem',
          borderColor: '#F1F1F1',
          background: '#FAFAFA',
          appearance: 'none',
          padding: '0.75rem',
          height: '4.813rem',
          fontWeight: '600',
          fontSize: '2rem',
          color: '#C82B38',
          borderWidth: 1,
          width: '5rem'
        }}
        errorStyle={{ borderColor: '#E53E3E' }}
        containerStyle={{ justifyContent: 'space-around' }}
        {...rest}
      />
      {error && (
        <Text align='left' mt={1} color='red.500' fontSize='sm'>
          {error}
        </Text>
      )}
    </Box>
  )
}

CustomOTPInput.propTypes = {
  mt: PropTypes.any,
  value: PropTypes.any.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
}

export default CustomOTPInput
