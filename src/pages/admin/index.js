import { lazy } from 'react'

const Result = lazy(() => import('./result'))
const Dashboard = lazy(() => import('./dashboard'))
const DownloadList = lazy(() => import('./download-list'))
const ScheduleTest = lazy(() => import('./schedule-test'))

const Admin = {
  Result,
  Dashboard,
  DownloadList,
  ScheduleTest
}

export default Admin
