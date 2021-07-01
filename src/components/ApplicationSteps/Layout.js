import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Box, Flex } from '@chakra-ui/react'

import AuthNavbar from 'container/AuthNavbar'
import BgShape from 'assets/images/bg-shape.png'

const Layout = ({ title, page, meta_desc, showLogin, children }) => {
  return (
    <Box bg='white'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{title}</title>
        <meta name='description' content={meta_desc} />
        <link rel='canonical' href={`https://enrolloment.gcu.sch.ng/${page}`} />
      </Helmet>
      <AuthNavbar showLogin={showLogin} />

      <Flex
        w='100%'
        as='main'
        minH='100vh'
        flexDir='column'
        py={{ base: '', lg: 16 }}
      >
        {children}
      </Flex>
      <Box
        right={0}
        bottom={0}
        pos='absolute'
        bgSize='cover'
        bgPos='center'
        bgRepeat='no-repeat'
        bgImage={`url('${BgShape}')`}
        w={{ base: '5rem', lg: '15rem' }}
        h={{ base: '5rem', lg: '15rem' }}
      />
    </Box>
  )
}

Layout.propTypes = {
  showLogin: PropTypes.bool,
  page: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  meta_desc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Layout
