import Box, { BoxProps } from '@system/atoms/Box'
import Typography, { TextProps } from '@system/atoms/Typography'

const { Heading, Text } = Typography

export type Props = {
  containerProps?: BoxProps
  messageProps?: TextProps
  message: string
  renderAs?: 'heading' | 'text'
}

const MessageScreen: React.FC<Props> = ({
  containerProps = {},
  messageProps = {},
  message = '',
  renderAs = 'heading',
}) => {
  return (
    <Box {...containerProps}>
      {renderAs === 'heading' ? (
        <Heading {...messageProps}>{message}</Heading>
      ) : (
        <Text {...messageProps}>{message}</Text>
      )}
    </Box>
  )
}

export default MessageScreen
