import { useAppTheme } from '@application/hooks'
import { Podcast } from '@application/types'
import Box from '@system/atoms/Box'
import MessageScreen from '@system/molecules/MessageScreen'
import PodcastFeatured from '@system/molecules/PodcastFeatured'
import { FlatList, FlatListProps } from 'react-native'

type Props = {
  podcasts: Podcast[]
  onTapPodcast?: (podcastID: string) => void
} & Omit<FlatListProps<Podcast>, 'data' | 'renderItem'>

const FeaturedView: React.FC<Props> = ({
  podcasts,
  onTapPodcast = () => {},
  ...rest
}) => {
  const { colors, spacing } = useAppTheme()

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: colors.primaryBackground,
        paddingVertical: spacing.md,
        flexGrow: 1,
      }}
      style={{ flex: 1 }}
      keyExtractor={({ id }) => id}
      ListEmptyComponent={
        <Box pt="xxl" alignItems="center" flex={1}>
          <MessageScreen
            message="There is no featured podcasts found"
            renderAs="text"
          />
        </Box>
      }
      ItemSeparatorComponent={() => <Box height={2} />}
      data={podcasts}
      renderItem={({ item: podcast }) => (
        <PodcastFeatured
          key={podcast.id}
          podcast={podcast}
          redirectAction={onTapPodcast}
        />
      )}
      {...rest}
    />
  )
}

export default FeaturedView
