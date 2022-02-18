import { useAppTheme } from '@application/hooks'
import { SearchStackParamList } from '@application/navigation/AppHome'
import TopicsCollection from '@presentation/containers/TopicsCollection'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import TextInput from '@system/atoms/TextInput'
import Typography from '@system/atoms/Typography'
import { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {} & NativeStackScreenProps<SearchStackParamList, 'search'>

const { Heading } = Typography

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useAppTheme()
  const redirectToTopic = useCallback(
    topic => {
      navigation.navigate('topic', { topicId: topic.id })
    },
    [navigation],
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} p="md" bg="primaryBackground">
        <Heading>Search</Heading>
        <TextInput
          leftInput={
            <Icon
              name="magnify"
              color={colors.primaryTextTransparent}
              size="md"
            />
          }
          placeholder="Search for a specific Author"
        />
        <Separator y={12} />
        <TopicsCollection onTapTopic={redirectToTopic} />
      </Box>
    </SafeAreaView>
  )
}

export default SearchScreen
