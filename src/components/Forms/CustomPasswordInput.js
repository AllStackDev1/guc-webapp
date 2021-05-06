import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  FormLabel,
  InputGroup,
  IconButton,
  FormControl,
  FormErrorMessage,
  InputRightElement
} from '@chakra-ui/react'
import { FiEyeOff, FiEye } from 'react-icons/fi'

const PasswordInput = ({ id, isRequired, error, touched, label, ...rest }) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

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
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          h={{ md: 16 }}
          bgColor='gray.50'
          type={show ? 'text' : 'password'}
          {...rest}
        />
        <InputRightElement h={{ md: 16 }} width='4.5rem'>
          <IconButton
            bg='unset'
            size='sm'
            h='1.75rem'
            _hover={{
              bg: 'unset'
            }}
            type='button'
            onClick={e => {
              e.preventDefault()
              handleClick()
            }}
            icon={show ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage fontSize={{ base: 'xs', lg: 'sm' }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  )
}

PasswordInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isRequired: PropTypes.bool,
  id: PropTypes.string
}

export default PasswordInput
