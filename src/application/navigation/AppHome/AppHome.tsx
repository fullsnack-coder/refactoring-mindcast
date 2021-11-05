import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import * as HomeViews from './stacks'

const HomeTabs = createBottomTabNavigator()

const homeTabs = [
  { name: 'home-discover', stack: HomeViews.DiscoverStack, icon: 'compass' },
  { name: 'home-search', stack: HomeViews.SearchStack, icon: 'magnify' },
  {
    name: 'home-library',
    stack: HomeViews.LibraryStack,
    icon: 'music-circle-outline',
  },
  {
    name: 'home-settings',
    stack: HomeViews.SettingsStack,
    icon: 'account-settings',
  },
]

const AppHomeStackNavigation: React.FC = () => (
  <HomeTabs.Navigator>
    {homeTabs.map(({ name, stack, icon }) => (
      <HomeTabs.Screen
        key={name}
        name={name}
        component={stack}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={icon} size={22} />,
        }}
      />
    ))}
  </HomeTabs.Navigator>
)

export default AppHomeStackNavigation
