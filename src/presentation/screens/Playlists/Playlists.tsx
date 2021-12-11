import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import { PlaylistStackParamList } from '@application/navigation/Playlists'
import {
  playlistGetPlaylistsStart,
  playlistStartAddPodcast,
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

  const { podcastIdToAdd, renderAddPlaylistActionable = false } =
    route.params || {}

  const toggleCreatePlaylistModal = useCallback(() => {
    createPlaylistModalRef.current?.show()
  }, [])

  const handleAddToPlaylist = useCallback(
    (item: Playlist) => {
      if (!podcastIdToAdd) return
      dispatch(
        playlistStartAddPodcast({
          updateInfo: {
            playlistId: item.id,
            podcastId: podcastIdToAdd,
          },
        }),
      )
    },
    [dispatch, podcastIdToAdd],
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
