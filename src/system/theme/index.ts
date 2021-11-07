import { createTheme } from '@shopify/restyle'

const palette = {
  red: '#EF010B',
  punch: '#DD4B39',
  white: '#f5f5f5',
  saffron: '#F8C330',
  chambray: '#3B5998',
  silver: '#bbb',
  mineshaft: '#222',
  'coolGray-900': '#111827',
  'coolGray-500': '#4B5563',
  'coolGray-200': '#E5E7EB',
}

const appTheme = createTheme({
  colors: {
    facebook: palette.chambray,
    primary: palette.red,
    googlePlus: palette.punch,
    primaryBackground: palette.white,
    secondaryBackground: palette.silver,
    primaryText: palette['coolGray-900'],
    secondaryText: palette.mineshaft,
    primaryTransparent: `${palette.red}3b`,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
})

export type Theme = typeof appTheme

export default appTheme
