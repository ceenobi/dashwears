import React from 'react'
import { Box, Container, Stack, Image, Text, Button } from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import Emptycart from '../../../assets/shopping-cart-svgrepo-com.svg'

export default function EmptyCart() {
  return (
    <Box mt={[3,10]} py={5} h='100vh'>
      <Container maxW='container.lg'>
        <Stack direction={['column', 'column', 'row']} spacing='24px' mt={['null', 8]} mb={4}>
          <Image src={Emptycart} boxSize={['200px','null','200px', '300px']} alt='nocart' />
          <Box mt={6}> 
            <Text textStyle='h1'>
              I'm sorry human <br />
              I'm afraid there's nothing here.
            </Text>
            <Text textStyle='p'>
              It appears that your shopping cart is empty. We're eagerly
              awaiting your money. Remember: the more you spend, the quicker we
              all get to buy Lamborghinis.
            </Text>
            <Button as={Link} to='/products/shop' mt={4} bg='paint.300'>SHOP NOW</Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
