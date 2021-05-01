import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@chakra-ui/react'

const CustomUploader = ({ field, form, ...rest }) => {
  return (
    <Input
      type='file'
      zIndex={1}
      opacity={0}
      fontSize={0}
      name={form.name || field.name}
      onClick={e => (e.target.value = '')}
      onChange={e => {
        const files = e.currentTarget.files
        form.setFieldValue(
          form.name || field.name,
          rest.multiple ? files : files[0]
        )
      }}
      {...rest}
    />
  )
}

CustomUploader.propTypes = {
  multiple: PropTypes.bool,
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  accept: PropTypes.string.isRequired
}

export default CustomUploader
