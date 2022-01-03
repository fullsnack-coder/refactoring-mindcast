import Box, { BoxProps } from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'

const { Text } = Typography

type SnackbarType = 'success' | 'info' | 'warning' | 'error'

export type Props = {
  content: string | JSX.Element
  containerProps?: BoxProps
  type: SnackbarType // TODO: make different styles for different types
}

const Snackbar: React.FC<Props> = ({ content, containerProps, type: _ }) => {
  return (
    <Box
      p={typeof content === 'string' ? 'md' : undefined}
      bg="primaryBackground"
      mx="md"
      borderRadius="sm"
      {...containerProps}>
      {typeof content === 'string' ? (
        <Text color="primaryText" fontSize={16}>
          {content}
        </Text>
      ) : (
        content
      )}
    </Box>
  )
}

export default Snackbar
