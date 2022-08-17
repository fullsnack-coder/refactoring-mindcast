import { useAppTheme } from '@application/hooks'
import Box, { BoxProps } from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import TimeSlider from '@system/molecules/TimeSlider'
import { Pressable } from 'react-native'

type Props = {
  actions: {
    onPlay?: () => void
    onPause?: () => void
    onSeek?: (time: number) => void
    onNext?: () => void
    onPrev?: () => void
  }
  audioInfo: {
    isPlaying: boolean
    currentTime: number
    durationInSeconds: number
    position: {
      total: number
      current: number
    }
  }
  containerProps?: BoxProps
}

const AudioplayerControls: React.FC<Props> = ({
  actions,
  audioInfo,
  containerProps,
}) => {
  const { colors } = useAppTheme()
  const {
    isPlaying,
    durationInSeconds,
    currentTime: currentPlayerTime,
    position: { current: currentPosition, total },
  } = audioInfo

  const isFirst = currentPosition === 0
  const isLast = currentPosition === total - 1

  return (
    <Box {...containerProps}>
      <TimeSlider
        initialTime={currentPlayerTime}
        onSeekTo={actions.onSeek}
        durationInSeconds={durationInSeconds}
      />
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="sm">
        <Pressable onPress={actions.onPrev} disabled={isFirst}>
          <Box p="sm" opacity={isFirst ? 0.5 : 1}>
            <Icon color={colors.primaryText} name="skip-previous" size="lg" />
          </Box>
        </Pressable>
        <Pressable onPress={isPlaying ? actions.onPause : actions.onPlay}>
          <Box
            bg="primary"
            borderColor="primaryTransparent"
            borderRadius="xxl"
            borderWidth={8}
            p="md">
            <Icon
              color={colors.buttonTextPrimary}
              name={isPlaying ? 'pause' : 'play'}
              size="lg"
            />
          </Box>
        </Pressable>
        <Pressable disabled={isLast} onPress={actions.onNext}>
          <Box p="sm" opacity={isLast ? 0.5 : 1}>
            <Icon color={colors.primaryText} name="skip-next" size="lg" />
          </Box>
        </Pressable>
      </Box>
    </Box>
  )
}

export default AudioplayerControls
