import React from 'react'
import {Flex, Spinner} from '@chakra-ui/react'

export default function Loading() {
  return (
    <Flex justifyContent='center' mt={20}>
      <Spinner color='red.500' size='lg' />
    </Flex>
  )
}
