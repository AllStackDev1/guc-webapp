import React from 'react'
import PropTypes from 'prop-types'
import { Ng } from 'react-flags-select'
import {
  Box,
  Input,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

const PhoneInput = ({ id, isRequired, error, touched, label, ...rest }) => {
  return (
    <FormControl
      id={id || rest.name}
      isRequired={isRequired}
      isInvalid={error && touched}
    >
      {label && (
        <FormLabel fontSize='sm' fontWeight='400'>
          {label}
        </FormLabel>
      )}
      <InputGroup size='md'>
        <InputLeftElement h={{ md: 16 }} width='4rem'>
          <Box as={Ng} w='full' />
        </InputLeftElement>
        <Input pl='4rem' h={{ md: 16 }} bgColor='gray.50' {...rest} />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

PhoneInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isRequired: PropTypes.bool,
  id: PropTypes.string
}

export default PhoneInput
