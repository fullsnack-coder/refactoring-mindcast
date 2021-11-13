import { useAppTheme } from '@application/hooks'
import Icon from '@system/atoms/Icon'
import TextInput, { TextInputProps } from '@system/atoms/TextInput'
import { forwardRef, useCallback, useState } from 'react'
import { Pressable, TextInput as RNTextInput } from 'react-native'

type Props = {} & TextInputProps

const PasswordInput = forwardRef<RNTextInput, Props>((props, ref) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const { colors } = useAppTheme()

  const toggleShow = useCallback(() => {
    setIsShowingPassword(prevValue => !prevValue)
  }, [])

  return (
    <TextInput
      ref={ref}
      secureTextEntry={!isShowingPassword}
      leftInput={<Icon name="lock" color={colors.primaryText} size="md" />}
      rightInput={
        <Pressable onPress={toggleShow} hitSlop={5}>
          <Icon
            name={isShowingPassword ? 'eye-off' : 'eye'}
            color={colors.primaryText}
            size="md"
          />
        </Pressable>
      }
      {...props}
    />
  )
})

export default PasswordInput
