/* eslint-disable no-console */
/**
 * Method to return backend services urls based on the environment
 * */

const configs = () => {
  return {
    BASE_URL: process.env.REACT_APP_BASE_URL,
    PAYSTACK_PUBLIC_KEY: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY
  }
}

export default configs
