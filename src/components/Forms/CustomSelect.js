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
  valueId,
  LabelId,
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
          <option key={e[valueId] || e} value={e[valueId] || e}>
            {e[LabelId || valueId] || e}
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
  LabelId: PropTypes.string,
  isRequired: PropTypes.bool,
  valueId: PropTypes.string,
  options: PropTypes.array.isRequired
}

export default CustomSelect
