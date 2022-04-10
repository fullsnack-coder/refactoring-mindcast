import { useAppTheme } from '@application/hooks'
import { Podcast } from '@application/types'
import Box from '@system/atoms/Box'
import PodcastTrendingPreview from '@system/molecules/PodcastTrendingPreview'
import { FlatList } from 'react-native'

type Props = {
  podcasts: Podcast[]
  onTapPodcast: (podcastId: string) => void
}

const TrendingViews: React.FC<Props> = ({ podcasts, onTapPodcast }) => {
  const { colors, spacing } = useAppTheme()

  return (
    <FlatList
      style={{ flex: 1 }}
      data={podcasts}
      numColumns={2}
      keyExtractor={({ id }) => id}
      contentContainerStyle={{
        backgroundColor: colors.primaryBackground,
        flexGrow: 1,
        paddingVertical: spacing.md,
      }}
      ItemSeparatorComponent={() => <Box height={22} />}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item: podcast }) => (
        <Box key={podcast.id} width="50%" alignItems="center">
          <PodcastTrendingPreview
            podcast={podcast}
            onTapPodcast={onTapPodcast}
          />
        </Box>
      )}
    />
  )
}

export default TrendingViews
