/* eslint-disable no-console */
/**
 * Method to return backend services urls based on the environment
 * */

const configs = () => {
  // Get REACT ENV
  const ENV = process.env.REACT_APP_ENV

  return {
    BASE_URL: process.env[`REACT_APP_${ENV}_BASE_URL`]
  }
}

export default configs
