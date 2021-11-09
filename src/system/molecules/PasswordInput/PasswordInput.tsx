import { useAppTheme } from '@application/hooks'
import Icon from '@system/atoms/Icon'
import TextInput, { TextInputProps } from '@system/atoms/TextInput'
import { useCallback, useState } from 'react'
import { Pressable } from 'react-native'

type Props = {} & TextInputProps

const PasswordInput: React.FC<Props> = props => {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const { colors } = useAppTheme()

  const toggleShow = useCallback(() => {
    setIsShowingPassword(prevValue => !prevValue)
  }, [])

  return (
    <TextInput
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
}

export default PasswordInput
