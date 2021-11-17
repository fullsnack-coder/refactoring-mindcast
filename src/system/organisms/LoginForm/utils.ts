import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Field required'),
  password: yup
    .string()
    .min(6, 'Password must contain at least 6 characters')
    .required('Field required'),
})
