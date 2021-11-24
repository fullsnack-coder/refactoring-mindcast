import { LibraryStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = NativeStackScreenProps<LibraryStackParamList, 'recently-played'>

const RecentlyPlayedScreen: React.FC<Props> = () => (
  <View>
    <Text>Hello from recently played screen</Text>
  </View>
)

export default RecentlyPlayedScreen
