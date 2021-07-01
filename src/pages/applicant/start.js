import React from 'react'
import { Layout, StepOne } from 'components/ApplicationSteps'
import useApp from 'context/app'

const Start = props => {
  const { setStep } = useApp()
  React.useEffect(() => {
    setStep(1)
  }, [setStep])
  return (
    <Layout
      title='Application Process'
      page='applicant/start'
      meta_desc='Starting the application process'
      {...props}
    >
      <StepOne {...props} />
    </Layout>
  )
}

export default Start
