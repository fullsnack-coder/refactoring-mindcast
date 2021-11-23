import Box, { BoxProps } from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'

const { Text } = Typography

type Props = {
  text: string
  containerProps?: BoxProps
}

const Badge: React.FC<Props> = ({ text, containerProps }) => (
  <Box
    alignSelf="flex-start"
    bg="primaryText"
    borderRadius="xs"
    p="sm"
    {...containerProps}>
    <Text color="buttonTextPrimary" fontWeight="600" textAlign="center">
      {text}
    </Text>
  </Box>
)

export default Badge
