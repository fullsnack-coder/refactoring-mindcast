import Box, { BoxProps } from '@system/atoms/Box'
import Icon, { IconProps } from '@system/atoms/Icon'

type Props = {
  puntuation: number
  maximum?: number
  iconColor?: string
  iconSize?: IconProps['size']
} & BoxProps

const Puntuation: React.FC<Props> = ({
  puntuation,
  iconColor,
  iconSize,
  maximum = 5,
  ...rest
}) => (
  <Box flexDirection="row" {...rest}>
    {Array.from({ length: puntuation }).map((_, i) => (
      <Box key={`_${i}`}>
        <Icon name="star" color={iconColor} size={iconSize} />
      </Box>
    ))}
    {Array.from({ length: maximum - puntuation }).map((_, i) => (
      <Box key={`__${i}`}>
        <Icon name="star-outline" color={iconColor} size={iconSize} />
      </Box>
    ))}
  </Box>
)

export default Puntuation
