import React from 'react'
import PropTypes from 'prop-types'
import { Image, Box } from '@chakra-ui/react'
import SmallSpinner from 'components/Loading/Small'

import useFileReader from 'hooks/useFileReader'

const FilePreview = ({ src, alt, fileData }) => {
  const { loading, file } = useFileReader(fileData)

  if (!fileData && !src) return null

  return loading ? (
    <SmallSpinner />
  ) : (
    <>
      {fileData?.type?.match('image.*') ? (
        <Image
          w='60%'
          h='60%'
          mx='auto'
          src={file || src}
          alt={(fileData && fileData.name) || alt}
        />
      ) : (
        <Box
          as='iframe'
          w='100%'
          h={130}
          src={file || src}
          title={(fileData && fileData.name) || alt}
        />
      )}
    </>
  )
}

FilePreview.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fileData: PropTypes.object
}

export default FilePreview
