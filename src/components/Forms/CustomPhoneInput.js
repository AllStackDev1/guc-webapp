import React from 'react'
import PropTypes from 'prop-types'
import { FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

const CustomPhoneInput = ({
  name,
  value,
  error,
  touched,
  isRequired,
  setFieldTouched,
  setFieldValue
}) => {
  const errorStyle =
    error && touched
      ? {
          borderColor: '#E53E3E',
          boxShadow: '0 0 0 1px #e53e3e'
        }
      : {}

  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={error && touched}>
      <FormLabel fontSize={{ base: 'xs', lg: 'sm' }} fontWeight='400'>
        Phone Number
      </FormLabel>

      <IntlTelInput
        format
        autocomplete='off'
        fieldName='phoneNumber'
        fieldId='phoneNumber'
        defaultCountry='ng'
        preferredCountries={['ng', 'us', 'gb', 'gh', 'de', 'fr', 'cn']}
        defaultValue={value}
        onPhoneNumberBlur={(status, value, countryData) => {
          setFieldTouched('phoneNumber', true)
          if (value.split('').includes('+')) {
            setFieldValue('phoneNumber', value)
          } else {
            const number = `+${countryData.dialCode}${value
              .replace(/^0+/, '')
              .replace(/\s/g, '')}`
            setFieldValue('phoneNumber', number)
          }
          const name = countryData.name.split(' (', 1).toString()
          name && setFieldValue('country', name)
        }}
        onPhoneNumberChange={(status, value, countryData) => {
          setFieldTouched('phoneNumber', true)
          if (value.split('').includes('+')) {
            setFieldValue('phoneNumber', value)
          } else {
            const number = `+${countryData.dialCode}${value
              .replace(/^0+/, '')
              .replace(/\s/g, '')}`
            setFieldValue('phoneNumber', number)
          }
          const name = countryData.name.split(' (', 1).toString()
          name && setFieldValue('country', name)
        }}
        style={{
          width: '100%',
          borderRadius: 'var(--chakra-radii-md)',
          ...errorStyle
        }}
      />

      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

CustomPhoneInput.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  value: PropTypes.string,
  isRequired: PropTypes.bool,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired
}
export default CustomPhoneInput
