import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Flex,
  Text,
  HStack,
  Image,
  Stack,
  Button,
} from '@chakra-ui/react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SubHeading from '../../SubComponents/SubHeading'
// import { MdDelete } from 'react-icons/md'
// import { getWishListId } from '../../../Redux/Actions/ProductActions'

export default function SavedProduct() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const saveList = useSelector((state) => state.saveList)
  const { saveItems } = saveList

  useEffect(() => {
    if (id) {
      // dispatch(getWishListId(id))
    }
  }, [dispatch, id])

  return (
    <Box mt={1} py={4}>
      <Container maxW='container.lg'>
        <Flex justifyContent={'center'} mt={4}>
          <SubHeading title='Your Saved Items' />
        </Flex>
        <Box>
          {saveItems.length === 0 ? (
            <Text>no saved item</Text>
          ) : (
            <>
              <Flex justifyContent={['space-between', 'center']} mt={2} mb={4}>
                <SubHeading title='Wishlist' />
                <Text textStyle={'p'} display={['block', 'none']}>
                  ITEMS: {saveItems.length}
                </Text>
              </Flex>
              <Box mt={4} mb={4}>
                <Text textStyle={'p'} display={['none', 'block']}>
                  ITEMS ADDED TO YOUR WISHLIST ({saveItems.length})
                </Text>
              </Box>
              {saveItems.map((item) => (
                <Flex
                  flexDirection={{ base: 'column', md: 'row' }}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  key={item.slug}
                >
                  <HStack spacing='5px' w={['full', '500px']} key={item._id}>
                    <Image
                      src={item.image[0]}
                      boxSize='150px'
                      objectFit={'cover'}
                      alt={item.name}
                    />

                    <Box>
                      <Text textStyle={'p'}>{item.name}</Text>
                      <Text textStyle={'p'}>{item.slug}</Text>
                    </Box>
                  </HStack>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    w={['250px', '300px']}
                  >
                    {' '}
                    <Stack direction='row' spacing='24px'>
                      <Button
                        size='sm'
                        as={Link}
                        to={`/products/${item.product}`}
                      >
                        Buy Now
                      </Button>
                    </Stack>
                  </Box>
                </Flex>
              ))}
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}
