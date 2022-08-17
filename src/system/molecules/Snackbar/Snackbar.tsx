import Box, { BoxProps } from '@system/atoms/Box'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'

const { Text } = Typography

type SnackbarType = 'success' | 'info' | 'warning' | 'error'

export type Props = {
  content: string | JSX.Element
  containerProps?: BoxProps
  left?: JSX.Element
  right?: JSX.Element
  type: SnackbarType // TODO: make different styles for different types
}

const Snackbar: React.FC<Props> = ({
  content,
  left,
  right,
  containerProps,
  type: _,
}) => {
  return (
    <Box
      p={typeof content === 'string' ? 'md' : undefined}
      bg="secondaryBackground"
      mx="md"
      borderRadius="sm"
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      {...containerProps}>
      {left ? (
        <>
          {left}
          <Separator x={6} />
        </>
      ) : null}
      {typeof content === 'string' ? (
        <Text
          color="primaryText"
          fontSize={16}
          textAlign="left"
          style={{ flex: 1 }}>
          {content}
        </Text>
      ) : (
        content
      )}
      {right ? (
        <>
          <Separator x={6} />
          {right}
        </>
      ) : null}
    </Box>
  )
}

export default Snackbar
