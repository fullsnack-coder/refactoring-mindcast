import { useAppTheme } from '@application/hooks'
import Box, { BoxProps } from '@system/atoms/Box'
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native'
import { forwardRef } from 'react'

type InputVariants = 'outlined' | 'simple'

export type Props = {
  variant?: InputVariants
  leftInput?: JSX.Element | null
  rightInput?: JSX.Element | null
  containerProps?: BoxProps
} & RNTextInputProps

const TextInput = forwardRef<RNTextInput, Props>(
  (
    { leftInput, rightInput, variant = 'simple', containerProps = {}, ...rest },
    ref,
  ) => {
    const { colors, textSize } = useAppTheme()
    const baseStyles: StyleProp<TextStyle> = {
      color: colors.secondaryText,
      flex: 1,
      fontFamily: 'CircularStd-Medium',
      fontSize: textSize.md,
      fontWeight: '400',
    }

    return (
      <Box
        alignItems="center"
        borderColor={variant === 'simple' ? 'transparent' : 'secondaryText'}
        borderRadius="sm"
        borderWidth={1}
        flexDirection="row"
        px="md"
        py="xs"
        {...containerProps}>
        {!leftInput ? null : <Box mr="xs">{leftInput}</Box>}
        <RNTextInput
          ref={ref}
          placeholderTextColor={colors.secondaryBackground}
          selectionColor={colors.primary}
          style={baseStyles}
          {...rest}
        />
        {!rightInput ? null : <Box ml="xs">{rightInput}</Box>}
      </Box>
    )
  },
)

export default TextInput
