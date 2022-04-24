import React from 'react'
import { Text } from '@chakra-ui/react'

export default function SubHeading({ title, color }) {
  return (
    <Text textStyle={'h1'} fontSize='xl' mb={1} color={color}>
      {title}
    </Text>
  )
}
