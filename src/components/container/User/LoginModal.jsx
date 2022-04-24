import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from '@chakra-ui/react'
import { BsFillLockFill } from 'react-icons/bs'
import SignIn from './SignIn'

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button
        leftIcon={<BsFillLockFill />}
        bg='none'
        size='sm'
        onClick={onOpen}
      >
        Login
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='slideInBottom'
        size='sm'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <SignIn onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
