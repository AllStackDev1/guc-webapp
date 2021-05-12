import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

const CustomModal = ({
  title,
  footer,
  footerStyle,
  headerStyle,
  children,
  rounded,
  ...rest
}) => {
  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent {...{ rounded }}>
        <ModalHeader {...headerStyle}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter {...footerStyle}>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  )
}

CustomModal.propTypes = {
  footer: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  rounded: PropTypes.string.isRequired,
  footerStyle: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  headerStyle: PropTypes.any.isRequired
}

export default CustomModal
