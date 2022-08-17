import { useAppTheme } from '@application/hooks'
import Slider, { SliderProps } from '@react-native-community/slider'
import Box, { BoxProps } from '@system/atoms/Box'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import { useCallback, useEffect, useState } from 'react'

import { getTime } from './utils'

const { Text } = Typography

export type Props = {
  initialTime?: number
  containerProps?: BoxProps
  durationInSeconds: number
  onSeekTo?: (timeInSeconds: number) => void
} & SliderProps

const TimeSlider: React.FC<Props> = ({
  initialTime = 0,
  containerProps,
  durationInSeconds,
  onSeekTo,
  ref: _,
  onValueChange,
  ...rest
}) => {
  const { colors } = useAppTheme()
  const [currentSlideTime, setCurrentSlideTime] = useState(initialTime)
  const [isSliding, setIsSliding] = useState(false)

  const currentTime = getTime(currentSlideTime)
  const totalTime = getTime(durationInSeconds)

  const handleChangeSlider = useCallback(
    (value: number) => {
      setCurrentSlideTime(value)
      onValueChange?.(value)
    },
    [onValueChange],
  )

  const handleSlidingComplete = useCallback(
    (value: number) => {
      setCurrentSlideTime(value)
      setIsSliding(false)
      onSeekTo?.(value)
    },
    [onSeekTo],
  )

  useEffect(() => {
    setCurrentSlideTime(initialTime)
  }, [initialTime])

  return (
    <Box width="100%" {...containerProps}>
      <Slider
        onSlidingComplete={handleSlidingComplete}
        thumbTintColor={colors.primary}
        onValueChange={handleChangeSlider}
        minimumValue={0}
        minimumTrackTintColor={colors.primary}
        onSlidingStart={() => setIsSliding(true)}
        maximumTrackTintColor={colors.primaryTextTransparent}
        maximumValue={durationInSeconds}
        value={!isSliding ? currentSlideTime : undefined}
        {...rest}
      />
      <Box
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        p="sm">
        <Box flexDirection="row">
          <Text>{currentTime.minutes}</Text>
          <Text>:</Text>
          <Text>{currentTime.seconds}</Text>
        </Box>
        <Separator x={20} />
        <Box flexDirection="row">
          <Text>{totalTime.minutes}</Text>
          <Text>:</Text>
          <Text>{totalTime.seconds}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default TimeSlider
