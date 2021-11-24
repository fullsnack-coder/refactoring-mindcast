import { User, AuthLoginInput, AuthRegisterInput } from '@application/types'

//TODO: working around a real service to login from backend
export const loginUser = async ({
  email,
  password,
}: AuthLoginInput): Promise<User> => {
  await Promise.resolve({ email, password })
  return {
    username: 'Chokidar89',
    email: 'chokidar@mailinator.com',
    description: 'a simple mode to debug your applications',
    phoneNumber: '129892190',
  }
}

export const registerUser = async ({}: AuthRegisterInput): Promise<User> => {
  await Promise.resolve({})
  return {
    username: 'Moock002',
    email: 'mock@mailinator.com',
  }
}
