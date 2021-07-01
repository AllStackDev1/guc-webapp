import React from 'react'
import { Layout, StepSeven } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const StudentBackground = props => {
  const {
    setStudentBackground,
    getStudentBackground,
    updateStudentBackground
  } = useApi()
  const { isAuthenticated } = useAuth()
  const { setStep } = useApp()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(7)
  }, [setStep])

  return (
    <Layout
      title='Student Background'
      page='applicant/student-background'
      meta_desc='This is the student background form page'
      {...props}
    >
      <StepSeven
        {...{
          user,
          setStudentBackground,
          getStudentBackground,
          updateStudentBackground
        }}
        {...props}
      />
    </Layout>
  )
}

export default StudentBackground
