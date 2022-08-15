import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import { DiscoverStackParamList } from '@application/navigation/AppHome'
import { getTopAuthors } from '@application/store/modules/authors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import AuthorListItem from '@system/molecules/AuthorListItem'
import MessageScreen from '@system/molecules/MessageScreen'
import Ribbon from '@system/molecules/Ribbon'
import { useCallback, useEffect } from 'react'
import { ActivityIndicator, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {} & NativeStackScreenProps<
  DiscoverStackParamList,
  'trending-authors'
>

const TrendingAuthorsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { colors, spacing } = useAppTheme()
  const { topAuthors: trendingAuthors, status } = useAppSelector(
    state => state.authors,
  )

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
        {status === 'started' ? (
          <Box flex={1} alignItems="center" justifyContent="center">
            <ActivityIndicator size="large" color={colors.primary} />
          </Box>
        ) : (
          <FlatList
            data={trendingAuthors}
            ListEmptyComponent={
              <Box pt="xxl" alignItems="center">
                <MessageScreen message="There is no authors" />
              </Box>
            }
            keyExtractor={({ id }) => id}
            contentContainerStyle={{ paddingTop: spacing.sm }}
            ItemSeparatorComponent={() => <Separator y={10} />}
            renderItem={({ item }) => (
              <Pressable onPress={handleRedirectToAuthor(item.id)}>
                <AuthorListItem author={item} />
              </Pressable>
            )}
          />
        )}
      </Box>
    </SafeAreaView>
  )
}

export default TrendingAuthorsScreen
