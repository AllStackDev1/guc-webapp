import { lazy } from 'react'

const Payment = lazy(() => import('./payment'))
const InitialEnquiry = lazy(() => import('./initial-enquiry'))
const PreviousSchool = lazy(() => import('./previous-schools'))
const StudentBackground = lazy(() => import('./student-backgroud'))
const Siblings = lazy(() => import('./siblings'))
const HealthMedical = lazy(() => import('./health-and-medical'))
const GuardianInfo = lazy(() => import('./guardian-info'))
const EmergencyContact = lazy(() => import('./emergency-contact'))
const Success = lazy(() => import('./success'))
const ExamScheduled = lazy(() => import('./exam-scheduled'))
const Result = lazy(() => import('./result'))
const AdmissionStatus = lazy(() => import('./admission-status'))

const Authenticated = {
  Payment,
  InitialEnquiry,
  PreviousSchool,
  StudentBackground,
  Siblings,
  HealthMedical,
  GuardianInfo,
  EmergencyContact,
  Success,
  ExamScheduled,
  Result,
  AdmissionStatus
}

export default Authenticated
