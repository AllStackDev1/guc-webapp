import { lazy } from 'react'

const Dashboard = lazy(() => import('./dashboard'))

const Admin = {
  Dashboard
}

export default Admin
