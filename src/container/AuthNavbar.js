import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Progress } from '@chakra-ui/react'

import Logo1 from 'assets/images/logo@1x.svg'
import Logo2 from 'assets/images/logo@2x.svg'

const AuthNavbar = ({ value }) => {
  return (
    <Flex flexDir='column' pos='relative'>
      <Flex
        top={0}
        w='100%'
        as='header'
        pos='fixed'
        zIndex={100}
        align='center'
        justify='center'
        h={{ base: 14, md: 20, xl: 36 }}
        overflowX={{ base: 'hidden', md: 'visible' }}
      >
        <Box
          bgImage={{
            base: `url('${Logo1}')`,
            lg: `url('${Logo2}')`
          }}
          bgSize='cover'
          bgPos='center'
          bgRepeat='no-repeat'
          w={{ base: '3.125rem', lg: '5.875rem' }}
          h={{ base: '3.063rem', lg: '5.688rem' }}
        />
      </Flex>
      <Progress
        mt={{ base: 14, md: 20, xl: 36 }}
        colorScheme='gcuButton'
        value={value}
        h='11px'
      />
    </Flex>
  )
}

AuthNavbar.propTypes = {
  value: PropTypes.any
}

export default AuthNavbar
