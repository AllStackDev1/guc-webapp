import { lazy } from 'react'

const Dashboard = lazy(() => import('./dashboard'))
const DownloadList = lazy(() => import('./download-list'))
const ScheduleTest = lazy(() => import('./schedule-test'))
const ResultList = lazy(() => import('./result-list'))

const Admin = {
  Dashboard,
  DownloadList,
  ScheduleTest,
  ResultList
}

export default Admin
