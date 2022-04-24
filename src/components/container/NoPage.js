import React from 'react'
import {Box, Container, Text, Flex} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import SubHeading from '../SubComponents/SubHeading'

export default function NoPage() {
  const navigate = useNavigate()
  return (
    <Box mt={1} py={5}>
      <Container maxW='container.lg'>
        <Flex justifyContent='center' mt={4}>
          <SubHeading title='Page not found' />
        </Flex>
        <Flex justify='center' mt={4} py={5}>
          <Text textStyle='p' align='center'>
            Ooops! The page you are looking for does not exist.
          </Text>
        </Flex>
        <Flex justify='center' mt={4} py={5}>
          <Text textStyle='p'>
            Pls <Box as='span' color='paint.300' onClick={()=> navigate('/')} cursor='pointer'>Go</Box>&nbsp;home
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
