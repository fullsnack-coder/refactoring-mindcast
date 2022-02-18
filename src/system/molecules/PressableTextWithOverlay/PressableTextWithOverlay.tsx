import Box, { BoxProps } from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Typography, { TextProps } from '@system/atoms/Typography'
import { useMemo } from 'react'
import { Pressable, PressableProps } from 'react-native'

export type RenderContentType = () => TextProps & { text: string }

type Props = {
  pressableProps?: PressableProps
  overlaySource: string
  containerProps?: BoxProps
  renderContent: RenderContentType
}

const { Text } = Typography

const PressableTextWithOverlay: React.FC<Props> = ({
  containerProps,
  overlaySource,
  pressableProps,
  renderContent,
}) => {
  const { text, ...textProps } = useMemo(() => renderContent(), [renderContent])

  return (
    <Pressable {...pressableProps}>
      <Box position="relative" overflow="hidden" {...containerProps}>
        <Image
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          sourceUri={overlaySource}
        />
        <Box
          width="100%"
          height="100%"
          backgroundColor="darkOverlay"
          alignItems="center"
          justifyContent="center">
          <Text color="primaryBackground" textAlign="center" {...textProps}>
            {text}
          </Text>
        </Box>
      </Box>
    </Pressable>
  )
}

export default PressableTextWithOverlay
