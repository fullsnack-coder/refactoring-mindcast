import { useAppTheme } from '@application/hooks'
import useAuthor from '@application/hooks/useAuthor'
import NoDataComponent from '@presentation/containers/NoDataComponent'
import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import AuthorCard from '@system/molecules/AuthorCard'
import Badge from '@system/molecules/Badge'
import PodcastHottestPreview from '@system/molecules/PodcastHottestPreview'
import PodcastListItem from '@system/molecules/PodcastListItem'
import Ribbon from '@system/molecules/Ribbon'
import Section from '@system/molecules/Section'
import AuthorCover from '@system/organisms/AuthorCover'

import { useCallback } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native'

const { Text } = Typography

type ScreenParams = {
  authorDetails: {
    authorId: string
  }
}

const AuthorDetailScreen: React.FC = () => {
  const { colors, spacing, textSize } = useAppTheme()
  const {
    params: { authorId },
  } = useRoute<RouteProp<ScreenParams, 'authorDetails'>>()
  const navigation = useNavigation()
  const { authorInfo, error, isLoading } = useAuthor(authorId)

  const handleRedirectToPodcast = useCallback(
    (podcastId: string) => () => {
      navigation.dispatch(StackActions.push('podcast-details', { podcastId }))
    },
    [navigation],
  )

  const handleRedirectToAuthor = useCallback(
    (redirectId: string) => () => {
      navigation.dispatch(
        StackActions.push('author-details', { authorId: redirectId }),
      )
    },
    [navigation],
  )

  const {
    firstName,
    avatarUrl,
    description,
    subjects,
    relatedAuthors,
    newReleases,
    featured,
  } = authorInfo! || {}

  if (error || isLoading)
    return (
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg="primaryBackground">
        <ActivityIndicator size="large" color={colors.primary} />
        <Separator y={12} />
        <Typography.Text>Loading info about this author</Typography.Text>
      </Box>
    )

  return (
    <>
      <Box flex={1} position="relative" bg="primaryBackground">
        <Box position="absolute" top={22} zIndex={99}>
          <Ribbon
            title=""
            containerProps={{ bg: 'transparent' }}
            onPressLeftButton={navigation.goBack}
            renderLeft={
              <Box p="sm" bg="darkOverlay" borderRadius="xxl" ml="sm">
                <Icon
                  name="arrow-left"
                  size="md"
                  color={colors.buttonTextPrimary}
                />
              </Box>
            }
          />
        </Box>
        <ScrollView>
          <AuthorCover avatar={avatarUrl as string} name={firstName} />
          <Section title="About">
            <Box px="md">
              <Text color="primaryText">
                {description || "This author doesn't have any description"}
              </Text>
            </Box>
          </Section>
          <Separator y={22} />
          {subjects?.length > 0 ? (
            <>
              <Section title="Subjects">
                <Box flexDirection="row" px="md" flexWrap="wrap">
                  {subjects.map(({ id, tag }) => (
                    <Badge
                      key={id}
                      text={tag}
                      containerProps={{ mr: 'sm', mb: 'sm' }}
                    />
                  ))}
                </Box>
              </Section>
              <Separator y={22} />
            </>
          ) : null}
          <Section
            title="New Releases"
            callToActionButton={
              newReleases?.length > 0 ? (
                <Button text="LISTEN NOW" type="primary" size="sm" />
              ) : null
            }>
            <FlatList
              data={newReleases}
              horizontal
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingLeft: spacing.md }}
              ItemSeparatorComponent={() => <Separator x={22} />}
              ListEmptyComponent={
                <NoDataComponent
                  noDataMessage="This author doesn't have new releases"
                  extraProps={{ renderAs: 'text' }}
                />
              }
              renderItem={({ item }) => (
                <PodcastHottestPreview
                  onPress={handleRedirectToPodcast(item.id)}
                  podcast={item}
                />
              )}
            />
          </Section>
          <Separator y={22} />
          {featured ? (
            <Section
              title="Featured"
              callToActionButton={<Button size="sm" text="LISTEN NOW" />}>
              {featured?.map((featuredPodcast, index) => (
                <Pressable
                  key={featuredPodcast.id}
                  onPress={handleRedirectToPodcast(featuredPodcast.id)}>
                  <PodcastListItem
                    podcast={featuredPodcast}
                    renderLeftItem={
                      <Box px="sm">
                        <Text>{index}</Text>
                      </Box>
                    }
                  />
                </Pressable>
              ))}
            </Section>
          ) : null}
          {relatedAuthors ? (
            <Section title="Related Authors">
              <FlatList
                data={relatedAuthors}
                horizontal
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingHorizontal: spacing.md }}
                ListEmptyComponent={
                  <NoDataComponent
                    noDataMessage="There are no authors related to this"
                    extraProps={{
                      messageProps: {
                        fontSize: textSize.md,
                      },
                      renderAs: 'text',
                    }}
                  />
                }
                ItemSeparatorComponent={() => <Separator x={spacing.md} />}
                renderItem={({ item }) => (
                  <AuthorCard.Related
                    author={item}
                    onPress={handleRedirectToAuthor(item.id)}
                  />
                )}
              />
            </Section>
          ) : null}
          <Separator y={42} />
        </ScrollView>
      </Box>
    </>
  )
}

export default AuthorDetailScreen
