import React from 'react'
import { Layout, StepSixOne, StepSixTwo } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useApp from 'context/app'

const PreviousSchool = props => {
  const {
    getPreviousSchools,
    setPreviousSchool,
    updatePreviousSchool,
    deletePreviousSchool
  } = useApi()
  const { editData, setEditData, setStep } = useApp()
  const [view, setView] = React.useState(6.2)

  React.useEffect(() => {
    setStep(view)
  }, [setStep, view])

  return (
    <Layout
      title='Previous School'
      page='applicant/previous-schools'
      meta_desc='This is the previous schools form page'
      {...props}
    >
      {view === 6.1 ? (
        <StepSixOne
          {...{
            setView,
            editData,
            setPreviousSchool,
            updatePreviousSchool
          }}
          {...props}
        />
      ) : (
        <StepSixTwo
          {...{
            setView,
            setEditData,
            getPreviousSchools,
            deletePreviousSchool
          }}
          {...props}
        />
      )}
    </Layout>
  )
}

export default PreviousSchool
