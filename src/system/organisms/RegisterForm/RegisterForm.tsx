import { useAppTheme } from '@application/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import TextInput from '@system/atoms/TextInput'
import Typography from '@system/atoms/Typography'
import FormField from '@system/molecules/FormField'
import PasswordInput from '@system/molecules/PasswordInput'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { registerSchema } from './utils'

const { Text } = Typography

type RegisterFormValues = {
  email: string
  password: string
  confirmPassword: string
}

type Props = {
  onSubmitForm?: (values: RegisterFormValues) => void | Promise<void>
}

const RegisterForm: React.FC<Props> = ({ onSubmitForm }) => {
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
        <Text color="primaryBackground">
          Has account? <Text color="primary">Log-In!</Text>
        </Text>
        <Box>
          <Button
            text="REGISTER"
            type="primary"
            onPress={handleSubmit(submitForm)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterForm
