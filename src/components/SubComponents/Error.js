import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react'

export default function Message({ status, msg, error}) {
  return (
    <Alert status={status} variant='subtle'>
      <AlertIcon />
      <AlertTitle mr={2}>{error}</AlertTitle>
      <AlertDescription>{msg}</AlertDescription>
      <CloseButton position='absolute' right='8px' top='8px' />
    </Alert>
  )
}
