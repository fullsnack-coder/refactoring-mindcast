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

import { loginSchema } from './utils'

const { Text } = Typography

type LoginFormValues = {
  email: string
  password: string
}

type Props = {
  onSubmitForm?: (values: LoginFormValues) => void | Promise<void>
}

const LoginForm: React.FC<Props> = ({ onSubmitForm }) => {
  const { colors } = useAppTheme()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  })

  const submitLoginForm = useCallback(values => onSubmitForm?.(values), [])

  return (
    <Box>
      <FormField
        error={errors.email?.message}
        control={control}
        name="email"
        render={({ field: { onChange, ...rest } }) => (
          <TextInput
            placeholder="E-mail"
            containerProps={{ bg: 'primaryBackground' }}
            leftInput={
              <Icon size="md" name="email-outline" color={colors.primaryText} />
            }
            onChangeText={onChange}
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
        px="md">
        <Text>
          Not account? <Text color="primary">Register now</Text>
        </Text>
        <Box>
          <Button
            text="LOGIN"
            type="primary"
            onPress={handleSubmit(submitLoginForm)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default LoginForm