import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex, Progress } from '@chakra-ui/react'

import Logo1 from 'assets/images/logo@1x.svg'
import Logo2 from 'assets/images/logo@2x.svg'

const AuthNavbar = ({ value, step, setStep }) => {
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
        {step === 2 && (
          <Flex pos='absolute' mt={10} right={20}>
            <Text
              color='gcu.100'
              cursor='pointer'
              fontWeight='bold'
              textDecor='underline'
              onClick={_ => setStep(3)}
            >
              Login
            </Text>
            <Text ml={3}>to resume pending applications</Text>
          </Flex>
        )}
      </Flex>
      <Progress colorScheme='gcuButton' value={value} h='11px' />
    </>
  )
}

AuthNavbar.propTypes = {
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired
}

export default AuthNavbar
