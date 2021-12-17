import { useAppTheme } from '@application/hooks'
import Slider, { SliderProps } from '@react-native-community/slider'
import Box, { BoxProps } from '@system/atoms/Box'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import { useCallback, useState } from 'react'

const { Text } = Typography

export type Props = {
  containerProps?: BoxProps
  durationInSeconds: number
  onSeekTo?: (timeInSeconds: number) => void
} & SliderProps

const TimeSlider: React.FC<Props> = ({
  containerProps,
  durationInSeconds,
  onSeekTo,
  ref: _,
  onValueChange,
  ...rest
}) => {
  const { colors } = useAppTheme()
  const [currentSlideTime, setCurrentSlideTime] = useState(0)

  const handleChangeSlider = useCallback(
    (value: number) => {
      setCurrentSlideTime(value)
      onSeekTo?.(value)
      onValueChange?.(value)
    },
    [onSeekTo, onValueChange],
  )

  return (
    <Box width="100%" {...containerProps}>
      <Slider
        thumbTintColor={colors.primary}
        onValueChange={handleChangeSlider}
        minimumValue={0}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.primaryTextTransparent}
        maximumValue={durationInSeconds}
        value={currentSlideTime}
        {...rest}
      />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        p="sm">
        <Box flexDirection="row">
          <Text>{`00${Math.floor(currentSlideTime / 60)}`.slice(-2)}</Text>
          <Text>:</Text>
          <Text>{`00${Math.floor(currentSlideTime % 60)}`.slice(-2)}</Text>
        </Box>
        <Separator x={20} />
        <Box flexDirection="row">
          <Text>{`00${Math.floor(durationInSeconds / 60)}`.slice(-2)}</Text>
          <Text>:</Text>
          <Text>{`00${Math.floor(durationInSeconds % 60)}`.slice(-2)}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default TimeSlider
