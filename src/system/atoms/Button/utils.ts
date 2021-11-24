import { Theme } from '@system/theme'
import { Props } from './Button'

type UtilsOptions = { scheme: Props['scheme']; type: Props['type'] }

export const getFontColor = ({
  scheme,
  type,
}: UtilsOptions): keyof Theme['colors'] => {
  if (scheme === 'colorfull') {
    return type === 'primary' ? 'buttonTextPrimary' : 'buttonTextSecondary'
  }
  return type === 'primary' ? 'primaryBackground' : 'primaryText'
}

export const getBackgroundColor = ({
  scheme,
  type,
}: UtilsOptions): keyof Theme['colors'] => {
  if (scheme === 'colorfull') {
    return type === 'primary' ? 'primary' : 'transparent'
  }
  return type === 'primary' ? 'primaryText' : 'transparent'
}
