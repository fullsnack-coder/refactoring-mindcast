import Box from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

export type Props = {
  text: string
  fullWidth?: boolean
  type?: 'primary' | 'secondary'
  startIcon?: JSX.Element
  endIcon?: JSX.Element
} & PressableProps

const { Text } = Typography

const Button: React.FC<Props> = ({
  fullWidth = false,
  text,
  type = 'secondary',
  startIcon,
  endIcon,
  children: _,
  ...rest
}) => {
  const isPrimary = type === 'primary'

  return (
    <Pressable style={styles.pressable} {...rest}>
      <Box
        alignSelf={fullWidth ? 'center' : 'flex-start'}
        alignItems="center"
        bg={isPrimary ? 'primary' : 'transparent'}
        borderColor="primary"
        borderRadius={8}
        borderWidth={isPrimary ? 0 : 1}
        flexDirection="row"
        width={fullWidth ? '100%' : undefined}
        p="sm">
        {startIcon ? <Box mr="xs">{startIcon}</Box> : null}
        <Text color={isPrimary ? 'buttonTextPrimary' : 'buttonTextSecondary'}>
          {text}
        </Text>
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
