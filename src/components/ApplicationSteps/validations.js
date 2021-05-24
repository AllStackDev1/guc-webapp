import * as yup from 'yup'

const fileValidation = (size, type) => {
  return yup
    .mixed()
    .required('No file selected!')
    .test(
      'fileSize',
      `File Size is too large <= ${size}mb allowed!`,
      value => value && value.size <= 1024 * 1024 * size
    )
    .test(
      'fileType',
      'Unsupported File Format',
      value => value && type.includes(value.type)
    )
}

export const StepSixSchema = yup.object().shape({
  documents: yup.object().shape({
    birthCertOrPassport: fileValidation(2, [
      'application/pdf',
      'image/jpg',
      'image/jpeg',
      'image/png'
    ]),
    schoolReport: fileValidation(2, [
      'application/pdf',
      'image/jpg',
      'image/jpeg',
      'image/png'
    ]),
    passportPhoto: fileValidation(2, [
      'application/pdf',
      'image/jpg',
      'image/jpeg',
      'image/png'
    ])
  }),
  studentInfo: yup.object().shape({
    firstName: yup.string().required('This field is required!'),
    familyName: yup.string().required('This field is required!'),
    middleName: yup.string().required('This field is required!'),
    preferedName: yup.string().required('This field is required!'),
    dob: yup.string().required('This field is required!'),
    gender: yup.string().required('This field is required!'),
    countryOfBirth: yup.string().required('This field is required!'),
    nationality: yup.string().required('This field is required!'),
    dualNationality: yup.string(),
    firstLanguage: yup.string().required('This field is required!'),
    homeLanguage: yup.string().required('This field is required!'),
    religion: yup.string()
  })
})

export const StepNineSchema = yup.object().shape({
  asthma: yup.bool(),
  allergies: yup.bool(),
  diabetes: yup.bool(),
  epilepsy: yup.bool(),
  notApplicable: yup.bool(),
  other: yup.bool(),
  requireMedicalPlan: yup.string(),
  takeRegularMedication: yup.string(),
  dietaryRestriction: yup.string(),
  physicalRestriction: yup.string(),
  otherMedicalIssues: yup.string(),
  isImmunised: yup.string(),
  immuneFile: yup
    .mixed()
    .test('fileSize', `File Size is too large <= ${2}mb allowed!`, value =>
      value ? value.size <= 1024 * 1024 * 2 : true
    )
    .test('fileType', 'Unsupported File Format', value =>
      value
        ? ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'].includes(
            value.type
          )
        : true
    )
})

export const StepTenSchema = yup.object().shape({
  state: yup.string().required('This field is required!'),
  title: yup.string().required('This field is required!'),
  email: yup.string().required('This field is required!'),
  familyName: yup.string().required('This field is required!'),
  firstName: yup.string().required('This field is required!'),
  relation: yup.string().required('This field is required!'),
  occupation: yup.string().required('This field is required!'),
  addressOne: yup.string().required('This field is required!'),
  addressTwo: yup.string(),
  homeNumber: yup.string(),
  workNumber: yup.string(),
  permissions: yup.string().required('This field is required!'),
  hearAboutUs: yup.string().required('This field is required!'),
  mobileNumber: yup.string().required('This field is required!'),
  homeLanguage: yup.string().required('This field is required!'),
  studentAddress: yup.string().required('This field is required!')
})

export const StepElevenSchema = yup.object().shape({
  name: yup.string().required('This field is required!'),
  relationship: yup.string().required('This field is required!'),
  contactNumber: yup.string().required('This field is required!')
})
