import 'react-native-gesture-handler'

import AppNavigator from '@application/navigation'
import store from '@application/store'
import { ThemeProvider } from '@shopify/restyle'
import appTheme from '@system/theme'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { Provider } from 'react-redux'
import { useEffect } from 'react'

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

export default App
