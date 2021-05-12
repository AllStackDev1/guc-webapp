import React from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { Flex, Icon, Input, Text } from '@chakra-ui/react'
import { IoMdCloudUpload } from 'react-icons/io'
import { FiFileText } from 'react-icons/fi'

const CustomDropzone = ({ value, onChange }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
    multiple: false,
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(async file => onChange(file))
    }
  })

  return (
    <Flex
      h={48}
      my={5}
      w='full'
      rounded='md'
      border='2px dashed rgba(0, 0, 0, 0.4)'
      {...getRootProps({ className: 'dropzone' })}
    >
      <Input {...getInputProps()} />
      <Flex w='full' direction='column' align='center' justify='center'>
        {value ? (
          <Flex>
            <Icon as={FiFileText} boxSize={5} />
            {value.name}
          </Flex>
        ) : (
          <>
            <Icon as={IoMdCloudUpload} boxSize={10} />
            <Text fontSize='sm'>Select or Drag a file to upload</Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}

CustomDropzone.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
}

export default CustomDropzone
