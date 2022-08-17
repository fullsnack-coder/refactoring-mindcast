import { TRACKPLAYER_NOTIFICATION_URI } from '@application/constants'
import { useThemeContext } from '@application/context/theme'
import { useAppDispatch } from '@application/hooks/store'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import { downloadEpisodesLoadAll } from '@application/store/modules/downloads'
import { loadRecentlyListStart } from '@application/store/modules/episodes'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icon from '@system/atoms/Icon'
import Typography from '@system/atoms/Typography'

import { useEffect } from 'react'
import { Linking } from 'react-native'
import type { HomeTabsParamList } from './types'
import { homeTabs } from './utils'

const HomeTabs = createBottomTabNavigator<HomeTabsParamList>()
const { Text } = Typography

type Props = {} & NativeStackScreenProps<AppStackParamList, 'home'>

const AppHomeStackNavigation: React.FC<Props> = ({ navigation }) => {
  const {
    currentTheme: { colors },
    isDarkModeEnabled,
  } = useThemeContext()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // load initial app data
    dispatch(downloadEpisodesLoadAll())
    dispatch(loadRecentlyListStart())
  }, [dispatch])

  useEffect(() => {
    // redirect to the player screen from track notification taps
    const playerNotificationSubscription = Linking.addEventListener(
      'url',
      ({ url }) => {
        if (url.includes(TRACKPLAYER_NOTIFICATION_URI))
          navigation.navigate('player')
      },
    )

    return () => {
      playerNotificationSubscription.remove()
    }
  }, [navigation])

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
              backgroundColor: isDarkModeEnabled
                ? colors.secondaryBackground
                : colors.primaryBackground,
              borderTopWidth: 0,
              paddingTop: 6,
              paddingBottom: 6,
              height: 55,
            },
            tabBarIcon: ({ focused }) => (
              <Icon
                name={icon}
                size="md"
                color={focused ? colors.primary : colors.secondaryText}
              />
            ),
            tabBarActiveTintColor: colors.primary,
            tabBarLabel: ({ focused }) => (
              <Text color={focused ? 'primary' : 'secondaryText'} fontSize={12}>
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
