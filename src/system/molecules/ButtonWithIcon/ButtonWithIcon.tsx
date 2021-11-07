import { useAppTheme } from '@application/hooks'
import Button, { ButtonProps } from '@system/atoms/Button'
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
  const colorIcon =
    rest.type === 'primary'
      ? colors.buttonTextPrimary
      : colors.buttonTextSecondary
  return (
    <Button
      startIcon={
        leftIconName ? (
          <Icon name={leftIconName} color={colorIcon} size={iconSize} />
        ) : undefined
      }
      endIcon={
        rightIconName ? (
          <Icon name={rightIconName} color={colorIcon} size={iconSize} />
        ) : undefined
      }
      {...rest}
    />
  )
}

export default ButtonWithIcon
