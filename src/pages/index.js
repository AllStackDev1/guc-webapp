import { lazy } from 'react'

const Login = lazy(() => import('./login'))
const NotFound = lazy(() => import('./404'))
const Logout = lazy(() => import('./logout'))
const Application = lazy(() => import('./application'))

const Pages = {
  Login,
  Logout,
  NotFound,
  Application
}

export default Pages
