import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AboutScreen from '@presentation/screens/About'
import YourInterestsStack from '@presentation/screens/YourInterests'
import PodcastPlayerScreen from '@presentation/screens/PodcastPlayer'

import AppHomeStack from '../AppHome'
import AuthStack from '../Auth'
import OnboardingStack from '../Onboarding'
import PlaylistsStack from '../Playlists'

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
        <AppStack.Screen
          name="player"
          component={PodcastPlayerScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <AppStack.Screen
          name="playlistsStack"
          component={PlaylistsStack}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
