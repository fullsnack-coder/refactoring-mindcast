import { User, AuthLoginInput, AuthRegisterInput } from '@application/types'
import { user as mockedUser } from '../mock/apiData'

//TODO: working around a real service to login from backend
export const loginUser = async ({
  email,
  password,
}: AuthLoginInput): Promise<User> => {
  const authenticatedUser = await Promise.resolve(mockedUser)
  return authenticatedUser
}

export const registerUser = async ({}: AuthRegisterInput): Promise<User> => {
  const registeredUser = await Promise.resolve({
    id: 'hash',
    username: 'Moock002',
    email: 'mock@mailinator.com',
  })
  return registeredUser
}
