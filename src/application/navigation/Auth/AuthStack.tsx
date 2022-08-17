import { useAppTheme } from '@application/hooks'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import AuthScreen from '@presentation/screens/Auth'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'

import { AuthStackParamList } from './types'

const Stack = createNativeStackNavigator<AuthStackParamList>()

type Props = NativeStackScreenProps<AppStackParamList, 'auth'>

const AuthStack: React.FC<Props> = () => {
  const { colors } = useAppTheme()
  return (
    <>
      <StatusBar
        backgroundColor={colors.secondaryBackground}
        barStyle="light-content"
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth-forms" component={AuthScreen} />
      </Stack.Navigator>
    </>
  )
}

export default AuthStack
