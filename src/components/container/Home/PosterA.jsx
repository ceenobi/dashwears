import React from 'react'
import { Box, Grid, Image, VStack, Text, Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { gallery } from '../../Helpers'
import SubHeading from '../../SubComponents/SubHeading'

export default function PosterA() {
  return (
    <Box py={10} mt={'20'}>
      <Container maxW='container.xl' mt={10}>
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(3, 1fr)',
            base: 'repeat(1, 1fr)',
          }}
          gap={6}
        >
          <Box>
            <Image src={gallery[3]} alt='watch' w='100%' />
            <VStack alignItems='center' spacing={4} my={6}>
              <SubHeading title='Patek' />
              <Text textStyle='p' as={Link} to='/#' textAlign='center'>
                Don't miss our selection of watches
              </Text>
            </VStack>
          </Box>
          <Box>
            <Image src={gallery[4]} alt='bag' w='100%' />
            <VStack alignItems='center' spacing={4} my={6}>
              <SubHeading title='Gucci' />
              <Text textStyle='p' as={Link} to='/#'>
                Make your move!
              </Text>
            </VStack>
          </Box>
          <Box>
            <Image src={gallery[5]} alt='belt' w='100%' />
            <VStack alignItems='center' spacing={4} my={6}>
              <SubHeading title='Venzgh' />
              <Text textStyle='p' as={Link} to='/#'>
                Time to get smart
              </Text>
            </VStack>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
