import { useAppTheme } from '@application/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import TextInput from '@system/atoms/TextInput'
import Typography from '@system/atoms/Typography'
import FormField from '@system/molecules/FormField'
import LoadingButton from '@system/molecules/LoadingButton'
import PasswordInput from '@system/molecules/PasswordInput'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable } from 'react-native'

import { loginSchema } from './utils'

const { Text } = Typography

type LoginFormValues = {
  email: string
  password: string
}

type Props = {
  isSubmittingForm?: boolean
  onSubmitForm?: (values: LoginFormValues) => void | Promise<void>
  onRegisterTap?: () => void
}

const LoginForm: React.FC<Props> = ({
  isSubmittingForm = false,
  onRegisterTap,
  onSubmitForm,
}) => {
  const { colors } = useAppTheme()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  })

  const submitLoginForm = useCallback(
    values => onSubmitForm?.(values),
    [onSubmitForm],
  )

  return (
    <Box>
      <FormField
        error={errors.email?.message}
        control={control}
        name="email"
        render={({ field: { onChange, ...rest } }) => (
          <TextInput
            containerProps={{ bg: 'primaryBackground' }}
            editable={!isSubmittingForm}
            leftInput={
              <Icon size="md" name="email-outline" color={colors.primaryText} />
            }
            onChangeText={onChange}
            placeholder="E-mail"
            {...rest}
          />
        )}
      />
      <Separator y={12} />
      <FormField
        error={errors.password?.message}
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <PasswordInput
            placeholder="Password"
            containerProps={{ bg: 'primaryBackground' }}
            editable={!isSubmittingForm}
            leftInput={
              <Icon size="md" name="lock" color={colors.primaryText} />
            }
            onChangeText={onChange}
            {...rest}
          />
        )}
      />
      <Separator y={22} />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px="sm">
        <Box flex={1} flexDirection="row">
          <Text color="primaryBackground">Not account? </Text>
          <Pressable onPress={onRegisterTap}>
            <Text color="primary">Register now</Text>
          </Pressable>
        </Box>
        <LoadingButton
          text="LOGIN"
          type="primary"
          loading={isSubmittingForm}
          onPress={handleSubmit(submitLoginForm)}
        />
      </Box>
    </Box>
  )
}

export default LoginForm
