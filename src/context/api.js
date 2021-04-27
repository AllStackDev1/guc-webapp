import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

import getConfig from 'utils/configs'
import http from 'utils/httpFacade'

const ApiContext = createContext()

export const ApiContextProvider = ({ children }) => {
  const { BASE_URL } = getConfig()

  //#region APPLICANT API
  const enroll = async payload => {
    return await http.post({
      url: `${BASE_URL}/enroll`,
      body: JSON.stringify(payload)
    })
  }

  const auth = async payload => {
    return await http.post({
      url: `${BASE_URL}/auth`,
      body: JSON.stringify(payload)
    })
  }

  const verifyOTP = async payload => {
    return await http.post({
      url: `${BASE_URL}/verify-otp`,
      body: JSON.stringify(payload)
    })
  }

  const resendCode = async payload => {
    return await http.post({
      url: `${BASE_URL}/resend-code`,
      body: JSON.stringify(payload)
    })
  }

  const applicantUpdateProfile = async payload => {
    return await http.patch({
      url: `${BASE_URL}/applicant/update-profile`,
      body: JSON.stringify(payload)
    })
  }

  //#endregion

  //#region ADMIN API
  const login = async payload => {
    return await http.post({
      url: `${BASE_URL}/login`,
      body: JSON.stringify(payload)
    })
  }

  const createAdmin = async payload => {
    return await http.post({
      url: `${BASE_URL}/admin`,
      body: JSON.stringify(payload)
    })
  }

  const getAllAdmin = async () => {
    return await http.get({ url: `${BASE_URL}/admin` })
  }

  const adminUpdateProfile = async payload => {
    return await http.patch({
      url: `${BASE_URL}/admin/update-profile`,
      body: JSON.stringify(payload)
    })
  }

  const getApplicants = async query => {
    return await http.get({ url: `${BASE_URL}/applicants`, query })
  }

  const getApplicant = async id => {
    return await http.get({ url: `${BASE_URL}/applicants/${id}` })
  }

  const updateApplicant = async (id, payload) => {
    return await http.patch({
      url: `${BASE_URL}/applicants/${id}`,
      body: JSON.stringify(payload)
    })
  }
  //#endregion

  return (
    <ApiContext.Provider
      value={{
        auth,
        login,
        enroll,
        verifyOTP,
        resendCode,
        createAdmin,
        getAllAdmin,
        getApplicant,
        getApplicants,
        updateApplicant,
        adminUpdateProfile,
        applicantUpdateProfile
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useApi = () => useContext(ApiContext)

export default useApi
