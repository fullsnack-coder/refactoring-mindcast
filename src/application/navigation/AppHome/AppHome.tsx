import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { HomeTabsParamList } from './types'
import { homeTabs } from './utils'

const HomeTabs = createBottomTabNavigator<HomeTabsParamList>()

type Props = {} & NativeStackScreenProps<AppStackParamList, 'home'>

const AppHomeStackNavigation: React.FC<Props> = () => (
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
