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
