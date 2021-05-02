import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/react'

const CustomButton = ({ label, ...rest }) => {
  return (
    <Button
      rounded='0'
      aria-label={label}
      boxShadow='lg'
      fontWeight={600}
      w={{ base: '100%', lg: '200px' }}
      colorScheme='gcuButton'
      mb={{ base: 4, lg: 0 }}
      h={{ base: '3.375rem' }}
      _focus={{ outline: 'none' }}
      fontSize={{ base: 'sm', lg: 'md' }}
      {...rest}
    >
      {label}
    </Button>
  )
}

CustomButton.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default CustomButton
