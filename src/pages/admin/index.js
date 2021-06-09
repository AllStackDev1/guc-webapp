import { lazy } from 'react'

const Dashboard = lazy(() => import('./dashboard'))
const DownloadList = lazy(() => import('./download-list'))
const ScheduleTest = lazy(() => import('./schedule-test'))
const ResultList = lazy(() => import('./result-list'))
const Incomplete = lazy(() => import('./incomplete'))

const Admin = {
  Dashboard,
  DownloadList,
  ScheduleTest,
  ResultList,
  Incomplete
}

export default Admin
