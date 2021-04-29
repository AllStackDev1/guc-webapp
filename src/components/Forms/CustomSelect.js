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
        <FormLabel fontSize='sm' fontWeight='400'>
          {label}
        </FormLabel>
      )}
      <Select h={16} bgColor='gray.50' {...rest}>
        {options?.map(e => (
          <option key={e[valueId] || e} value={e[valueId] || e}>
            {e[LabelId || valueId] || e}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
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
