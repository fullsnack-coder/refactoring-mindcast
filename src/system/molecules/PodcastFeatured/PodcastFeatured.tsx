import { useAppTheme } from '@application/hooks'
import { Podcast } from '@application/types'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import Avatar from '@system/molecules/Avatar'
import Puntuation from '@system/molecules/Puntuation'
import { memo, useCallback } from 'react'
import { Pressable, PressableProps } from 'react-native'

const { Text } = Typography

type Props = {
  podcast: Podcast
  redirectAction: (podcastID: string) => void
} & PressableProps

const PodcastFeaturedPreview: React.FC<Props> = memo(
  ({ podcast, redirectAction, ...rest }) => {
    const { author, averagePuntuation, coverImage, id, title } = podcast
    const { avatarUrl, firstName } = author
    const { borderRadii, colors } = useAppTheme()

    const handlePressRedirect = useCallback(() => {
      redirectAction(id)
    }, [id, redirectAction])

    return (
      <Pressable {...rest}>
        <Box p="sm" flexDirection="row">
          <Image
            sourceUri={coverImage as string}
            style={{ borderRadius: borderRadii.sm, width: 70, height: 90 }}
          />
          <Separator x={12} />
          <Box>
            <Text fontWeight="bold" color="primaryText">
              {title}
            </Text>
            <Puntuation
              puntuation={averagePuntuation}
              maximum={5}
              iconColor={colors.warning}
            />
          </Box>
        </Box>
        <Box alignItems="center" flexDirection="row" p="sm">
          <Box alignItems="center" flex={1} flexDirection="row">
            <Avatar avatarUri={avatarUrl} name={firstName} size="small" />
            <Separator x={12} />
            <Text color="primaryText" fontWeight="bold">
              {firstName}
            </Text>
          </Box>
          <Button text="MORE" type="primary" onPress={handlePressRedirect} />
        </Box>
      </Pressable>
    )
  },
  (prevProps, nextProps) => prevProps.podcast.id === nextProps.podcast.id,
)

export default PodcastFeaturedPreview
