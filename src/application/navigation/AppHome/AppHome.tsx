import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DiscoverScreen from '@presentation/screens/Discover'
import LibraryScreen from '@presentation/screens/Library'
import SearchScreen from '@presentation/screens/Search'
import SettingsScreen from '@presentation/screens/Settings'

const Stack = createNativeStackNavigator()

//TODO: use stacks instead of screens in component prop
const AppHomeStackNavigation: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="discover"
      component={DiscoverScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="search" component={SearchScreen} />
    <Stack.Screen name="library" component={LibraryScreen} />
    <Stack.Screen name="settings" component={SettingsScreen} />
  </Stack.Navigator>
)

export default AppHomeStackNavigation
