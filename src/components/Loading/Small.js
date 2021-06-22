import React from 'react'
import { Spinner } from '@chakra-ui/react'

const SmallSpinner = props => (
  <Spinner
    thickness='4px'
    speed='0.65s'
    size='sm'
    emptyColor='gray.200'
    color='cf.400'
    {...props}
  />
)

export default SmallSpinner
