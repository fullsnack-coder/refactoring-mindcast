import { SettingKey, useAppSettings } from '@application/context/settings'
import { useThemeContext } from '@application/context/theme'
import { useAppDispatch } from '@application/hooks/store'
import {
  HomeTabsParamList,
  SettingsStackParamList,
} from '@application/navigation/AppHome'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import { logout } from '@application/store/modules/auth'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import { useCallback } from 'react'
import { Pressable, SafeAreaView, ScrollView } from 'react-native'

import SettingOption from './SettingOption'

const { Heading, Text } = Typography

type Props = {} & CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParamList, 'settings'>,
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabsParamList>,
    NativeStackScreenProps<AppStackParamList>
  >
>

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { currentSettings, updateSetting } = useAppSettings()
  const {
    currentTheme: { colors },
    toggleDarkMode,
  } = useThemeContext()
  const dispatch = useAppDispatch()

  const logoutUser = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  const redirectToAboutPage = useCallback(() => {
    navigation.navigate('about')
  }, [navigation])

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box flexGrow={1} bg="primaryBackground" p="md">
          <Heading>Settings</Heading>
          <Box mt="xl">
            {Object.entries(currentSettings).map(
              ([settingKey, settingValue]) => (
                <Box key={settingKey} mb="lg">
                  <SettingOption
                    setting={settingValue}
                    onUpdateOption={newValue => {
                      updateSetting(settingKey as SettingKey, newValue)
                      if (settingKey === 'darkmode') toggleDarkMode()
                    }}
                  />
                </Box>
              ),
            )}
            <Pressable onPress={redirectToAboutPage}>
              <Box alignItems="center" flexDirection="row">
                <Box flex={1} mr="md">
                  <Text fontFamily="CircularStd-Bold" fontSize={20}>
                    About
                  </Text>
                  <Text fontSize={16} color="secondaryText">
                    Want to know more about the Creator of this App? Chek it
                    out!
                  </Text>
                </Box>
                <Icon name="arrow-right" size="lg" color={colors.primaryText} />
              </Box>
            </Pressable>
            <Separator y={30} />
            <Pressable onPress={logoutUser}>
              <Box alignItems="center" flexDirection="row">
                <Box flex={1} mr="md">
                  <Text fontFamily="CircularStd-Bold" fontSize={20}>
                    Logout
                  </Text>
                  <Text fontSize={16} color="secondaryText">
                    Close your app session
                  </Text>
                </Box>
                <Icon name="logout" size="lg" color={colors.primaryText} />
              </Box>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen
