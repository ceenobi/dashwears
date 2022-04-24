import React from 'react'
import {
  Box,
  Container,
  Icon,
  Stack,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { ImFacebook, ImInstagram, ImTwitter, ImYoutube } from 'react-icons/im'
import { BiDevices } from 'react-icons/bi'

export default function SocialMedia() {
  return (
    <Box mt={1} py={4}>
      <Container maxW='container.lg'>
        <Stack
          direction={['column', 'column', 'row']}
          justify={['space-between']}
          align='center'
        >
          <Stack
            direction={['column', 'row']}
            spacing='20px'
            mb={4}
            align='center'
          >
            <Text textStyle='y' textTransform='uppercase' textAlign='center'>
              Connect with us
            </Text>
            <Stack direction='row' spacing='10px'>
              <LinkBox>
                <LinkOverlay
                  href='https://www.facebook.com'
                  target='_blank'
                  _hover={{ color: 'blue.600' }}
                >
                  <Icon as={ImFacebook} w={6} />
                </LinkOverlay>
              </LinkBox>
              <LinkBox>
                <LinkOverlay
                  href='https://www.instagram.com'
                  _hover={{ color: 'red.500' }}
                >
                  {' '}
                  <Icon as={ImInstagram} w={6} />
                </LinkOverlay>
              </LinkBox>
              <LinkBox>
                <LinkOverlay
                  href='https://www.twitter.com'
                  target='_blank'
                  _hover={{ color: 'blue.300' }}
                >
                  {' '}
                  <Icon as={ImTwitter} w={6} />
                </LinkOverlay>
              </LinkBox>
              <LinkBox>
                <LinkOverlay
                  href='https://www.youtube.com'
                  target='_blank'
                  _hover={{ color: 'red.500' }}
                >
                  {' '}
                  <Icon as={ImYoutube} w={6} />
                </LinkOverlay>
              </LinkBox>
            </Stack>
          </Stack>
          <Stack direction='row' spacing='2px' align='center'>
            <Icon as={BiDevices} w={10} h={8} />
            <Text textStyle='y' textTransform='uppercase' textAlign='center'>
              Download our app for mobile devices
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
