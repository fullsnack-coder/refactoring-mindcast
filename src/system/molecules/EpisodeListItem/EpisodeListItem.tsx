import { useAppTheme } from '@application/hooks'
import { Episode } from '@application/types'
import { getTime } from '@application/utils/tools'

import Box from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Typography from '@system/atoms/Typography'
import { Pressable, PressableProps } from 'react-native'

const { Text } = Typography

type Props = {
  containerProps?: PressableProps
  episode: Episode
  onPressItem?: () => void
  renderLeftItem?: JSX.Element | null
  renderRightItem?: JSX.Element | null
}

const EpisodeListItem: React.FC<Props> = ({
  episode,
  containerProps,
  renderLeftItem,
  renderRightItem,
  onPressItem,
}) => {
  const { artist, coverUrl, duration, title } = episode
  const { borderRadii, textSize } = useAppTheme()
  const { minutes, seconds } = getTime(duration)

  return (
    <Pressable onPress={onPressItem} {...containerProps}>
      <Box py="sm" px="md" alignItems="center" flexDirection="row">
        {renderLeftItem}
        <Box flex={1} flexDirection="row" alignItems="center">
          {coverUrl ? (
            <Image
              sourceUri={coverUrl}
              height={50}
              width={50}
              style={{ borderRadius: borderRadii.sm }}
            />
          ) : null}
          <Box ml="md">
            <Text color="primaryText" numberOfLines={2}>
              {title}
            </Text>
            <Text color="secondaryBackground" fontSize={textSize.sm}>
              {artist}
            </Text>
          </Box>
        </Box>
        <Text color="primaryText">{`${minutes}:${seconds}`}</Text>
        {renderRightItem}
      </Box>
    </Pressable>
  )
}

export default EpisodeListItem
