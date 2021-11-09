import AppNavigator from '@application/navigation'
import store from '@application/store'
import { ThemeProvider } from '@shopify/restyle'
import appTheme from '@system/theme'

import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  )
}

export default App
