import React from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  List,
  ListItem,
  ListIcon,
  useDisclosure,
  HStack,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../Redux/Actions/UserActions'

import { FaUserAlt } from 'react-icons/fa'
import {
  MdClose,
  MdExpandLess,
  MdExpandMore,
  MdArrowDropDown,
} from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { exploreRouterMenu } from '../Helpers'
import Login from '../container/User/LoginModal'

export default function DrawerBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const navigateToDiscover = (type, state) => {
    navigate(`/products/${type}`, { state })
    if (isOpen) onClose()
  }
  const logoutHandler = () => {
    dispatch(logout())
  }

  const userAdmin = () => {
    navigate('/profile')
    if (isOpen) onClose()
  }
  // const wishListHandler = () => {
  //   navigate('/customer/wishlist')
  //   if (isOpen) onClose()
  // }

  return (
    <>
      <Icon
        as={GiHamburgerMenu}
        w={5}
        h={5}
        onClick={isOpen ? onClose : onOpen}
        variant='unstyled'
        display={{ md: 'none' }}
      />

      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size='full'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth='1px'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            {userInfo ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<MdArrowDropDown />}
                  leftIcon={<FaUserAlt />}
                  variant='unstyled'
                >
                  Hi,&nbsp;{userInfo.name}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={userAdmin}>Profile</MenuItem>
                  {/* <MenuItem onClick={wishListHandler}>Saved Items</MenuItem> */}
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <HStack alignItems='center'>
                <Login />
              </HStack>
            )}
            <Icon as={MdClose} w={5} h={5} onClick={onClose} />
          </DrawerHeader>
          <DrawerBody p={'0'}>
            <Accordion allowMultiple>
              {exploreRouterMenu.map((menu) => (
                <AccordionItem key={menu.sectionId}>
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <Text m={0} fontWeight={'bold'}>
                          {menu.sectionLabel}
                        </Text>
                        {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                      </AccordionButton>
                      <AccordionPanel p={0}>
                        <List>
                          {menu.sectionItems.map((menuItem) => {
                            const { label, path, filterParams, Icon } = menuItem
                            return (
                              <ListItem
                                as={Button}
                                variant={'ghost'}
                                w={'full'}
                                borderRadius={'0'}
                                display={'flex'}
                                justifyContent={'start'}
                                p={3}
                                key={label}
                                onClick={() =>
                                  navigateToDiscover(path, filterParams)
                                }
                              >
                                <ListIcon
                                  as={() =>
                                    Icon({
                                      size: '1.25em',
                                      style: { marginRight: '0.75rem' },
                                    })
                                  }
                                />
                                <Text mt={-1}>{label}</Text>
                              </ListItem>
                            )
                          })}
                        </List>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
            <Text textStyle='y' p={3}>
              Free standard shipping on orders over 1000
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
