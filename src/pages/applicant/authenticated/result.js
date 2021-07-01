import React from 'react'
import { Layout, StepFourteen } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const Result = props => {
  const { getApplicantResultFile } = useApi()
  const { isAuthenticated } = useAuth()
  const { setStep } = useApp()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(14)
  }, [setStep])

  return (
    <Layout
      title='Exam Result'
      page='applicant/result'
      meta_desc='This is the result page'
      {...props}
    >
      <StepFourteen
        {...{
          user,
          getApplicantResultFile
        }}
        {...props}
      />
    </Layout>
  )
}

export default Result
