import React from 'react'
import PropTypes from 'prop-types'
import {
  Textarea,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

const CustomTextarea = ({ id, isRequired, error, touched, label, ...rest }) => {
  return (
    <FormControl
      id={id || rest.name}
      isRequired={isRequired}
      isInvalid={error && touched}
    >
      {label && (
        <FormLabel fontSize={{ base: 'xs', lg: 'sm' }} fontWeight='400'>
          {label}
        </FormLabel>
      )}
      <Textarea
        {...rest}
        // mi={{ base: 16, lg: 16 }}
        fontSize={{ base: 'xs', lg: 'sm' }}
        bgColor='gray.50'
      />
      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomTextarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isRequired: PropTypes.bool,
  id: PropTypes.string
}

export default CustomTextarea
