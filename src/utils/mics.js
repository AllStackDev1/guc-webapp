export const fileToBase64 = async file => {
  return new Promise((resolve, reject) => {
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
