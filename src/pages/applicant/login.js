import React from 'react'
import { Layout, StepThree } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const Start = props => {
  const apis = useApi()
  const auth = useAuth()
  const app = useApp()

  React.useEffect(() => {
    app.setStep(3)
  }, [app])

  return (
    <Layout
      title='Login'
      page='applicant/login'
      meta_desc='This is the login page. An applicant must alway have to provide their application code to access their account'
      {...props}
    >
      <StepThree {...app} {...apis} {...auth} {...props} />
    </Layout>
  )
}

export default Start
