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

  return (
    <AppContext.Provider
      value={{
        step,
        setStep,
        editData,
        toggleMenu,
        setEditData,
        errorMessage,
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
