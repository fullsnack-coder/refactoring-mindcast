import { useAudioPlayerContext } from '@application/context/audioPlayer'
import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import { downloadEpisodeRemoveRequest } from '@application/store/modules/downloads'
import { Episode } from '@application/types'
import { getHitSlop } from '@application/utils/tools'

import RemoveEpisodeModal, {
  ModalRef,
} from '@presentation/containers/RemoveEpisodeModal'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Typography from '@system/atoms/Typography'
import EpisodeListItem from '@system/molecules/EpisodeListItem'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Pressable, SectionList } from 'react-native'

const { Text, Heading } = Typography
const hitSlop = getHitSlop()

type Props = {
  onPlayEpisode?: (info: { episode: Episode; isPlaying: boolean }) => void
}

const DownloadsCollection: React.FC<Props> = ({ onPlayEpisode }) => {
  const { colors } = useAppTheme()
  const { actions, currentTrack } = useAudioPlayerContext()
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null)
  const confirmRemoveModalRef = useRef<ModalRef>(null)

  const dispatch = useAppDispatch()
  const { episodes, error, isLoading } = useAppSelector(
    ({ downloads: { episodes } }) => episodes,
  )

  const sectionEpisodes = useMemo(() => {
    const episodesByArtist = episodes.reduce(
      (acc: Record<string, Episode[]>, episode) => {
        const { artist = 'Unknowed Artist' } = episode
        acc[artist] ??= []
        acc[artist] = [...acc[artist], episode]
        return acc
      },
      {},
    )

    return Object.entries(episodesByArtist).map(([artist, artistEpisodes]) => ({
      title: artist,
      data: artistEpisodes,
    }))
  }, [episodes])

  const handlePlayEpisode = useCallback(
    (episode: Episode) => () => {
      const { title, localUrl, url, artist, duration, coverUrl } = episode
      const isPlaying = currentTrack?.url === (localUrl || url)

      if (!isPlaying) {
        actions.reset()
        actions.addTracks([
          {
            title: title,
            url: localUrl || url,
            artist: artist,
            duration: duration,
            artwork: coverUrl,
          },
        ])
        actions.play()
      }
      onPlayEpisode?.({ episode, isPlaying })
    },
    [actions, onPlayEpisode, currentTrack],
  )

  const handleRemoveFromDownloads = useCallback(
    (episode: Episode) => () => {
      setSelectedEpisode(episode)
      confirmRemoveModalRef.current?.show()
    },
    [currentTrack],
  )

  if (isLoading || error) return null

  return (
    <>
      <SectionList
        sections={sectionEpisodes}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={episode => episode.id}
        ListEmptyComponent={() => (
          <Box flex={1} alignItems="center" justifyContent="center" px="md">
            <Heading color="primaryText" variant="subheading">
              Your download list is empty :(
            </Heading>
          </Box>
        )}
        renderSectionHeader={({ section }) => (
          <Box p="md" bg="primaryBackgroundOverlay">
            <Text color="primaryText">{section.title}</Text>
          </Box>
        )}
        renderItem={({ item }) => {
          const isPlaying = currentTrack?.url === (item.localUrl || item.url)

          return (
            <EpisodeListItem
              episode={item}
              renderLeftItem={
                <Pressable
                  hitSlop={hitSlop}
                  onPress={handlePlayEpisode(item)}
                  style={{ marginRight: 12 }}>
                  <Icon
                    color={
                      isPlaying ? colors.primary : colors.secondaryBackground
                    }
                    name="play-circle-outline"
                    size="md"
                  />
                </Pressable>
              }
              renderRightItem={
                <Pressable
                  hitSlop={hitSlop}
                  onPress={handleRemoveFromDownloads(item)}
                  style={{ marginLeft: 16 }}>
                  <Icon
                    color={
                      isPlaying ? colors.primary : colors.secondaryBackground
                    }
                    name="minus-circle-outline"
                    size="md"
                  />
                </Pressable>
              }
            />
          )
        }}
      />
      <RemoveEpisodeModal
        ref={confirmRemoveModalRef}
        onRemove={() => {
          if (selectedEpisode) {
            const { id, podcastId, localUrl, url } = selectedEpisode
            const isPlaying = currentTrack?.url === (localUrl || url)
            if (isPlaying) actions.reset()

            dispatch(downloadEpisodeRemoveRequest(id, podcastId))
            setSelectedEpisode(null)
          }
        }}
      />
    </>
  )
}

export default DownloadsCollection
