import React from 'react'
import { Layout, StepFifteen } from 'components/ApplicationSteps'
import useAuth from 'context/auth'
import useApp from 'context/app'

const AdmissionStatus = props => {
  const { isAuthenticated } = useAuth()
  const { setStep } = useApp()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(14)
  }, [setStep])

  return (
    <Layout
      title='Admission Status'
      page='applicant/admission-status'
      meta_desc='This is the admission status page'
      {...props}
    >
      <StepFifteen user={user} {...props} />
    </Layout>
  )
}

export default AdmissionStatus
