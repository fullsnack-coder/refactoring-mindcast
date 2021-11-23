import { useAppTheme } from '@application/hooks'
import { Podcast } from '@application/types'
import Box, { BoxProps } from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Typography from '@system/atoms/Typography'

const { Text } = Typography

type Props = {
  podcast: Podcast
  containerProps?: BoxProps
  renderLeftItem?: JSX.Element | null
  renderRightElement?: JSX.Element | null
}

const PodcastListItem: React.FC<Props> = ({
  podcast,
  renderLeftItem,
  renderRightElement,
  containerProps,
}) => {
  const { coverImage, title, author } = podcast
  const { textSize, borderRadii } = useAppTheme()

  return (
    <Box alignItems="center" flexDirection="row" p="sm" {...containerProps}>
      {renderLeftItem}
      <Box flex={1} flexDirection="row" alignItems="center">
        <Image
          sourceUri={coverImage!}
          height={50}
          width={50}
          style={{ borderRadius: borderRadii.sm }}
        />
        <Box ml="md">
          <Text color="primaryText" numberOfLines={2}>
            {title}
          </Text>
          <Text color="secondaryBackground" fontSize={textSize.sm}>
            {author.firstName}
          </Text>
        </Box>
      </Box>
      {renderRightElement}
    </Box>
  )
}

export default PodcastListItem
