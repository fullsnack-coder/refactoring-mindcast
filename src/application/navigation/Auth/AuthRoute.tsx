import { useAppSelector } from '@application/hooks/store'
import { StackActions, useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'

type Props = {
  redirectTo: string
  extraParams?: Record<string, any>
}

const AuthRoute: React.FC<Props> = ({
  children,
  extraParams = {},
  redirectTo,
}) => {
  const { isLoggedIn } = useAppSelector(state => state.auth)

  if (!isLoggedIn) {
    StackActions.push(redirectTo, extraParams)
    return null
  }
  return <>{children}</>
}

export const withAuth = (
  Component: any,
  redirectTo: string,
  extraParams?: any,
) => {
  const EnhancedComponent = (props: any) => {
    const { isLoggedIn } = useAppSelector(state => state.auth)
    const navigation = useNavigation()

    useLayoutEffect(() => {
      if (!isLoggedIn) {
        navigation.dispatch(StackActions.replace(redirectTo, extraParams))
      }
    }, [isLoggedIn, navigation])

    return <Component {...props} />
  }

  return EnhancedComponent
}

export default AuthRoute
