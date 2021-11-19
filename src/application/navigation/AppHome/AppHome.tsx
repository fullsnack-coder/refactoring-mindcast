import { useAppTheme } from '@application/hooks'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@system/atoms/Icon'
import Typography from '@system/atoms/Typography'

import type { HomeTabsParamList } from './types'
import { homeTabs } from './utils'

const HomeTabs = createBottomTabNavigator<HomeTabsParamList>()
const { Text } = Typography

type Props = {} & NativeStackScreenProps<AppStackParamList, 'home'>

const AppHomeStackNavigation: React.FC<Props> = () => {
  const { colors } = useAppTheme()
  return (
    <HomeTabs.Navigator>
      {homeTabs.map(({ name, stack, icon, label }) => (
        <HomeTabs.Screen
          key={name}
          name={name}
          component={stack}
          options={{
            headerShown: false,
            tabBarStyle: {
              paddingTop: 6,
              paddingBottom: 6,
              height: 55,
            },
            tabBarIcon: ({ focused }) => (
              <Icon
                name={icon}
                size="md"
                color={focused ? colors.primary : colors.secondaryBackground}
              />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarLabel: ({ focused }) => (
              <Text
                color={focused ? 'primary' : 'secondaryBackground'}
                fontSize={12}>
                {label}
              </Text>
            ),
          }}
        />
      ))}
    </HomeTabs.Navigator>
  )
}

export default AppHomeStackNavigation
