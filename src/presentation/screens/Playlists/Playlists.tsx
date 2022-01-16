import { useNotifications } from '@application/context/notifications'
import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import { PlaylistStackParamList } from '@application/navigation/Playlists'
import {
  playlistGetPlaylistsStart,
  playlistStartAddPodcast,
  playlistStartRemovePodcast,
} from '@application/store/modules/playlists'
import { Playlist } from '@application/types'
import CreatePlaylistModal, {
  CreatePlaylistModalRef,
} from '@presentation/containers/CreatePlaylistModal'
import PlaylistsCollection from '@presentation/containers/PlaylistsCollection'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Ribbon from '@system/molecules/Ribbon'

import { useCallback, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<PlaylistStackParamList, 'playlists'>

const PlaylistScreen: React.FC<Props> = ({ navigation, route }) => {
  const { colors } = useAppTheme()
  const createPlaylistModalRef = useRef<CreatePlaylistModalRef>(null)
  const { playlists } = useAppSelector(state => state.playlists)
  const dispatch = useAppDispatch()
  const { showNotification } = useNotifications()

  const { podcastIdToAdd, renderAddPlaylistActionable = false } =
    route.params || {}

  const toggleCreatePlaylistModal = useCallback(() => {
    createPlaylistModalRef.current?.show()
  }, [])

  const handleAddToPlaylist = useCallback(
    ({ id: playlistId, podcasts }: Playlist) => {
      if (!podcastIdToAdd) return
      const podcastIds = podcasts.map(({ id }) => id)
      const isInPlaylist = podcastIds.includes(podcastIdToAdd)
      if (isInPlaylist) {
        dispatch(
          playlistStartRemovePodcast({
            updateInfo: {
              playlistId,
              podcastId: podcastIdToAdd,
            },
            onSuccess: () =>
              showNotification({
                content: 'Podcast removed from playlist successfully',
              }),
            onError: () =>
              showNotification({
                content: 'Error removing podcast from playlist',
              }),
          }),
        )
      } else {
        dispatch(
          playlistStartAddPodcast({
            updateInfo: {
              playlistId,
              podcastId: podcastIdToAdd,
            },
            onSuccess: () =>
              showNotification({
                content: 'Podcast added to playlist successfully',
              }),
            onError: () =>
              showNotification({
                content: 'Error adding podcast to playlist',
              }),
          }),
        )
      }
    },
    [dispatch, podcastIdToAdd, showNotification],
  )

  useEffect(() => {
    if (playlists.length === 0) dispatch(playlistGetPlaylistsStart({}))
  }, [playlists, dispatch])

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1}>
        <Ribbon
          title="Playlists"
          onPressLeftButton={navigation.goBack}
          onPressRightButton={toggleCreatePlaylistModal}
          renderLeft={
            <Icon
              name="arrow-left"
              size="md"
              color={colors.primaryText}
              style={{ paddingLeft: 16 }}
            />
          }
          renderRight={
            <Icon
              name="plus"
              size="md"
              color={colors.primaryText}
              style={{ paddingRight: 16 }}
            />
          }
        />
        <PlaylistsCollection
          enableAddToPlaylistButtons={renderAddPlaylistActionable}
          addToPlaylistMethod={handleAddToPlaylist}
          onPressItem={({ id: playlistId }) =>
            navigation.navigate('playlistDetails', { playlistId })
          }
          podcastIdToAdd={podcastIdToAdd}
        />
        <CreatePlaylistModal
          dismissable
          ref={createPlaylistModalRef}
          containerProps={{ px: 'md' }}
        />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default PlaylistScreen
