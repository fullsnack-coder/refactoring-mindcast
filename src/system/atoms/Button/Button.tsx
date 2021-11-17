import Box, { BoxProps } from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

import { getBackgroundColor, getFontColor } from './utils'

type ButtonSizes = 'sm' | 'md' | 'lg'
type ButtonTypes = 'primary' | 'secondary'
type ButtonColorScheme = 'colorfull' | 'black'
type ContentSpacing =
  | 'space-between'
  | 'center'
  | 'space-around'
  | 'flex-start'
  | 'flex-end'

export type Props = {
  contentSpacing?: ContentSpacing
  text: string
  fullWidth?: boolean
  endIcon?: JSX.Element
  size?: ButtonSizes
  scheme?: ButtonColorScheme
  startIcon?: JSX.Element
  type?: ButtonTypes
  contentProps?: BoxProps
} & PressableProps

const { Text } = Typography

const Button: React.FC<Props> = ({
  endIcon,
  fullWidth = false,
  contentSpacing = 'center',
  scheme = 'colorfull',
  size = 'sm',
  startIcon,
  text,
  type = 'secondary',
  contentProps = {},
  children: _,
  ...rest
}) => {
  const isPrimary = type === 'primary'
  const isDefaultScheme = scheme === 'colorfull'
  const backgroundColor = getBackgroundColor({ scheme, type })
  const fontColor = getFontColor({ scheme, type })

  return (
    <Pressable style={styles.pressable} {...rest}>
      <Box
        alignSelf={fullWidth ? 'center' : 'flex-start'}
        alignItems="center"
        bg={backgroundColor}
        borderColor={isDefaultScheme ? 'primary' : 'primaryText'}
        borderRadius="sm"
        borderWidth={isPrimary ? 0 : 1}
        flexDirection="row"
        justifyContent={contentSpacing}
        width={fullWidth ? '100%' : undefined}
        p={size}
        {...contentProps}>
        {startIcon ? <Box mr="xs">{startIcon}</Box> : null}
        <Text color={fontColor}>{text}</Text>
        {endIcon ? <Box ml="xs">{endIcon}</Box> : null}
      </Box>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
})

export default Button
