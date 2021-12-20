import { useAudioPlayerContext } from '@application/context/audioPlayer'
import { useAppTheme } from '@application/hooks'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import AudioPlayer from '@presentation/containers/AudioPlayer'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Ribbon from '@system/molecules/Ribbon'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<AppStackParamList, 'player'>

const PodcastPlayerScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useAppTheme()
  const { currentTrack } = useAudioPlayerContext()

  const title = `${currentTrack?.title || ''}`

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle="dark-content"
      />
      <Box pb="lg" flex={1} bg="primaryBackground">
        <Ribbon
          title={title}
          containerProps={{ bg: 'transparent', elevation: 0 }}
          onPressLeftButton={navigation.goBack}
          renderLeft={
            <Icon
              name="arrow-left"
              size="md"
              color={colors.primaryText}
              style={{ marginLeft: 16 }}
            />
          }
        />
        <AudioPlayer />
      </Box>
    </SafeAreaView>
  )
}

export default PodcastPlayerScreen
