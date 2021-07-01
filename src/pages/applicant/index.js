import { lazy } from 'react'

import Authenticated from './authenticated'

const Start = lazy(() => import('./start'))
const Signup = lazy(() => import('./signup'))
const Login = lazy(() => import('./login'))
const OTPverify = lazy(() => import('./otp-verification'))

const Applicant = {
  Start,
  Signup,
  Login,
  OTPverify,
  Authenticated
}

export default Applicant
