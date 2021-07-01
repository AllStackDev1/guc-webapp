import React from 'react'
import PropTypes from 'prop-types'

import { Flex, Text } from '@chakra-ui/react'
import { Layout, StepOne } from 'components/ApplicationSteps'
import useApp from 'context/app'

const Start = props => {
  const { setStep } = useApp()
  React.useEffect(() => {
    setStep(1)
  }, [setStep])

  const { history } = props

  return (
    <Layout
      title='Application Process'
      page='applicant/start'
      meta_desc='Starting the application process'
      {...props}
    >
      <StepOne {...props} />
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

Start.propTypes = {
  history: PropTypes.object.isRequired
}
export default Start
