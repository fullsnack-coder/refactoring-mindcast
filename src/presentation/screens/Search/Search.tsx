import { SearchStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = {} & NativeStackScreenProps<SearchStackParamList, 'search'>

const SearchScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Hello from search view</Text>
    </View>
  )
}

export default SearchScreen
