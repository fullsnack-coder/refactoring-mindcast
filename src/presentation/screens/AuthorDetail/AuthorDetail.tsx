import { useAppTheme } from '@application/hooks'
import useAuthor from '@application/hooks/useAuthor'
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
import { FlatList, Pressable, ScrollView, StatusBar } from 'react-native'

const { Text } = Typography

type ScreenParams = {
  authorDetails: {
    authorId: string
  }
}

const AuthorDetailScreen: React.FC = () => {
  const { colors, spacing } = useAppTheme()
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
    (authorId: string) => () => {
      navigation.dispatch(StackActions.push('author-details', { authorId }))
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

  if (error || isLoading) return null

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={colors.primaryTextTransparent}
        barStyle="dark-content"
      />
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
              <Text color="primaryText">{description}</Text>
            </Box>
          </Section>
          <Separator y={22} />
          <Section title="Subjects">
            <Box flexDirection="row" px="md" flexWrap="wrap">
              {subjects?.map(({ id, tag }) => (
                <Badge
                  key={id}
                  text={tag}
                  containerProps={{ mr: 'sm', mb: 'sm' }}
                />
              ))}
            </Box>
          </Section>
          <Separator y={22} />
          <Section
            title="New Releases"
            callToActionButton={
              <Button text="LISTEN NOW" type="primary" size="sm" />
            }>
            <FlatList
              data={newReleases}
              horizontal
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingLeft: spacing.md }}
              ItemSeparatorComponent={() => <Separator x={22} />}
              renderItem={({ item }) => (
                <PodcastHottestPreview
                  onPress={handleRedirectToPodcast(item.id)}
                  podcast={item}
                />
              )}
            />
          </Section>
          <Separator y={22} />
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
          <Section title="Related Authors">
            <FlatList
              data={relatedAuthors}
              horizontal
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingHorizontal: spacing.md }}
              ItemSeparatorComponent={() => <Separator x={spacing.md} />}
              renderItem={({ item }) => (
                <AuthorCard.Related
                  author={item}
                  onPress={handleRedirectToAuthor(item.id)}
                />
              )}
            />
          </Section>
          <Separator y={42} />
        </ScrollView>
      </Box>
    </>
  )
}

export default AuthorDetailScreen
