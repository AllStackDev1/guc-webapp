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

  const getAllApplicantsDetails = async payload => {
    return await http.post({
      url: `${BASE_URL}/applicants-details`,
      body: JSON.stringify(payload)
    })
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

  const deleteApplicant = async id => {
    return await http.delete({
      url: `${BASE_URL}/applicants/${id}`
    })
  }

  const deleteApplicants = async payload => {
    return await http.post({
      url: `${BASE_URL}/applicants/bulk-delete`,
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

  //#region STUDENT BACKGROUND API
  const setStudentBackground = async payload => {
    return await http.post({
      url: `${BASE_URL}/student-backgrounds`,
      body: JSON.stringify(payload)
    })
  }

  const getStudentBackground = async query => {
    return await http.get({
      url: `${BASE_URL}/student-backgrounds`,
      query
    })
  }

  const updateStudentBackground = async (id, payload) => {
    return await http.put({
      url: `${BASE_URL}/student-backgrounds/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const deleteStudentBackground = async id => {
    return await http.post({
      url: `${BASE_URL}/student-backgrounds/${id}`
    })
  }
  //#endregion

  //#region SIBLING API
  const setSibling = async payload => {
    return await http.post({
      url: `${BASE_URL}/siblings`,
      body: JSON.stringify(payload)
    })
  }

  const getSiblings = async query => {
    return await http.get({ url: `${BASE_URL}/siblings`, query })
  }

  const updateSibling = async (id, payload) => {
    return await http.put({
      url: `${BASE_URL}/siblings/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const deleteSibling = async id => {
    return await http.delete({ url: `${BASE_URL}/siblings/${id}` })
  }
  //#endregion

  //#region HEALTH AND MEDICAL API
  const setHealthMedical = async payload => {
    return await http.post({
      url: `${BASE_URL}/healths-and-medicals`,
      body: JSON.stringify(payload)
    })
  }

  const getHealthMedical = async query => {
    return await http.get({
      url: `${BASE_URL}/healths-and-medicals`,
      query
    })
  }

  const updateHealthMedical = async (id, payload) => {
    return await http.put({
      url: `${BASE_URL}/healths-and-medicals/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const deleteHealthMedical = async id => {
    return await http.post({
      url: `${BASE_URL}/healths-and-medicals/${id}`
    })
  }
  //#endregion

  //#region GUARDIAN CONTACT INFORMATION API
  const setGuardianContact = async payload => {
    return await http.post({
      url: `${BASE_URL}/guardian-contact-informations`,
      body: JSON.stringify(payload)
    })
  }

  const getGuardianContact = async query => {
    return await http.get({
      url: `${BASE_URL}/guardian-contact-informations`,
      query
    })
  }

  const updateGuardianContact = async (id, payload) => {
    return await http.put({
      url: `${BASE_URL}/guardian-contact-informations/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const deleteGuardianContact = async id => {
    return await http.post({
      url: `${BASE_URL}/guardian-contact-informations/${id}`
    })
  }
  //#endregion

  //#region EMERGENCY CONTACT API
  const setEmergenyContact = async payload => {
    return await http.post({
      url: `${BASE_URL}/emergency-contacts`,
      body: JSON.stringify(payload)
    })
  }

  const getEmergenyContact = async query => {
    return await http.get({
      url: `${BASE_URL}/emergency-contacts`,
      query
    })
  }

  const updateEmergenyContact = async (id, payload) => {
    return await http.put({
      url: `${BASE_URL}/emergency-contacts/${id}`,
      body: JSON.stringify(payload)
    })
  }

  const deleteEmergenyContact = async id => {
    return await http.post({
      url: `${BASE_URL}/emergency-contacts/${id}`
    })
  }
  //#endregion

  //#region DOWNLOAD LIST API
  const setDownloadList = async payload => {
    return await http.post({
      url: `${BASE_URL}/download-lists`,
      body: JSON.stringify(payload)
    })
  }

  const getDownloadLists = async () => {
    return await http.get({
      url: `${BASE_URL}/download-lists`
    })
  }

  const deleteDownloadList = async id => {
    return await http.delete({
      url: `${BASE_URL}/download-lists/${id}`
    })
  }

  const deleteDownloadLists = async payload => {
    return await http.post({
      url: `${BASE_URL}/download-lists/bulk-delete`,
      body: JSON.stringify(payload)
    })
  }

  const clearDownloadLists = async () => {
    return await http.delete({
      url: `${BASE_URL}/download-lists/drop`
    })
  }
  //#endregion

  //#region DOWNLOAD LIST API
  const uploadScheduleTestCSV = async payload => {
    return await http.post({
      url: `${BASE_URL}/schedule-tests`,
      body: JSON.stringify(payload)
    })
  }

  const getScheduleTestLists = async () => {
    return await http.get({ url: `${BASE_URL}/schedule-tests` })
  }

  const deleteScheduleTestLists = async payload => {
    return await http.post({
      url: `${BASE_URL}/schedule-tests/bulk-delete`,
      body: JSON.stringify(payload)
    })
  }

  const clearScheduleTestLists = async () => {
    return await http.delete({ url: `${BASE_URL}/schedule-tests/drop` })
  }
  //#endregion

  return (
    <ApiContext.Provider
      value={{
        auth,
        login,
        enroll,
        verifyOTP,
        setSibling,
        resendCode,
        createAdmin,
        getAllAdmin,
        getSiblings,
        getApplicant,
        updateSibling,
        deleteSibling,
        getApplicants,
        updateApplicant,
        setDownloadList,
        deleteApplicant,
        deleteApplicants,
        getDownloadLists,
        setHealthMedical,
        getHealthMedical,
        setInitialEnquiry,
        getInitialEnquiry,
        setPreviousSchool,
        deleteDownloadList,
        clearDownloadLists,
        adminUpdateProfile,
        getPreviousSchools,
        setGuardianContact,
        getGuardianContact,
        setEmergenyContact,
        getEmergenyContact,
        updateHealthMedical,
        deleteDownloadLists,
        deleteHealthMedical,
        setStudentBackground,
        getScheduleTestLists,
        getStudentBackground,
        updatePreviousSchool,
        deletePreviousSchool,
        updateInitialEnquiry,
        deleteInitialEnquiry,
        uploadScheduleTestCSV,
        updateGuardianContact,
        deleteGuardianContact,
        updateEmergenyContact,
        deleteEmergenyContact,
        clearScheduleTestLists,
        applicantUpdateProfile,
        deleteScheduleTestLists,
        getAllApplicantsDetails,
        updateStudentBackground,
        deleteStudentBackground
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
