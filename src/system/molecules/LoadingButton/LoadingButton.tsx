import { useAppTheme } from '@application/hooks'
import Button, { ButtonProps, getFontColor } from '@system/atoms/Button'

import { ActivityIndicator } from 'react-native'

type Props = {
  collapseText?: boolean
  loading?: boolean
  spinnerSize?: 'small' | 'large'
} & ButtonProps

const LoadingButton: React.FC<Props> = ({
  collapseText,
  loading,
  spinnerSize = 'small',
  text,
  ...rest
}) => {
  const { colors } = useAppTheme()
  const fontColor = getFontColor({
    scheme: rest.scheme || 'colorfull',
    type: rest.type || 'primary',
  })

  return (
    <Button
      endIcon={
        loading ? (
          <ActivityIndicator size={spinnerSize} color={colors[fontColor]} />
        ) : undefined
      }
      text={collapseText && loading ? '' : text}
      {...rest}
    />
  )
}

export default LoadingButton
