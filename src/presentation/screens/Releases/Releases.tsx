import { DiscoverStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = {} & NativeStackScreenProps<DiscoverStackParamList, 'new-releases'>

const ReleasesScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>from releases screen</Text>
    </View>
  )
}

export default ReleasesScreen
