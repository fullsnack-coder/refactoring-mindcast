import 'react-native-gesture-handler'

import { AudioPlayerProvider } from '@application/context/audioPlayer'
import NotificationsProvider from '@application/context/notifications'
import AppSettingsProvider from '@application/context/settings'
import AppNavigator from '@application/navigation'
import store from '@application/store'
import { ThemeProvider } from '@shopify/restyle'
import appTheme from '@system/theme'

import Orientation from 'react-native-orientation-locker'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { useEffect } from 'react'

const App: React.FC = () => {
  useEffect(() => {
    Orientation.lockToPortrait()
    SplashScreen.hide()
  }, [])

  return (
    <Provider store={store}>
      <AppSettingsProvider>
        <ThemeProvider theme={appTheme}>
          <NotificationsProvider>
            <AudioPlayerProvider>
              <SafeAreaProvider>
                <AppNavigator />
              </SafeAreaProvider>
            </AudioPlayerProvider>
          </NotificationsProvider>
        </ThemeProvider>
      </AppSettingsProvider>
    </Provider>
  )
}

// TODO: Remove this when we have a better solution for the log box
if (__DEV__) {
  LogBox.ignoreLogs([
    `EventEmitter.removeListener('change', ...)`,
    'NativeEventEmitter',
  ])
}

export default App
