import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'

import { Layout, StepTwo } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const Signup = props => {
  const { enroll } = useApi()
  const { setPhoneNumber, setEmail } = useAuth()
  const { errorMessage, setErrorMessage, setSuccessMessage, setStep } = useApp()

  React.useEffect(() => {
    setStep(2)
  }, [setStep])

  const { history } = props
  return (
    <Layout
      showLogin
      title='Sign Up'
      page='applicant/signup'
      meta_desc='This is the registration page. An applicant has to create an account to process'
      {...props}
    >
      <StepTwo
        {...{
          enroll,
          setEmail,
          errorMessage,
          setPhoneNumber,
          setErrorMessage,
          setSuccessMessage
        }}
        {...props}
      />
      <Flex mt={4} justify='center'>
        <Text
          color='gcu.100'
          cursor='pointer'
          fontWeight='bold'
          textDecor='underline'
          onClick={_ => history.push('/applicant/login')}
        >
          Login
        </Text>
        <Text d={{ base: 'none', lg: 'block' }} ml={3}>
          to resume pending applications
        </Text>
      </Flex>
    </Layout>
  )
}

Signup.propTypes = {
  history: PropTypes.object.isRequired
}

export default Signup
