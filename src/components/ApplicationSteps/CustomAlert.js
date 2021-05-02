import React from 'react'
import PropTypes from 'prop-types'
import { Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react'

const CustomAlert = ({ errorMessage, successMessage }) => {
  const [isVisble, setVisble] = React.useState(true)
  React.useEffect(() => {
    let id = setTimeout(() => setVisble(false), 7000)
    return () => {
      clearTimeout(id)
    }
  }, [])

  return (
    isVisble && (
      <Alert
        px={5}
        py={6}
        mt={{ lg: 8 }}
        status={errorMessage ? 'error' : 'success'}
      >
        <AlertIcon />
        <AlertTitle color={errorMessage ? 'red.600' : 'green.600'} mr={2}>
          {successMessage || errorMessage}
        </AlertTitle>
        <CloseButton position='absolute' right='8px' top='8px' />
      </Alert>
    )
  )
}

CustomAlert.propTypes = {
  errorMessage: PropTypes.any,
  successMessage: PropTypes.any
}

export default CustomAlert
