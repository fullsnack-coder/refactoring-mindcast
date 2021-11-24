import { LibraryStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = NativeStackScreenProps<LibraryStackParamList, 'library'>

const LibraryScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Hello from LibraryScreen</Text>
    </View>
  )
}

export default LibraryScreen
