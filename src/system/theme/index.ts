import { createTheme } from '@shopify/restyle'

export const palette = {
  red: '#c73866',
  punch: '#DD4B39',
  white: '#fff',
  whiteDarker: '#f5f5f5',
  saffron: '#F8C330',
  chambray: '#3B5998',
  silver: '#a8a8a8',
  mineshaft: '#222',
  'coolGray-1000': '#0c111c',
  'coolGray-900': '#111827',
  'coolGray-500': '#4B5563',
  'coolGray-200': '#E5E7EB',
  leaf: '#52af89',
  transparent: 'transparent',
  black: '#080808',
}

export const lightTheme = createTheme({
  colors: {
    facebook: palette.chambray,
    primary: palette.red,
    googlePlus: palette.punch,
    primaryBackground: palette.white,
    secondaryBackground: palette.whiteDarker,
    primaryBackgroundOverlay: palette['coolGray-200'],
    primaryText: palette['coolGray-900'],
    secondaryText: palette.silver,
    primaryTransparent: `${palette.red}3b`,
    primaryBackgroundTransparent: `${palette.white}5b`,
    primaryTextTransparent: `${palette['coolGray-900']}6b`,
    buttonTextPrimary: palette.white,
    buttonTextSecondary: palette.red,
    transparent: palette.transparent,
    warning: palette.saffron,
    success: palette.leaf,
    darkOverlay: `${palette['coolGray-900']}7b`,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
    xxl: 60,
  },
  textVariants: {
    heading: {
      fontSize: 40,
      fontFamily: 'CircularStd-Black',
    },
    subheading: {
      fontSize: 30,
      fontFamily: 'CircularStd-Bold',
    },
    title: {
      fontSize: 24,
      fontFamily: 'CircularStd-Book',
    },
    paragraph: {
      fontSize: 18,
      fontFamily: 'CircularStd-Medium',
    },
  },
  textSize: {
    xs: 12,
    sm: 14,
    md: 18,
    lg: 24,
    xl: 36,
  },
  borderRadii: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 100,
    xxl: 999,
  },
})

export type Theme = typeof lightTheme

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primaryText: palette.white,
    primaryTextTransparent: `${palette['coolGray-200']}6b`,
    primaryBackground: palette['coolGray-900'],
    secondaryBackground: palette['coolGray-1000'],
  },
}
