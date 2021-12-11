import { useAppSelector } from '@application/hooks/store'
import { Playlist } from '@application/types'
import Icon from '@system/atoms/Icon'
import PlaylistListItem from '@system/molecules/PlaylistListItem'
import {
  FlatList,
  FlatListProps,
  Pressable,
  PressableProps,
} from 'react-native'

type Props = {
  onPressItem: (item: Playlist) => void
  containerButtonProps?: PressableProps
  enableAddToPlaylistButtons?: boolean
  addToPlaylistMethod?: (item: Playlist) => void
  listProps?: FlatListProps<Playlist>
}

const PlaylistCollection: React.FC<Props> = ({
  containerButtonProps,
  enableAddToPlaylistButtons = false,
  addToPlaylistMethod,
  listProps,
  onPressItem,
}) => {
  const playlists = useAppSelector(state => state.playlists.playlists)

  return (
    <FlatList
      data={playlists}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem(item)} {...containerButtonProps}>
          <PlaylistListItem
            playlistInfo={item}
            renderRightComponent={
              enableAddToPlaylistButtons ? (
                <Pressable onPress={() => addToPlaylistMethod?.(item)}>
                  <Icon size="md" name="plus-circle-outline" />
                </Pressable>
              ) : null
            }
          />
        </Pressable>
      )}
      {...listProps}
    />
  )
}

export default PlaylistCollection
