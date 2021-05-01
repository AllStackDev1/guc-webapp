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
    passportPhoto: fileValidation(2, ['image/jpg', 'image/jpeg', 'image/png'])
  }),
  studentInfo: yup.object().shape({
    firstName: yup.string().required('This field is required!'),
    surName: yup.string().required('This field is required!'),
    middleName: yup.string().required('This field is required!'),
    preferedName: yup.string().required('This field is required!'),
    dob: yup.string().required('This field is required!'),
    gender: yup.string().required('This field is required!'),
    countryOfBirth: yup.string().required('This field is required!'),
    nationality: yup.string().required('This field is required!'),
    dualNationality: yup.string(),
    firstLanguage: yup.string().required('This field is required!'),
    homeLanguage: yup.string().required('This field is required!'),
    religion: yup.string().required('This field is required!')
  })
})
