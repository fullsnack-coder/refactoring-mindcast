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

import { registerSchema } from './utils'

const { Text } = Typography

type RegisterFormValues = {
  email: string
  password: string
  confirmPassword: string
}

type Props = {
  isSubmittingForm?: boolean
  onSubmitForm?: (values: RegisterFormValues) => void | Promise<void>
  onLoginTap?: () => void
}

const RegisterForm: React.FC<Props> = ({
  onLoginTap,
  onSubmitForm,
  isSubmittingForm = false,
}) => {
  const { colors } = useAppTheme()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  })

  const submitForm = useCallback(
    values => onSubmitForm?.(values),
    [onSubmitForm],
  )

  return (
    <Box>
      <FormField
        control={control}
        name="email"
        error={errors.email?.message}
        render={({ field: { onChange, ...rest } }) => (
          <TextInput
            containerProps={{ bg: 'primaryBackground' }}
            editable={!isSubmittingForm}
            placeholder="E-mail"
            onChangeText={onChange}
            leftInput={
              <Icon name="email-outline" color={colors.primaryText} size="md" />
            }
            {...rest}
          />
        )}
      />
      <Separator y={8} />
      <FormField
        control={control}
        name="password"
        error={errors.password?.message}
        render={({ field: { onChange, ...rest } }) => (
          <PasswordInput
            containerProps={{ bg: 'primaryBackground' }}
            editable={!isSubmittingForm}
            placeholder="Password"
            onChangeText={onChange}
            {...rest}
          />
        )}
      />
      <Separator y={8} />
      <FormField
        control={control}
        name="confirmPassword"
        error={errors.confirmPassword?.message}
        render={({ field: { onChange, ...rest } }) => (
          <PasswordInput
            containerProps={{ bg: 'primaryBackground' }}
            editable={!isSubmittingForm}
            leftInput={
              <Icon name="lock-reset" size="md" color={colors.primaryText} />
            }
            placeholder="Confirm-password"
            onChangeText={onChange}
            {...rest}
          />
        )}
      />

      <Separator y={8} />
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flexDirection="row">
          <Text color="secondaryText">Has account? </Text>
          <Pressable onPress={onLoginTap}>
            <Text color="primary">Log-In!</Text>
          </Pressable>
        </Box>
        <LoadingButton
          loading={isSubmittingForm}
          text="REGISTER"
          type="primary"
          onPress={handleSubmit(submitForm)}
        />
      </Box>
    </Box>
  )
}

export default RegisterForm
