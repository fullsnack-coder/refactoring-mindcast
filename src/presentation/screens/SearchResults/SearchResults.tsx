import { SearchStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'

type Props = {} & NativeStackScreenProps<SearchStackParamList, 'search-results'>

const SearchResultsScreen: React.FC<Props> = () => (
  <View>
    <Text>hello from searchresults screen</Text>
  </View>
)

export default SearchResultsScreen
