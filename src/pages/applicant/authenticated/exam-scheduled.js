import React from 'react'
import { Layout, StepThirteen } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useAuth from 'context/auth'
import useApp from 'context/app'

const ExamScheduled = props => {
  const { getScheduleTestLists } = useApi()
  const { isAuthenticated } = useAuth()
  const { setStep } = useApp()

  const user = isAuthenticated()?.user

  React.useEffect(() => {
    setStep(13)
  }, [setStep])

  return (
    <Layout
      title='Exam Scheduled'
      page='applicant/exam-scheduled'
      meta_desc='This is the exam scheduled page'
      {...props}
    >
      <StepThirteen
        {...{
          user,
          getScheduleTestLists
        }}
        {...props}
      />
    </Layout>
  )
}

export default ExamScheduled
