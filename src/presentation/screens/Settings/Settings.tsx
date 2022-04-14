import { SettingKey, useAppSettings } from '@application/context/settings'
import { SettingsStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import { SafeAreaView, ScrollView } from 'react-native'
import SettingOption from './SettingOption'

const { Heading } = Typography

type Props = {} & NativeStackScreenProps<SettingsStackParamList, 'settings'>

const SettingsScreen: React.FC<Props> = () => {
  const { currentSettings, updateSetting } = useAppSettings()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Box flex={1} bg="primaryBackground" p="md">
          <Heading>Settings</Heading>
          <Box mt="xl">
            {Object.entries(currentSettings).map(
              ([settingKey, settingValue]) => (
                <Box key={settingKey} mb="lg">
                  <SettingOption
                    setting={settingValue}
                    onUpdateOption={newValue =>
                      updateSetting(settingKey as SettingKey, newValue)
                    }
                  />
                </Box>
              ),
            )}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen
