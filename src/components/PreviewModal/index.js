/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

import FilePreview from 'components/FilePreview'

const PreviewModal = ({ data, src, isOpen, onClose }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={{ base: 80, lg: 130 }}>
            <FilePreview fileData={data} src={src} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

PreviewModal.propTypes = {
  data: PropTypes.any,
  src: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default PreviewModal
