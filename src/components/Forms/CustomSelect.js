import React from 'react'
import PropTypes from 'prop-types'
import {
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'

const CustomSelect = ({
  id,
  label,
  error,
  valueKey,
  labelKey,
  touched,
  options,
  isRequired,
  ...rest
}) => {
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
      <Select
        h={{ base: 12, lg: 16 }}
        fontSize={{ base: 'xs', lg: 'sm' }}
        bgColor='gray.50'
        {...rest}
      >
        {options?.map(e => (
          <option key={e[valueKey] || e} value={e[valueKey] || e}>
            {e[labelKey] || e}
          </option>
        ))}
      </Select>
      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomSelect.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  labelKey: PropTypes.string,
  isRequired: PropTypes.bool,
  valueKey: PropTypes.string,
  options: PropTypes.array.isRequired
}

export default CustomSelect
