import React from 'react'
import { Layout, StepSix } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const InitialEnquiry = props => {
  const {
    setInitialEnquiry,
    getInitialEnquiry,
    updateInitialEnquiry
  } = useApi()
  const { isAuthenticated } = useAuth()
  const { setStep } = useApp()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(6)
  }, [setStep])

  return (
    <Layout
      title='Initial Enquiry'
      page='applicant/initial-enquiry'
      meta_desc='This is the initial enquiry form page'
      {...props}
    >
      <StepSix
        {...{
          user,
          setInitialEnquiry,
          getInitialEnquiry,
          updateInitialEnquiry
        }}
        {...props}
      />
    </Layout>
  )
}

export default InitialEnquiry
