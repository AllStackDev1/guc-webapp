import React from 'react'
import { Layout, StepNine } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const HealthMedical = props => {
  const { setHealthMedical, getHealthMedical, updateHealthMedical } = useApi()
  const { isAuthenticated } = useAuth()
  const { setStep } = useApp()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(9)
  }, [setStep])

  return (
    <Layout
      title='Health and Medical'
      page='applicant/health-and-medical'
      meta_desc='This is the health and medical form page'
      {...props}
    >
      <StepNine
        {...{
          user,
          setHealthMedical,
          getHealthMedical,
          updateHealthMedical
        }}
        {...props}
      />
    </Layout>
  )
}

export default HealthMedical
