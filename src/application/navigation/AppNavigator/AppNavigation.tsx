import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AppHomeStack from '@application/navigation/AppHome'
import InterestsScreen from '@presentation/screens/Interests'

import AuthStack from '../Auth'
import OnboardingStack from '../Onboarding'
import { AppStackParamList } from './types'

const AppStack = createNativeStackNavigator<AppStackParamList>()

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="onboarding" component={OnboardingStack} />
        <AppStack.Screen name="auth" component={AuthStack} />
        <AppStack.Screen name="interests" component={InterestsScreen} />
        <AppStack.Screen name="home" component={AppHomeStack} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
