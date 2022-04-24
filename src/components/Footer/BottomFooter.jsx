import React from 'react'
import {Box, Container, Text, HStack} from '@chakra-ui/react'

export default function BottomFooter({color,bg}) {
  return (
    <Box mt={1} py={5} bg='paint.500' color='paint.600'>
      <Container maxW='container.lg' py={4}>
        <Text textStyle='y' textTransform='uppercase' textAlign='center'>
          <small>
            POWERED BY DASH NET-A-BALLER GROUP - COPYRIGHT © 2000-2022 DASH
            NET-A-BALLER GROUP S.P.A. - ALL RIGHTS RESERVED - SIAD LICENCE #
            420/I/112
          </small>
        </Text>
        <HStack spacing='16px' justify='center'>
          <Text textStyle='y'>
            {' '}
            <small>LEGAL AREA</small>
          </Text>
          <Text>
            {' '}
            <small>/</small>
          </Text>
          <Text textStyle='y'>
            {' '}
            <small>PRIVACY POLICY</small>
          </Text>
        </HStack>
      </Container>
    </Box>
  )
}
