import _ from 'lodash'

export const fileToBase64 = async file => {
  return new Promise((resolve, reject) => {
    if (!file.type) return resolve(file)
    const reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = e => reject(e)
  })
}

export const getformattedDate = date => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const getSelectedArrItems = (arr, selection) => {
  const filteredArray = []
  selection.forEach(o => {
    const found = arr.find(a => a._id === o._id)
    if (found) {
      filteredArray.push(found)
    }
  })
  return filteredArray
}

export const objDiff = (object, base) => {
  function changes(object, base) {
    return _.transform(object, (result, value, key) => {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value
      }
    })
  }
  return changes(object, base)
}

export const getStep = key => {
  switch (key) {
    case 1:
      return 0
    case 2:
      return 8.33
    case 3:
      return 16.67
    case 4:
      return 25
    case 5:
      return 33.33
    case 6:
      return 41.67
    case 6.1:
      return 50
    case 6.2:
      return 50
    case 7:
      return 58.33
    case 8.1:
      return 66.67
    case 8.2:
      return 66.67
    case 9:
      return 75
    case 10:
      return 83.33
    case 11:
      return 91.67
    case 12:
      return 100
    case 13:
      return 100
    case 14:
      return 100
    case 15:
      return 100
    default:
      return null
  }
}

export const stepResolver = i => {
  switch (i) {
    case 6:
      return 'initial-enquiry'
    case 6.2:
      return 'previous-schools'
    case 7:
      return 'student-background'
    case 8.2:
      return 'siblings'
    case 9:
      return 'health-and-medical'
    case 10:
      return 'guardian-info'
    case 11:
      return 'emergency-contact'
    case 12:
      return 'success'
    case 13:
      return 'exam-scheduled'
    case 14:
      return 'result'
    case 15:
      return 'admission-status'
    default:
      break
  }
}

export const confirmAction = func => {
  if (window !== undefined && window?.confirm('Do you want to continue?')) {
    func()
  }
}
