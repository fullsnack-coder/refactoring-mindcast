import { useAppDispatch } from '@application/hooks/store'
import { authSuccess } from '@application/store/modules/auth'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { createContext, useCallback, useContext, useEffect } from 'react'

interface AuthContext {}

const authContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch()

  const authChangeListener = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        dispatch(
          authSuccess({
            id: user.uid || '',
            avatarUrl: user.photoURL || '',
            username: user.displayName || '',
            email: user.email || '',
          }),
        )
      }
    },
    [dispatch],
  )

  useEffect(() => {
    const subscription = auth().onAuthStateChanged(authChangeListener)
    return subscription
  }, [authChangeListener])

  return <authContext.Provider value={{}}>{children}</authContext.Provider>
}

export const useAuthContext = () => useContext(authContext)

export default authContext
