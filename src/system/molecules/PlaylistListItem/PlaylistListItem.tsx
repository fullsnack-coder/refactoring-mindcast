import { useAppTheme } from '@application/hooks'
import { Playlist } from '@application/types'
import Box, { BoxProps } from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'

const { Text } = Typography

const GenericCoverImage: React.FC = () => {
  const { colors } = useAppTheme()
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      width={50}
      height={50}
      bg="primaryText"
      borderRadius="md">
      <Icon name="headphones" color={colors.primary} size="md" />
    </Box>
  )
}

type Props = {
  playlistInfo: Playlist
  containerProps?: BoxProps
  renderRightComponent?: JSX.Element | null
}

const PlaylistListItem: React.FC<Props> = ({
  playlistInfo,
  containerProps,
  renderRightComponent,
}) => {
  const { name, podcasts, coverImage } = playlistInfo
  const { colors, textSize, borderRadii } = useAppTheme()
  const containsPodcasts = podcasts.length > 0

  return (
    <Box flexDirection="row" p="md" alignItems="center" {...containerProps}>
      {coverImage ? (
        <Image
          sourceUri={coverImage}
          width={50}
          height={50}
          style={{ borderRadius: borderRadii.md }}
        />
      ) : (
        <GenericCoverImage />
      )}
      <Box ml="md" mr={renderRightComponent ? 'md' : undefined} flex={1}>
        <Text color="primaryText" fontSize={textSize.md}>
          {name}
        </Text>
        <Box alignItems="center" flexDirection="row">
          <Text color="secondaryText" fontSize={textSize.sm}>
            {containsPodcasts
              ? `${podcasts.length} podcast${podcasts.length > 1 ? 's' : ''}`
              : 'playlist empty'}
          </Text>
          <Separator x={10} />
          <Icon
            name="cloud-download-outline"
            size="sm"
            color={colors.secondaryBackground}
          />
        </Box>
      </Box>
      {renderRightComponent}
    </Box>
  )
}

export default PlaylistListItem
