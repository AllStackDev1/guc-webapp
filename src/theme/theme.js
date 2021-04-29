import { extendTheme } from '@chakra-ui/react'

const breakpoints = ['22.5em', '30em', '48em', '62em', '80em', '90em']
// aliases
breakpoints.xs = breakpoints[0] // 360
breakpoints.sm = breakpoints[1] // 480
breakpoints.md = breakpoints[2] // 768
breakpoints.lg = breakpoints[3] // 992
breakpoints.xl = breakpoints[4] // 1280
breakpoints.xxl = breakpoints[5] // 1440

export const theme = extendTheme({
  styles: {
    global: () => ({
      'html, body': {
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 400
      },
      body: {
        lineHeight: 'tall',
        color: 'gray.700',
        fontSize: 'md',
        fontWeight: 400
      }
    })
  },
  ...breakpoints,
  fonts: {
    heading: '"TRYVesterbro", sans-serif',
    body: '"Montserrat", sans-serif',
    quote: '"PlayfairDisplay", sans-serif'
  },
  colors: {
    gcu: {
      100: '#C82B38',
      200: '#2E3748',
      300: '#9B0D39',
      350: 'rgba(200, 43, 56, 0.03)',
      400: '#049F9B',
      450: 'rgba(0, 0, 0, 0.5)',
      500: '#6A7986',
      600: '#F2F2F2'
    },
    gcuButton: {
      500: '#C82B38',
      600: '#C82B38'
    },
    gcuLG: {
      100: 'linear-gradient(91deg, rgba(0, 0, 0, 0.78) 10.74%, rgba(0, 0, 0, 0) 116.89%)'
    }
  },
  space: {
    14: '3.5rem',
    60: '15rem',
    66: '17.5rem',
    70: '18rem',
    80: '20rem',
    82: '21rem',
    85: '23rem',
    90: '25rem',
    95: '26rem',
    108: '27rem',
    110: '30rem',
    115: '32rem',
    120: '35rem',
    121: '36rem',
    122: '37rem',
    123: '40rem',
    124: '42rem',
    125: '45rem',
    127: '48rem',
    129: '50rem',
    130: '55rem',
    135: '60rem',
    137: '65rem',
    140: '70rem',
    143: '72rem',
    145: '76rem',
    150: '80rem',
    155: '90rem'
  },
  sizes: {
    14: '3.5rem',
    60: '15rem',
    66: '17.5rem',
    70: '18rem',
    80: '20rem',
    82: '21rem',
    85: '23rem',
    90: '25rem',
    95: '26rem',
    108: '27rem',
    109: '28rem',
    110: '30rem',
    115: '32rem',
    120: '35rem',
    122: '37rem',
    123: '40rem',
    124: '42rem',
    124.5: '43rem',
    125: '45rem',
    127: '48rem',
    129: '50rem',
    129.5: '50.25rem',
    130: '55rem',
    135: '60rem',
    137: '65rem',
    138: '65.438rem',
    140: '70rem',
    143: '72rem',
    145: '76rem',
    150: '80rem',
    155: '90rem'
  }
})
