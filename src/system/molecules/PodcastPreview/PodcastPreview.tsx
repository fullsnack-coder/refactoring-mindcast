import { useAppTheme } from '@application/hooks'
import { Podcast } from '@application/types'
import Box from '@system/atoms/Box'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import Avatar from '@system/molecules/Avatar'
import {
  ImageBackground,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native'

const { Text } = Typography

type Props = {
  podcast: Podcast
} & PressableProps

const PodcastPreview: React.FC<Props> = ({ podcast, ...rest }) => {
  const { author, coverImage, subjects } = podcast
  const [firstSubject] = subjects
  const { textSize, borderRadii } = useAppTheme()

  return (
    <Pressable {...rest}>
      <ImageBackground
        style={styles.wrapper}
        imageStyle={{ borderRadius: borderRadii.md }}
        source={{ uri: coverImage }}>
        <Box
          bg="darkOverlay"
          borderRadius="md"
          flex={1}
          justifyContent="space-between"
          p="md">
          <Box flexDirection="row" alignItems="center">
            <Avatar
              name={author.firstName}
              avatarUri={author.avatarUrl}
              size="small"
            />
            <Separator x={12} />
            <Text numberOfLines={1} color="buttonTextPrimary">{`${
              author.firstName
            } ${author.lastName || ''}`}</Text>
          </Box>
          <Box>
            <Text color="buttonTextPrimary" fontSize={textSize.lg}>
              {podcast.title}
            </Text>
            <Text color="primary">{firstSubject?.tag}</Text>
          </Box>
        </Box>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: 240,
    height: 240,
  },
})

export default PodcastPreview
