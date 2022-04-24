import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRouter from './PrivateRouter'
import {
  Box,
  useColorMode,
  useColorModeValue,
  ScaleFade,
} from '@chakra-ui/react'
import routes from './components/Path'

import { Navbar, BottomFooter } from './components/Routes'
import Loading from './components/SubComponents/Spinner'

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('paint.500', 'paint.400')
  const bg = useColorModeValue('paint.400', 'paint.100')

  return (
    <Box bg={bg}>
      <Navbar
        color={color}
        bg={bg}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
      />

      <Routes>
        {routes.public.map((route, i) => {
          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Suspense fallback={<Loading />}>
                  <ScaleFade initialScale={0.9} in='true' key={route.path}>
                    <route.element />
                  </ScaleFade>
                </Suspense>
              }
            />
          )
        })}

        {routes.private.map((route, i) => {
          return (
            <Route
              key={i}
              exact
              path={route.path}
              element={
                <Suspense fallback={<Loading />}>
                  <PrivateRouter>
                    <ScaleFade initialScale={0.9} in='true' key={route.path}>
                      <route.element />
                    </ScaleFade>
                  </PrivateRouter>
                </Suspense>
              }
            />
          )
        })}
      </Routes>
      {/* <Footer /> */}
      <BottomFooter color={color} bg={bg} />
    </Box>
  )
}

export default App
