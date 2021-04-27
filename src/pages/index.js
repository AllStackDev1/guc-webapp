import { lazy } from 'react'

const Logout = lazy(() => import('./logout'))
const NotFound = lazy(() => import('./404'))
const Login = lazy(() => import('./login'))
const Auth = lazy(() => import('./auth'))

const Pages = {
  Auth,
  Login,
  Logout,
  NotFound
}

export default Pages
