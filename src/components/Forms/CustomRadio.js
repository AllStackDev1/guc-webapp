import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  Stack,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl
} from '@chakra-ui/react'

const CustomRadio = ({
  id,
  name,
  value,
  label,
  options,
  setFieldValue,
  ...rest
}) => {
  return (
    <FormControl id={id || rest.name}>
      {label && (
        <FormLabel fontSize={{ base: 'xs', lg: 'sm' }} fontWeight='400'>
          {label}
        </FormLabel>
      )}
      <RadioGroup
        colorScheme='gcuButton'
        onChange={val => setFieldValue(name, val)}
        value={value}
      >
        <Stack {...rest}>
          {options?.map(e => (
            <Radio key={e?.value || e} value={e.value || e}>
              <Text textTransform='capitalize'>{e.label || e}</Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}

CustomRadio.propTypes = {
  value: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func.isRequired
}

export default CustomRadio
