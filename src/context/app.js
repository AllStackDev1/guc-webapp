import React, { useState, createContext, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'

import { useDisclosure } from '@chakra-ui/react'

const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState('')
  const [step, setStep] = useState(
    window.sessionStorage.getItem('step') * 1 || 1
  )
  const [data, setData] = useState([])
  const [editData, setEditData] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleMenu = () => setMenuOpen(!isMenuOpen)

  const handleModalClick = useCallback(
    (_modal, _data) => {
      setModal(_modal)
      setData(_data)
      onOpen()
    },
    [onOpen]
  )

  return (
    <AppContext.Provider
      value={{
        step,
        data,
        modal,
        isOpen,
        setStep,
        onClose,
        editData,
        setEditData,
        toggleMenu,
        errorMessage,
        successMessage,
        setErrorMessage,
        setSuccessMessage,
        handleModalClick
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
