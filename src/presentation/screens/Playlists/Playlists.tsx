import { LibraryStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = NativeStackScreenProps<LibraryStackParamList, 'playlist'>

const PlaylistScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>from playlist screen</Text>
    </View>
  )
}

export default PlaylistScreen
