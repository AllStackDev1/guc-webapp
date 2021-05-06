import React from 'react'
import { Text, Link } from '@chakra-ui/react'

const Legal = () => {
  return (
    <Text
      mt={{ base: 2, lg: 4 }}
      w={{ lg: 110 }}
      align='center'
      fontWeight='300'
      fontSize={{ base: 'sm', lg: 'lg' }}
      lineHeight={{ base: '4', lg: '30px' }}
    >
      By applying you agree to our
      <Link
        href='#'
        color='gcu.100'
        _hover={{ textDecor: 'none', fontWeight: '500' }}
        _focus={{ textDecor: 'none', fontWeight: '500' }}
      >
        {' Terms and conditions '}
      </Link>
      and
      <Link
        href='#'
        color='gcu.100'
        _hover={{ textDecor: 'none', fontWeight: '500' }}
        _focus={{ textDecor: 'none', fontWeight: '500' }}
      >
        {' Privacy Policy '}
      </Link>
    </Text>
  )
}

export default Legal
