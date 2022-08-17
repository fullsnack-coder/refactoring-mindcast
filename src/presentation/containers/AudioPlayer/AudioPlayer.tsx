import { useAudioPlayerContext } from '@application/context/audioPlayer'
import { useAppTheme } from '@application/hooks'
import Box from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import AudioplayerControls from '@system/organisms/AudioplayerControls'
import { useCallback } from 'react'

const { Text } = Typography

const AudioPlayer: React.FC = () => {
  const { borderRadii, textSize } = useAppTheme()
  const {
    actions,
    audioplayerStatus,
    infoPosition,
    currentTrack,
    progress,
    tracks,
  } = useAudioPlayerContext()

  const handleActionPress = useCallback(() => {
    return actions
  }, [actions])

  if (!currentTrack) return null

  return (
    <Box flex={1} bg="primaryBackground" p="md" justifyContent="space-between">
      <Box alignItems="center" mb="md" justifyContent="center" flex={1}>
        <Image
          height={200}
          width={200}
          sourceUri={currentTrack.artwork as string}
          style={{
            borderRadius: borderRadii.md,
          }}
        />
        <Separator y={22} />
        <Text color="primary" fontSize={textSize.md} textAlign="center">
          {currentTrack.album}
        </Text>
        <Separator y={12} />
        <Text color="primaryText" fontSize={textSize.lg} textAlign="center">
          {currentTrack.title}
        </Text>
      </Box>
      <AudioplayerControls
        actions={{
          onPlay: handleActionPress().play,
          onPause: handleActionPress().pause,
          onSeek: handleActionPress().seekTo,
          onNext: handleActionPress().goToNext,
          onPrev: handleActionPress().goToPrevious,
        }}
        audioInfo={{
          durationInSeconds: progress.duration,
          currentTime: progress.position,
          isPlaying: audioplayerStatus === 'playing',
          position: {
            current: infoPosition.current,
            total: tracks.length,
          },
        }}
      />
    </Box>
  )
}

export default AudioPlayer
