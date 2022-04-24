import { extendTheme } from '@chakra-ui/react'
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const customTheme = extendTheme(
  {
    fonts: {
      heading: 'Belgrano, serif',
      body: 'Acme, sans-serif',
    },
    colors: {
      paint: {
        100: '#1A365D',
        200: '#F791518',
        300: '#F8B551',
        400: '#FFFBF4',
        500: '#0C0C0C',
        600: '#fff',
        700: '#2C5282',
      },
    },
    footer: {
      _hover: {
        textDecoration: 'none',
        color: 'paint.300',
      },
    },

    styles: {
      global: {
        a: {
          textDecoration: 'none',
          cursor: 'pointer',
          _hover: {
            textDecoration: 'none',
            color: 'paint.300',
          },
        },
        _activeLink: {
          color: 'paint.300',
          outline: 'none',
          cursor: 'pointer',
          _hover: {
            color: 'paint.300',
          },
        },
        // _hover: {
        //   textDecoration: 'none',
        //   color: 'paint.300',
        // },
      },
    },
    textStyles: {
      h1: {
        textTransform: 'uppercase',
        fontSize: ['24px', '30px', '40px', null, '48px'],
        letterSpacing: '0.04em',
      },
      p: {
        letterSpacing: '0.04em',
        fontSize: '16px',
        fontFamily: 'Acme',
      },
      y: {
        letterSpacing: '0.04em',
        fontSize: '14px',
        fontFamily: 'Acme',
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textDecoration: 'none',
          borderRadius: 'base',
          _hover: {
            textDecoration: 'underline',
          },
          padding: 3,
        },
        sizes: {
          xl: {
            h: '56px',
            fontSize: 'lg',
            px: '32px',
          },
        },
        variants: {
          'with-shadow': {
            bg: 'paint.300',
            textDecoration: 'none',
            boxShadow: 'paint.100',
            _hover: {
              bg: 'paint.300',
            },
          },
        },
      },
      Card: {
        baseStyle: {
          display: 'flex',
          flexDirection: 'column',
          background: 'paint.600',
          alignItems: 'center',
          gap: 6,
        },
        variants: {
          rounded: {
            padding: 4,
            borderRadius: 'xl',
            boxShadow: 'xl',
          },
          smooth: {
            padding: 6,
            borderRadius: 'base',
            boxShadow: 'md',
          },
        },
        defaultProps: {
          variant: 'smooth',
        },
      },
    },
  },
  { config }
)

export default customTheme
