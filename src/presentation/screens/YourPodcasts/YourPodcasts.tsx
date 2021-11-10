import { LibraryStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = NativeStackScreenProps<LibraryStackParamList, 'your-podcasts'>

const YourPodcastsScreen: React.FC<Props> = () => (
  <View>
    <Text>hello from your podcasts screen</Text>
  </View>
)

export default YourPodcastsScreen
