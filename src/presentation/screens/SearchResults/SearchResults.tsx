import { useAppTheme } from '@application/hooks'
import useAuthors from '@application/hooks/useAuthors'
import { SearchStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import AuthorSearchItem from '@system/molecules/AuthorSearchItem'
import MessageScreen from '@system/molecules/MessageScreen'
import Ribbon from '@system/molecules/Ribbon'
import { useCallback } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {} & NativeStackScreenProps<SearchStackParamList, 'search-results'>

const SearchResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { params } = route
  const { colors, spacing } = useAppTheme()
  const { currentAuthors, isLoading } = useAuthors({
    name: params.searchedTerm,
  })

  const redirectToAuthorDetails = useCallback(
    author => {
      navigation.navigate('author-details', { authorId: author.id })
    },
    [navigation],
  )

  if (isLoading)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator color={colors.primary} size="large" />
      </Box>
    )

  return (
    <SafeAreaView>
      <Ribbon
        title="Search Authors"
        onPressLeftButton={navigation.goBack}
        renderLeft={
          <Icon
            name="arrow-left"
            size="md"
            color={colors.primaryText}
            style={{ marginLeft: 16 }}
          />
        }
      />
      <FlatList
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: 80,
        }}
        ListEmptyComponent={
          <Box pt="xxl">
            <MessageScreen
              message={`There is no authors for "${params.searchedTerm || ''}"`}
            />
          </Box>
        }
        data={currentAuthors}
        ItemSeparatorComponent={() => <Box height={12} />}
        renderItem={({ item }) => (
          <AuthorSearchItem
            author={item}
            onPressSearchButton={redirectToAuthorDetails}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default SearchResultsScreen
