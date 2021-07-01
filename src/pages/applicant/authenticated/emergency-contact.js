import React from 'react'
import { Layout, StepEleven } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const EmergencyContact = props => {
  const {
    setEmergenyContact,
    getEmergenyContact,
    updateEmergenyContact
  } = useApi()
  const { isAuthenticated } = useAuth()
  const { setStep } = useApp()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(11)
  }, [setStep])

  return (
    <Layout
      title='Emergency Contact'
      page='applicant/emergency-contact'
      meta_desc='This is the emergency contact form page'
      {...props}
    >
      <StepEleven
        {...{
          user,
          setEmergenyContact,
          getEmergenyContact,
          updateEmergenyContact
        }}
        {...props}
      />
    </Layout>
  )
}

export default EmergencyContact
