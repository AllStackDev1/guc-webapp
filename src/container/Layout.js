import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import Navbar from './Navbar'

const Layout = ({ children, height, ...rest }) => {
  return (
    <>
      <Navbar {...rest} />
      <Box
        {...rest}
        as='main'
        h='100vh'
        minH='100vh'
        color='gray.800'
        fontFamily='body'
        overflowX='hidden'
        w={{ lg: '100%' }}
        mt={{ base: 14, md: 20 }}
      >
        {children}
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.any,
  px: PropTypes.any,
  rest: PropTypes.any
}

export default Layout
