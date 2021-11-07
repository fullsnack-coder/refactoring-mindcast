import AppNavigator from '@application/navigation'
import store from '@application/store'

import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App
