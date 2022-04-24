import React, { useEffect } from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Container,
  Flex,
  Icon,
  Stack,
  Spacer,
  Text,
  Badge,
} from '@chakra-ui/react'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../../Redux/Actions/UserActions'
import OrderHistory from '../OrderPayment/OrderHistory'
import { orderListHistory } from '../../../Redux/Actions/OrderActions'

import SubHeading from '../../SubComponents/SubHeading'
import { CgProfile } from 'react-icons/cg'
import { GiNotebook } from 'react-icons/gi'
import { HiHome } from 'react-icons/hi'
import Breadcrum from '../../SubComponents/Breadcrumb'
import ProfileUpdate from './ProfileUpdate'

export default function Profile() {
  window.scrollTo(0, 0)

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const orderHistory = useSelector((state) => state.orderHistory)
  const { loading, error, orders } = orderHistory

  useEffect(() => {
    dispatch(getUserDetails('profile'))
    dispatch(orderListHistory())
  }, [dispatch])

  return (
    <Box mt={1} py={4}>
      <Container maxW='container.xl'>
        <Flex justify='center'>
          <SubHeading title='Admin page' />
        </Flex>
        <Stack direction={['column', 'row']} spacing={['4px', '20px']} mt={4}>
          <Box display='flex' justify='start'>
            <Text textStyle='p'>Dashboard Panel</Text>
          </Box>
          <Breadcrum home={<HiHome />} page2='Dashboard' />
          <Spacer />
          <SubHeading title={userInfo.name} />
          <Box as='span'>Joined {moment(userInfo.createdAt).format('LL')}</Box>
        </Stack>
        <Tabs mt={8}>
          <TabList>
            <Tab>
              <Icon as={CgProfile} mx={2} />
              Profile settings
            </Tab>
            <Tab>
              <Icon as={GiNotebook} mx={2} />
              Orders:
              <Box as='span' mx={2}>
                {' '}
                <Badge variant='solid' colorScheme='teal'>
                  {orders ? orders.length : 0}
                </Badge>
              </Box>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProfileUpdate />
            </TabPanel>
            <TabPanel>
              <OrderHistory orders={orders} loading={loading} error={error} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  )
}
