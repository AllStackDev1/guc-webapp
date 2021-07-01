import React from 'react'
import { Layout, StepEightOne, StepEightTwo } from 'components/ApplicationSteps'
import useApi from 'context/api'
import useApp from 'context/app'

const Siblings = props => {
  const { setSibling, getSiblings, deleteSibling, updateSibling } = useApi()
  const { editData, setEditData, setStep } = useApp()
  const [view, setView] = React.useState(8.2)

  React.useEffect(() => {
    setStep(view)
  }, [setStep, view])

  return (
    <Layout
      title='Siblings'
      page='applicant/siblings'
      meta_desc='This is the siblings form page'
      {...props}
    >
      {view === 8.1 ? (
        <StepEightOne
          {...{
            setView,
            editData,
            setSibling,
            updateSibling
          }}
          {...props}
        />
      ) : (
        <StepEightTwo
          {...{
            setView,
            setEditData,
            getSiblings,
            deleteSibling
          }}
          {...props}
        />
      )}
    </Layout>
  )
}

export default Siblings
