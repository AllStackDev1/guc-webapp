import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import Navbar from './Navbar'

const Layout = ({ children, height, bg, px, py, ...rest }) => {
  return (
    <div>
      <Navbar {...rest} />
      <Box
        bg={bg}
        px={px}
        py={py}
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
    </div>
  )
}

Layout.propTypes = {
  bg: PropTypes.any,
  px: PropTypes.any,
  py: PropTypes.any,
  height: PropTypes.any,
  children: PropTypes.node.isRequired
}

export default Layout
