import { SettingsStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = {} & NativeStackScreenProps<SettingsStackParamList, 'settings'>

const SettingsScreen: React.FC<Props> = () => (
  <View>
    <Text>Hello from Settings Screen</Text>
  </View>
)

export default SettingsScreen
