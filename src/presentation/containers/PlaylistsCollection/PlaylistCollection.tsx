import { useAppTheme } from '@application/hooks'
import { useAppSelector } from '@application/hooks/store'
import { Playlist } from '@application/types'
import { getHitSlop } from '@application/utils/tools'
import NoDataComponent from '@presentation/containers/NoDataComponent'
import Icon from '@system/atoms/Icon'
import PlaylistListItem from '@system/molecules/PlaylistListItem'
import {
  FlatList,
  FlatListProps,
  Pressable,
  PressableProps,
} from 'react-native'

const hitSlop = getHitSlop()

type Props = {
  onPressItem: (item: Playlist) => void
  containerButtonProps?: PressableProps
  enableAddToPlaylistButtons?: boolean
  addToPlaylistMethod?: (item: Playlist) => void
  listProps?: FlatListProps<Playlist>
  podcastIdToAdd?: string
}

const PlaylistCollection: React.FC<Props> = ({
  containerButtonProps,
  enableAddToPlaylistButtons = false,
  addToPlaylistMethod,
  listProps,
  onPressItem,
  podcastIdToAdd,
}) => {
  const { colors } = useAppTheme()
  const playlists = useAppSelector(state => state.playlists.playlists)

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={playlists}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <NoDataComponent
          noDataMessage="Your playlist collection is empty"
          extraProps={{
            containerProps: {
              px: 'md',
              pt: 'xxl',
              flex: 1,
            },
            messageProps: {
              textAlign: 'center',
            },
          }}
        />
      }
      renderItem={({ item }) => {
        const isIncludedInPlaylist = item.podcasts.some(
          podcast => podcast.id === podcastIdToAdd,
        )
        return (
          <Pressable
            onPress={() => onPressItem(item)}
            {...containerButtonProps}>
            <PlaylistListItem
              playlistInfo={item}
              renderRightComponent={
                enableAddToPlaylistButtons ? (
                  <Pressable
                    onPress={() => addToPlaylistMethod?.(item)}
                    hitSlop={hitSlop}>
                    <Icon
                      size="md"
                      name={
                        isIncludedInPlaylist
                          ? 'check-circle'
                          : 'plus-circle-outline'
                      }
                      color={
                        isIncludedInPlaylist
                          ? colors.primary
                          : colors.secondaryText
                      }
                    />
                  </Pressable>
                ) : null
              }
            />
          </Pressable>
        )
      }}
      {...listProps}
    />
  )
}

export default PlaylistCollection
