/* eslint-disable no-console */
/**
 * Method to return backend services urls based on the environment
 * */

const configs = () => {
  return {
    BASE_URL: 'https://guc-webserver-test.herokuapp.com/api/v1',
    // process.env.REACT_APP_BASE_URL,
    PAYSTACK_PUBLIC_KEY: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY
  }
}

export default configs
