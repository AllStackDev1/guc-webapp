import React from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

import { Layout, StepTwelve } from 'components/ApplicationSteps'
import useApp from 'context/app'
import useAuth from 'context/auth'

const Success = props => {
  const { setStep, clearAppState } = useApp()
  const { clearAuthState } = useAuth()

  const { width, height } = useWindowSize()
  React.useEffect(() => {
    setStep(12)
  }, [setStep])

  return (
    <Layout
      title='Application Successful'
      page='applicant/success'
      meta_desc='This is the success page'
      {...props}
    >
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
      />
      <StepTwelve {...{ clearAuthState, clearAppState }} {...props} />
    </Layout>
  )
}

export default Success
