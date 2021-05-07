import { lazy } from 'react'

const Dashboard = lazy(() => import('./dashboard'))
const DownloadList = lazy(() => import('./download-list'))

const Admin = {
  Dashboard,
  DownloadList
}

export default Admin
