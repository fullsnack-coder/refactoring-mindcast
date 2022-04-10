import { useAppTheme } from '@application/hooks'
import { Podcast } from '@application/types'
import Box, { BoxProps } from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import Avatar from '@system/molecules/Avatar'
import { memo, useCallback } from 'react'
import { Pressable, PressableProps } from 'react-native'

const { Text } = Typography

type Props = {
  containerProps?: BoxProps
  onTapPodcast: (podcastId: Podcast['id']) => void
  podcast: Podcast
} & PressableProps

const PodcastTrendingPreview: React.FC<Props> = memo(
  ({ containerProps, onTapPodcast, podcast, ...rest }) => {
    const { borderRadii } = useAppTheme()
    const { author, coverImage, id: podcastID, title } = podcast
    const { avatarUrl, firstName = '', lastName = '' } = author

    const handleTapPodcastPreview = useCallback(() => {
      onTapPodcast(podcastID)
    }, [podcastID, onTapPodcast])

    return (
      <Pressable onPress={handleTapPodcastPreview} {...rest}>
        <Box maxWidth={175} {...containerProps}>
          <Image
            sourceUri={coverImage as string}
            style={{ borderRadius: borderRadii.sm, height: 220, width: '100%' }}
          />
          <Box my="sm" px="sm">
            <Text color="primaryText">{title}</Text>
          </Box>
          <Box alignItems="center" flexDirection="row" p="sm">
            <Avatar avatarUri={avatarUrl} size="small" />
            <Separator x={12} />
            <Text
              color="primaryText"
              numberOfLines={2}
              style={{
                maxWidth: 100,
              }}>{`${firstName} ${lastName}`}</Text>
          </Box>
        </Box>
      </Pressable>
    )
  },
  (prevProps, nextProps) => prevProps.podcast.id === nextProps.podcast.id,
)

export default PodcastTrendingPreview
