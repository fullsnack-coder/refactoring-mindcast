import 'react-native-gesture-handler'

import AppNavigator from '@application/navigation'
import store from '@application/store'
import { ThemeProvider } from '@shopify/restyle'
import appTheme from '@system/theme'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { LogBox } from 'react-native'

const App: React.FC = () => {
  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  )
}

// TODO: Remove this when we have a better solution for the log box
if (__DEV__) LogBox.ignoreLogs([`EventEmitter.removeListener('change', ...)`])

export default App
