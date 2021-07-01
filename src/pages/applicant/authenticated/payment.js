import React from 'react'
import { Layout, StepFive } from 'components/ApplicationSteps'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const Payment = props => {
  const { applicantUpdateProfile } = useApi()
  const { isAuthenticated, setEmail, setEnterApplication } = useAuth()
  const { setStep } = useApp()
  const { width, height } = useWindowSize()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(5)
  }, [setStep])

  return (
    <Layout
      title='Application Payment'
      page='applicant/payment'
      meta_desc='This is the application payment page. An applicant has to pay #10,000 to process'
      {...props}
    >
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
      />
      <StepFive
        {...{
          user,
          setEmail,
          setStep,
          setEnterApplication,
          applicantUpdateProfile
        }}
        {...props}
      />
    </Layout>
  )
}

export default Payment
