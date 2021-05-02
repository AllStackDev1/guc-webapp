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

const PreviewModal = ({ data, isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={{ base: 80, lg: 130 }}>
            <FilePreview fileData={data} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

PreviewModal.propTypes = {
  data: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default PreviewModal
