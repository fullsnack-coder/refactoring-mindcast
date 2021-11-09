import { useAppTheme } from '@application/hooks'
import Box from '@system/atoms/Box'
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native'

type InputVariants = 'outlined' | 'simple'

export type Props = {
  variant?: InputVariants
  leftInput?: JSX.Element | null
  rightInput?: JSX.Element | null
} & RNTextInputProps

const TextInput: React.FC<Props> = ({
  leftInput,
  rightInput,
  variant = 'simple',
  ...rest
}) => {
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
      py="xs">
      {!leftInput ? null : <Box mr="xs">{leftInput}</Box>}
      <RNTextInput
        placeholderTextColor={colors.secondaryBackground}
        selectionColor={colors.primary}
        style={baseStyles}
        {...rest}
      />
      {!rightInput ? null : <Box ml="xs">{rightInput}</Box>}
    </Box>
  )
}

export default TextInput
