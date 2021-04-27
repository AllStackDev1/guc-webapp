import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import jwt_decode from 'jwt-decode'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(true)
  const [otpId, setOtpId] = useState(null)
  const [token, setToken] = useState(window.sessionStorage.getItem('_gcut'))

  const store = token => {
    setToken(token)
    window.sessionStorage.setItem('_gcut', token)
  }

  const isAuthenticated = () => {
    const _gcut = window.sessionStorage.getItem('_gcut')
    if (_gcut) {
      return { token: _gcut, user: jwt_decode(_gcut) }
    } else {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        otpId,
        store,
        session,
        setOtpId,
        setSession,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useAuth = () => useContext(AuthContext)

export default useAuth
