import React from 'react'
import {
  Flex,
  Box,
  Spacer,
  HStack,
  Text,
  Icon,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center
} from '@chakra-ui/react'
import { FaShoppingCart} from 'react-icons/fa'
import { MdDarkMode, MdLightMode, MdArrowDropDown } from 'react-icons/md'
import { BsFillUnlockFill, BsFillPencilFill } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import DrawerBar from './Drawer'
import { useSelector, useDispatch } from 'react-redux'
import Login from '../container/User/LoginModal'
import { logout } from '../../Redux/Actions/UserActions'
import Search from './Search'

const Navbar = ({ bg, color, colorMode, toggleColorMode }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const logoutHandler = () => {
    dispatch(logout())
  }

  const userAdmin = () => navigate(`/profile`)
  // const wishListHandler = () => navigate(`/wishlist`)

  return (
    <Box
      bg={bg}
      color={color}
      position='sticky'
      top={0}
      zIndex={2}
      borderBottomWidth='1px'
    >
      <Box
        borderBottomWidth='1px'
        px='4'
        display={{ base: 'none', md: 'block' }}
      >
        <Flex alignItems='center' maxW='container.lg' m='auto'>
          <HStack spacing={1}>
            <Button bg='none' size='sm' as={NavLink} to='/customercare'>
              Customer Care
            </Button>
            <Button bg='none' size='sm' as={NavLink} to='/storelocation'>
              Store Locator
            </Button>
          </HStack>
          <Spacer />
          <HStack>
            <Text textStyle='y' textTransform='uppercase' textAlign='center'>
              Free Standard Shipping on orders over 1000
            </Text>
          </HStack>
          <Spacer />
          {userInfo ? (
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<BsFillUnlockFill />}
                rightIcon={<MdArrowDropDown />}
                variant='unstyled'
              >
                Hi, &nbsp;{userInfo.name}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={userAdmin}>Profile</MenuItem>
                {/* <MenuItem onClick={wishListHandler} disabled>
                  Saved Items
                </MenuItem> */}
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={1}>
              <Button
                leftIcon={<BsFillPencilFill />}
                bg='none'
                size='sm'
                as={NavLink}
                to='/the'
              >
                Blog
              </Button>
              <Login />
            </HStack>
          )}
        </Flex>
      </Box>
      <Box maxW='container.lg' m='auto' px={2}>
        <Flex alignItems='center' p={{ base: '1', md: '4', lg: '0' }}>
          <DrawerBar />
          <Spacer display={{ base: 'block', md: 'none' }} />
          <HStack
            alignItems='center'
            spacing={4}
            display={{ base: 'none', md: 'block' }}
          >
            <Text textStyle='p' as={NavLink} to='/products/shop'>
              Shop
            </Text>
            <Text textStyle='p' as={NavLink} to='/products/#'>
              Bag
            </Text>
            <Text textStyle='p' as={NavLink} to='/products/#'>
              Footwear
            </Text>
            <Text textStyle='p' as={NavLink} to='/products/#'>
              Watch
            </Text>
          </HStack>
          <Spacer />
          <Spacer display={{ base: 'none', sm: 'block' }} />
          <Center>
            <Flex>
              <Text
                textStyle='h1'
                as={NavLink}
                to='/'
                size='lg'
                color='paint.300'
              >
                DASH
              </Text>
            </Flex>
          </Center>
          <Spacer />
          <Spacer display={{ base: 'none', sm: 'block' }} />
          <HStack spacing={{ base: '2', md: '10' }}>
            <Search />
            <Flex>
              <Icon
                as={FaShoppingCart}
                w={5}
                h={5}
                onClick={() => navigate('/cart')}
                cursor='pointer'
              />
              <Badge variant='solid' colorScheme='teal'>
                {cartItems.length}
              </Badge>
            </Flex>
            <IconButton
              size={'sm'}
              icon={colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
              aria-label={'Change Color Theme'}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
}

export default Navbar
