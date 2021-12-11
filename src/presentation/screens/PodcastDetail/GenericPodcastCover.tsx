import Box, { BoxProps } from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'

const { Text } = Typography

const GenericPodcastCover: React.FC<BoxProps> = props => {
  return (
    <Box
      alignItems="center"
      borderRadius="sm"
      bg="primaryText"
      height={160}
      width={130}
      justifyContent="center"
      p="sm"
      {...props}>
      <Text color="buttonTextPrimary" fontWeight="bold">
        Image not available
      </Text>
    </Box>
  )
}

export default GenericPodcastCover
