import { useAppTheme } from '@application/hooks'
import { SearchStackParamList } from '@application/navigation/AppHome'
import TopicsCollection from '@presentation/containers/TopicsCollection'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import TextInput from '@system/atoms/TextInput'
import Typography from '@system/atoms/Typography'
import { useCallback, useRef } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {} & NativeStackScreenProps<SearchStackParamList, 'search'>

const { Heading } = Typography

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useAppTheme()
  const searchBox = useRef<RNTextInput & { value: string }>(null)
  const redirectToTopic = useCallback(
    topic => {
      navigation.navigate('topic', { topic })
    },
    [navigation],
  )

  const submitSearchAuthor = useCallback(() => {
    navigation.navigate('search-results', {
      searchedTerm: searchBox.current?.value || '',
    })
  }, [navigation])

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <Box flex={1} p="md" bg="primaryBackground">
        <Heading>Search</Heading>
        <TextInput
          ref={searchBox}
          leftInput={
            <Icon
              name="magnify"
              color={colors.primaryTextTransparent}
              size="md"
            />
          }
          placeholder="Search for a specific Author"
          onChangeText={currentText => {
            if (searchBox.current) searchBox.current.value = currentText
          }}
          onSubmitEditing={submitSearchAuthor}
        />
        <Separator y={12} />
        <TopicsCollection onTapTopic={redirectToTopic} />
      </Box>
    </SafeAreaView>
  )
}

export default SearchScreen
