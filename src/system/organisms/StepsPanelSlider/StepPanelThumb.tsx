import Box from '@system/atoms/Box'
import Typography, { TextProps } from '@system/atoms/Typography'

const { Text } = Typography

export type Thumb = {
  index: number
  thumbContent: JSX.Element | string
}

type Props = {
  active: boolean
  thumb: Thumb
  contentColor?: TextProps['color']
}

const StepPanelThumb: React.FC<Props> = ({
  active,
  contentColor,
  thumb: { thumbContent },
}) => {
  return (
    <Box
      bg="primaryBackground"
      borderBottomWidth={2}
      px="lg"
      py="md"
      borderBottomColor={active ? 'primary' : 'transparent'}>
      {typeof thumbContent === 'string' ? (
        <Text
          color={contentColor || active ? 'primary' : 'primaryText'}
          fontSize={16}>
          {thumbContent}
        </Text>
      ) : (
        thumbContent
      )}
    </Box>
  )
}

export default StepPanelThumb
