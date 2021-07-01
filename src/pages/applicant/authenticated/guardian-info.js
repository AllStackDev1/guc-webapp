import React from 'react'
import { Layout, StepTen } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const GuardianInfo = props => {
  const {
    setGuardianContact,
    getGuardianContact,
    updateGuardianContact
  } = useApi()
  const { isAuthenticated } = useAuth()
  const { setStep } = useApp()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(10)
  }, [setStep])

  return (
    <Layout
      title='Guardian Information'
      page='applicant/guardian-info'
      meta_desc='This is the guardian information form page'
      {...props}
    >
      <StepTen
        {...{
          user,
          setGuardianContact,
          getGuardianContact,
          updateGuardianContact
        }}
        {...props}
      />
    </Layout>
  )
}

export default GuardianInfo
