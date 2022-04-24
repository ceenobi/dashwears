import React from 'react'
import {
  Box,
  Grid,
  Image,
  VStack,
  HStack,
  Button,
  Text,
  Flex,
  Container,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { gallery } from '../../Helpers'
import SubHeading from '../../SubComponents/SubHeading'

export default function ProductA({color}) {
  return (
    <Box mt={20}>
      <Container maxW='container.lg'>
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(3, 1fr)',
            base: 'repeat(1, 1fr)',
          }}
          gap={0}
          mt={20}
        >
          <Box mb={4}>
            <Image src={gallery[1]} alt='bag' boxSize='400px' />
            <VStack alignItems='center' spacing={4} my={6}>
              <SubHeading title='Sale: up to 50% off' />
              <Text textStyle='y'>Don't miss out!</Text>
              <Button
                as={Link}
                to='/the'
                variant='unstyled with-shadow'
                size='sm'
                textDecoration='underline'
              >
                Shop now
              </Button>
            </VStack>
          </Box>
          <Flex
            flexDirection='column'
            bg={'paint.300'}
            height={{ base: '350px', md: '400px' }}
            w={{ base: '100%', md: '200px', lg: '300px' }}
            transform={{ translateY: '20deg' }}
            justifyContent='center'
            mx='auto'
            style={{
              transform: 'translateY(-30px)',
              display: { sm: 'none', md: 'block' },
            }}
          >
            <VStack alignItems='center' spacing='10px' my={2} color={color}>
              <Text
                textStyle='y'
                color='paint.100'
                textTransform='uppercase'
                mt={4}
                mb={4}
              >
                Designers
              </Text>
              <Text textStyle='p' as={Link} to='/'>
                Dsquared2
              </Text>
              <Text textStyle='p' as={Link} to='/'>
                Gucci
              </Text>
              <Text textStyle='p' as={Link} to='/'>
                Prada
              </Text>
              <Text textStyle='p' as={Link} to='/'>
                Givenchy
              </Text>
              <Text textStyle='p' as={Link} to='/'>
                Patek
              </Text>
              <Text textStyle='p' as={Link} to='/'>
                Balenciaga
              </Text>
            </VStack>
            <Flex justifyContent='center'>
              <Button
                variant='unstyled with-shadow'
                size='sm'
                textDecoration='underline'
                as={Link}
                to='/the'
                mt={6}
                color={'paint.100'}
              >
                View all
              </Button>
            </Flex>
          </Flex>
          <Box>
            <Image src={gallery[2]} alt='shirt' boxSize='400px' />
            <VStack alignItems='center' spacing={4} my={6}>
              <SubHeading title='Less is more' />
              <Text textStyle='y' textAlign='center'>
                Sophisticated style is all about simplicity
              </Text>
              <HStack spacing={4}>
                <Button
                  as={Link}
                  to='/the'
                  variant='unstyled with-shadow'
                  size='sm'
                  textDecoration='underline'
                >
                  Get inspired
                </Button>

                <Button
                  as={Link}
                  to='/the'
                  variant='unstyled with-shadow'
                  size='sm'
                  textDecoration='underline'
                >
                  Shop now
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
