import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import { DiscoverStackParamList } from '@application/navigation/AppHome'
import { getTopAuthors } from '@application/store/modules/authors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import AuthorListItem from '@system/molecules/AuthorListItem'
import Ribbon from '@system/molecules/Ribbon'
import { useCallback, useEffect } from 'react'
import { FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { Text } = Typography

type Props = {} & NativeStackScreenProps<
  DiscoverStackParamList,
  'trending-authors'
>

const TrendingAuthorsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { colors, spacing } = useAppTheme()
  const trendingAuthors = useAppSelector(state => state.authors.topAuthors)

  useEffect(() => {
    if (trendingAuthors.length === 0) {
      dispatch(getTopAuthors({}))
    }
  }, [dispatch, trendingAuthors])

  const handleRedirectToAuthor = useCallback(
    (authorId: string) => () => {
      navigation.navigate('author-details', { authorId })
    },
    [navigation],
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="primaryBackground">
        <Ribbon
          title="Trending Authors"
          onPressLeftButton={navigation.goBack}
          renderLeft={
            <Icon
              color={colors.primaryText}
              name="arrow-left"
              size="md"
              style={{ marginLeft: 16 }}
            />
          }
        />
        <FlatList
          data={trendingAuthors}
          keyExtractor={({ id }) => id}
          contentContainerStyle={{ paddingTop: spacing.sm }}
          ItemSeparatorComponent={() => <Separator y={10} />}
          renderItem={({ item }) => (
            <Pressable onPress={handleRedirectToAuthor(item.id)}>
              <AuthorListItem author={item} />
            </Pressable>
          )}
        />
      </Box>
    </SafeAreaView>
  )
}

export default TrendingAuthorsScreen
