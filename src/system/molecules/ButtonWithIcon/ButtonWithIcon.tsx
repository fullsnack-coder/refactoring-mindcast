import { useAppTheme } from '@application/hooks'
import Button, { ButtonProps, getFontColor } from '@system/atoms/Button'
import Icon, { IconProps } from '@system/atoms/Icon'

type Props = {
  leftIconName?: string
  rightIconName?: string
  iconSize?: IconProps['size']
} & ButtonProps

const ButtonWithIcon: React.FC<Props> = ({
  leftIconName,
  rightIconName,
  iconSize = 'md',
  ...rest
}) => {
  const { colors } = useAppTheme()
  const colorIcon = getFontColor({
    scheme: rest.scheme || 'colorfull',
    type: rest.type,
  })
  return (
    <Button
      startIcon={
        leftIconName ? (
          <Icon name={leftIconName} color={colors[colorIcon]} size={iconSize} />
        ) : undefined
      }
      endIcon={
        rightIconName ? (
          <Icon
            name={rightIconName}
            color={colors[colorIcon]}
            size={iconSize}
          />
        ) : undefined
      }
      {...rest}
    />
  )
}

export default ButtonWithIcon
