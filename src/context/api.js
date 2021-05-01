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
      url: `${BASE_URL}/applicants/update-profile`,
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

  //#region INITIAL ENQUIRIES API
  const setInitialEnquiry = async payload => {
    return await http.post({
      url: `${BASE_URL}/initial-enquiries`,
      body: JSON.stringify(payload)
    })
  }

  const getInitialEnquiry = async query => {
    return await http.get({
      url: `${BASE_URL}/initial-enquiries`,
      query
    })
  }

  const updateInitialEnquiry = async (id, payload) => {
    return await http.put({
      url: `${BASE_URL}/initial-enquiries/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const deleteInitialEnquiry = async id => {
    return await http.post({ url: `${BASE_URL}/initial-enquiries/${id}` })
  }
  //#endregion

  //#region PREVIOUS SCHOOL API
  const setPreviousSchool = async payload => {
    return await http.post({
      url: `${BASE_URL}/previous-schools`,
      body: JSON.stringify(payload)
    })
  }

  const getPreviousSchools = async query => {
    return await http.get({
      url: `${BASE_URL}/previous-schools`,
      query
    })
  }

  const updatePreviousSchool = async (id, payload) => {
    return await http.put({
      url: `${BASE_URL}/previous-schools/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const deletePreviousSchool = async id => {
    return await http.delete({ url: `${BASE_URL}/previous-schools/${id}` })
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
        setPreviousSchool,
        getPreviousSchools,
        updatePreviousSchool,
        deletePreviousSchool,
        setInitialEnquiry,
        getInitialEnquiry,
        adminUpdateProfile,
        updateInitialEnquiry,
        deleteInitialEnquiry,
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
