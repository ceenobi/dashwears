import React, { useRef, useState } from 'react'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  ModalHeader,
  Input,
  IconButton,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate} from 'react-router-dom'

export default function Search() {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()

  const searchItem = () => {
    if (keyword.trim()) {
      navigate(`/products/shop/search/${keyword}`)
      onClose()
    } else {
      navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchItem()
    }
  }

  return (
    <>
      <Icon as={FaSearch} w={5} h={5} onClick={onOpen} cursor='pointer' />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='full'
        initialFocusRef={initialRef}
        motionPreset='slideInBottom'
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box maxW='container.lg' m='auto'>
              {' '}
              <Box>
                <InputGroup size='md'>
                  <InputLeftElement>
                    <IconButton
                      variant='unstyled'
                      aria-label='Search database'
                      icon={<FaSearch />}
                      type='submit'
                      fontSize='20px'
                      onClick={searchItem}
                    />
                  </InputLeftElement>
                  <Input
                    placeholder='What are you looking for?'
                    variant='flushed'
                    ref={initialRef}
                    value={keyword}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setKeyword(e.target.value)}
                    size='md'
                    mx={30}
                  />
                </InputGroup>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
