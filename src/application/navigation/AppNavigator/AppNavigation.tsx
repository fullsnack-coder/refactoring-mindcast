import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AppHomeStack from '@application/navigation/AppHome'
import YourInterestsStack from '@presentation/screens/YourInterests'
import AboutScreen from '@presentation/screens/About'

import AuthStack from '../Auth'
import OnboardingStack from '../Onboarding'
import { AppStackParamList } from './types'

const AppStack = createNativeStackNavigator<AppStackParamList>()

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="onboarding" component={OnboardingStack} />
        <AppStack.Screen name="auth" component={AuthStack} />
        <AppStack.Screen name="interests" component={YourInterestsStack} />
        <AppStack.Screen name="home" component={AppHomeStack} />
        <AppStack.Screen name="about" component={AboutScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
