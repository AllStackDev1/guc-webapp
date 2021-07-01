import React from 'react'
import { Layout } from 'components/ApplicationSteps'
import useApp from 'context/app'

const Start = props => {
  const { setStep } = useApp()
  React.useEffect(() => {
    setStep(1)
  }, [setStep])
  return <Layout {...props}>{/* not in use */}</Layout>
}

export default Start
