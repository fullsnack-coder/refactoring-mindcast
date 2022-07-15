import { User, AuthLoginInput, AuthRegisterInput } from '@application/types'
import auth from '@react-native-firebase/auth'

export const loginUser = async ({
  email,
  password,
}: AuthLoginInput): Promise<User> => {
  const { user } = await auth().signInWithEmailAndPassword(email, password)
  return {
    id: user.uid,
    avatarUrl: user.photoURL || '',
    username: user.displayName || '',
    email: user.email || '',
  }
}

export const registerUser = async ({
  confirmPassword,
  email,
  password,
}: AuthRegisterInput): Promise<User> => {
  if (confirmPassword !== password) throw new Error("Passwords doesn't match")
  const { user } = await auth().createUserWithEmailAndPassword(email, password)
  return {
    id: user.uid,
    avatarUrl: user.photoURL || '',
    username: user.displayName || '',
    email: user.email || '',
  }
}

export const logoutUser = async () => {
  await auth().signOut()
}
