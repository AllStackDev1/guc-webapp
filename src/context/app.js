import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [step, setStep] = useState(sessionStorage.getItem('step') * 1 || 1)
  const [editData, setEditData] = useState(null)

  const toggleMenu = () => setMenuOpen(!isMenuOpen)

  const clearAppState = step => {
    setSuccessMessage(null)
    setErrorMessage(null)
    setMenuOpen(false)
    setEditData(null)
    setStep(step)
    window.sessionStorage.setItem('step', step)
  }

  return (
    <AppContext.Provider
      value={{
        step,
        setStep,
        editData,
        toggleMenu,
        setEditData,
        errorMessage,
        clearAppState,
        successMessage,
        setErrorMessage,
        setSuccessMessage
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useApp = () => useContext(AppContext)

export default useApp
