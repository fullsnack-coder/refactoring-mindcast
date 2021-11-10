import { DiscoverStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = {} & NativeStackScreenProps<
  DiscoverStackParamList,
  'hottest-podcasts'
>

const HottestsPodcastsScreen: React.FC<Props> = () => (
  <View>
    <Text>hello from hottests podcasts</Text>
  </View>
)

export default HottestsPodcastsScreen
