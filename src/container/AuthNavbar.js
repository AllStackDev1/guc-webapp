import React from 'react'
import PropTypes from 'prop-types'
import { Box, Link, Text, Flex, Progress } from '@chakra-ui/react'

import Logo1 from 'assets/images/logo@1x.svg'
import Logo2 from 'assets/images/logo@2x.svg'
import { NavLink } from 'react-router-dom'
import useApp from 'context/app'
import { getStep } from 'utils/mics'

const AuthNavbar = ({ showLogin }) => {
  const { step } = useApp()

  return (
    <>
      <Flex
        w='100%'
        as='header'
        pos='relative'
        align='center'
        justify='center'
        h={{ base: 14, md: 20, xl: 32 }}
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
        {showLogin && (
          <Flex pos='absolute' mt={{ lg: 10 }} right={{ base: 6, lg: 20 }}>
            <Link
              to='/applicant/login'
              as={NavLink}
              color='gcu.100'
              fontWeight='bold'
            >
              Login
            </Link>
            <Text d={{ base: 'none', lg: 'block' }} ml={3}>
              to resume pending applications
            </Text>
          </Flex>
        )}
      </Flex>
      <Progress
        colorScheme='gcuButton'
        value={getStep(step)}
        h={{ base: '6px', lg: '11px' }}
      />
    </>
  )
}

AuthNavbar.propTypes = {
  showLogin: PropTypes.bool
}

export default AuthNavbar
