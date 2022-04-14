import { useAppTheme } from '@application/hooks'
import Box, { BoxProps } from '@system/atoms/Box'
import Icon, { IconProps } from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'

const { Text } = Typography

type Props = {
  leftIconProps: IconProps
  rightIconProps: IconProps
  optionLabel: string
  containerProps?: BoxProps
}

const OptionWithIcons: React.FC<Props> = ({
  containerProps,
  leftIconProps,
  optionLabel,
  rightIconProps,
}) => {
  const { colors, spacing } = useAppTheme()
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      p="md"
      {...containerProps}>
      <Icon color={colors.primary} size="md" {...leftIconProps} />
      <Separator x={spacing.md} />
      <Text color="primaryText" style={{ flex: 1 }}>
        {optionLabel}
      </Text>
      <Icon color={colors.primary} size="md" {...rightIconProps} />
    </Box>
  )
}

export default OptionWithIcons
