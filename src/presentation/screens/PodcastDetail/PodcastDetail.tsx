import { useAudioPlayerContext } from '@application/context/audioPlayer'
import { useAppTheme } from '@application/hooks'
import usePodcast, { PodcastInfo } from '@application/hooks/usePodcast'
import { DiscoverStackParamList } from '@application/navigation/AppHome'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Icon from '@system/atoms/Icon'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import AuthorSearchItem from '@system/molecules/AuthorSearchItem'
import Badge from '@system/molecules/Badge'
import Puntuation from '@system/molecules/Puntuation'
import Ribbon from '@system/molecules/Ribbon'
import Section from '@system/molecules/Section'
import { useCallback } from 'react'
import { ActivityIndicator, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import GenericPodcastCover from './GenericPodcastCover'

const { Text } = Typography

//TODO: change to stackactions when the screen is shared between Navigators
type Navigation = CompositeNavigationProp<
  NativeStackNavigationProp<DiscoverStackParamList>,
  NativeStackNavigationProp<AppStackParamList>
>

type Params = {
  detail: {
    podcastId: string
  }
}

const PodcastDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<Params, 'detail'>>()
  const navigation = useNavigation<Navigation>()
  const { params } = route
  const { podcast, isLoading } = usePodcast(params.podcastId)
  const { borderRadii, colors } = useAppTheme()
  const { actions } = useAudioPlayerContext()

  const {
    author,
    averagePuntuation,
    coverImage,
    description,
    subjects,
    title: podcastTitle,
    id: podcastId,
    episodes,
  } = podcast || ({} as PodcastInfo)

  const handlePressPlayButton = useCallback(() => {
    if (episodes?.length > 0) {
      actions.reset()
      const episodesWithCover = episodes.map(episode => ({
        ...episode,
        coverUrl: episode.coverUrl || coverImage,
      }))

      actions.addEpisodes(episodesWithCover, author, podcastTitle)
      actions.play()
      navigation.navigate('player')
    }
  }, [author, actions, navigation, episodes, podcastTitle, coverImage])

  const handlePressAddButton = useCallback(() => {
    navigation.navigate('playlistsStack', {
      screen: 'playlists',
      params: {
        renderAddPlaylistActionable: true,
        podcastIdToAdd: podcastId,
      },
    })
  }, [navigation, podcastId])

  const handlePressAuthorButton = useCallback(() => {
    navigation.navigate('author-details', { authorId: author.id })
  }, [author, navigation])

  if (isLoading || !podcast)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="large" color={colors.primary} />
        <Separator y={12} />
        <Typography.Text>Loading info about this podcast</Typography.Text>
      </Box>
    )

  const [firstSubject] = subjects

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primaryBackground }}>
      <Ribbon
        title="Podcast Detail"
        onPressLeftButton={navigation.goBack}
        renderLeft={
          <Icon
            name="arrow-left"
            size="md"
            style={{ marginLeft: 16 }}
            color={colors.primaryText}
          />
        }
      />
      <ScrollView>
        <Box flex={1}>
          <Box flexDirection="row" p="md">
            {!coverImage ? (
              <GenericPodcastCover />
            ) : (
              <Image
                sourceUri={coverImage}
                width={130}
                height={160}
                style={{ borderRadius: borderRadii.sm }}
              />
            )}
            <Box flexShrink={1} p="md">
              <Text color="primaryText">{podcastTitle}</Text>
              <Separator y={8} />
              <Puntuation
                puntuation={averagePuntuation}
                maximum={5}
                iconColor={colors.warning}
              />
              <Separator y={8} />
              {firstSubject ? <Badge text={firstSubject.tag} /> : null}
            </Box>
          </Box>
          <Box flexDirection="row" px="md" alignItems="center">
            <Button
              type="primary"
              text="PLAY"
              onPress={handlePressPlayButton}
            />
            <Separator x={12} />
            <Button
              scheme="black"
              type="secondary"
              text="ADD TO PLAYLIST"
              onPress={handlePressAddButton}
            />
            <Separator x={12} />
            <Box flex={1} alignItems="flex-end">
              <Pressable disabled>
                <Box
                  p="sm"
                  justifyContent="center"
                  borderRadius="xxl"
                  borderColor="primaryText"
                  borderWidth={1}>
                  <Icon
                    name="cloud-download-outline"
                    color={colors.primaryText}
                    size="md"
                  />
                </Box>
              </Pressable>
            </Box>
          </Box>
          <Section title="Description">
            <Box px="md">
              <Text>{description}</Text>
            </Box>
          </Section>
          <Separator y={16} />
          <Section title="Author">
            <AuthorSearchItem
              author={author}
              onPressSearchButton={handlePressAuthorButton}
            />
          </Section>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PodcastDetailScreen
