import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/react'

const ActionButton = ({ title, ...rest }) => {
  return (
    <Button type='button' {...rest}>
      {title}
    </Button>
  )
}

ActionButton.propTypes = {
  title: PropTypes.string.isRequired
}

export default ActionButton
