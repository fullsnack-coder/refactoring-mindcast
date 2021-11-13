import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Field required'),
  password: yup
    .string()
    .required('Field required')
    .min(6, 'Password must contain at least of 6 characters'),
  confirmPassword: yup
    .string()
    .required('Field required')
    .oneOf([yup.ref('password')], 'Password must match')
    .min(6, 'Password must contain at least of 6 characters'),
})
