/* eslint-disable no-console */
import { useEffect, useState, useRef } from 'react'
import { fileToBase64 } from 'utils/mics'

const useFileReader = fileData => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(undefined)

  const ref = useRef()

  useEffect(() => {
    const fetchFile = async file => {
      try {
        setLoading(true)
        const res = await fileToBase64(file)
        setFile(res)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    if (fileData && fileData !== ref.current) {
      ref.current = fileData
      fetchFile(fileData)
    }
  }, [fileData])

  return { loading, file }
}

export default useFileReader
