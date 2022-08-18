import { useThemeContext } from '@application/context/theme'
import { useAppSelector } from '@application/hooks/store'
import AboutScreen from '@presentation/screens/About'
import PodcastPlayerScreen from '@presentation/screens/PodcastPlayer'
import YourInterestsStack from '@presentation/screens/YourInterests'

import {
  NavigationContainer,
  DefaultTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AppHomeStack from '../AppHome'
import AuthStack from '../Auth'
import OnboardingStack from '../Onboarding'
import PlaylistsStack from '../Playlists'

import { AppStackParamList } from './types'

const AppStack = createNativeStackNavigator<AppStackParamList>()

const AppNavigation = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth)
  const {
    currentTheme: { colors },
  } = useThemeContext()

  const containerTheme: NavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primaryBackground,
    },
  }

  return (
    <NavigationContainer theme={containerTheme}>
      <AppStack.Navigator
        initialRouteName={isLoggedIn ? 'home' : 'auth'}
        screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <AppStack.Screen name="home" component={AppHomeStack} />
            <AppStack.Screen name="about" component={AboutScreen} />
            <AppStack.Screen name="interests" component={YourInterestsStack} />
          </>
        ) : (
          <AppStack.Screen name="auth" component={AuthStack} />
        )}
        <AppStack.Screen name="onboarding" component={OnboardingStack} />
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
