import { useAppTheme } from '@application/hooks'
import { Podcast } from '@application/types'
import Box from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import Puntuation from '@system/molecules/Puntuation'
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

const PodcastHottestPreview: React.FC<Props> = ({ podcast, ...rest }) => {
  const { averagePuntuation, title, subjects, coverImage } = podcast
  const { borderRadii, colors } = useAppTheme()
  const [firstSubject] = subjects

  return (
    <Pressable {...rest}>
      <ImageBackground
        style={styles.wrapper}
        imageStyle={{ borderRadius: borderRadii.md }}
        source={{ uri: coverImage }}>
        <Box flex={1} p="md" borderRadius="md" bg="primaryTextTransparent">
          <Puntuation
            puntuation={averagePuntuation}
            iconColor={colors.warning}
            iconSize="md"
          />
          <Box>
            <Text color="buttonTextPrimary">{title}</Text>
            <Text color="primary">{firstSubject?.tag}</Text>
          </Box>
        </Box>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: 210,
    height: 210,
  },
})

export default PodcastHottestPreview
