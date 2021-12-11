import { useAppTheme } from '@application/hooks'
import usePodcast from '@application/hooks/usePodcast'
import {
  DiscoverStackParamList,
  HomeTabsParamList,
} from '@application/navigation/AppHome'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import { Podcast } from '@application/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Icon from '@system/atoms/Icon'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import Badge from '@system/molecules/Badge'
import Puntuation from '@system/molecules/Puntuation'
import Ribbon from '@system/molecules/Ribbon'
import Section from '@system/molecules/Section'
import { useCallback } from 'react'
import { Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchAuthorButton from './AuthorSearchButton'
import GenericPodcastCover from './GenericPodcastCover'

const { Text } = Typography

type Props = CompositeScreenProps<
  NativeStackScreenProps<DiscoverStackParamList, 'podcast-details'>,
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabsParamList>,
    NativeStackScreenProps<AppStackParamList>
  >
>

const PodcastDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { params } = route
  const { podcast, isLoading } = usePodcast(params.podcastId)
  const { borderRadii, colors } = useAppTheme()

  const {
    author,
    averagePuntuation,
    coverImage,
    description,
    subjects,
    title,
    id: podcastId,
  } = podcast || ({} as Podcast)

  const handlePressPlayButton = useCallback(() => {
    navigation.navigate('player', { podcastId })
  }, [navigation, podcastId])

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

  if (isLoading || !podcast) return null

  const [firstSubject] = subjects

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <Text color="primaryText">{title}</Text>
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
              <Pressable onPress={() => console.log('download action')}>
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
            <SearchAuthorButton
              author={author}
              onPressAuthorButton={handlePressAuthorButton}
            />
          </Section>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PodcastDetailScreen
