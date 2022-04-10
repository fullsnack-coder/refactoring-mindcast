import Box, { BoxProps } from '@system/atoms/Box'
import { Pressable } from 'react-native'
import StepPanelThumb, { Thumb } from './StepPanelThumb'

type ThumbsConfig = {
  thumbs: Thumb[]
}

export type Props = {
  activeThumbIndex: number
  thumbsConfig: ThumbsConfig
  containerProps?: BoxProps
  onPressThumb?: (index: number) => void
}

const StepPanelThumbs: React.FC<Props> = ({
  activeThumbIndex,
  containerProps,
  onPressThumb,
  thumbsConfig,
}) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      minWidth="100%"
      {...containerProps}>
      {thumbsConfig.thumbs.map((thumb, idx) => (
        <Pressable
          key={`${thumb.index}__${idx}`}
          onPress={() => onPressThumb?.(thumb.index)}>
          <StepPanelThumb
            active={activeThumbIndex === thumb.index}
            thumb={thumb}
          />
        </Pressable>
      ))}
    </Box>
  )
}

export default StepPanelThumbs
