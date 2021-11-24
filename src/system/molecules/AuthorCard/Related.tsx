import { Author } from '@application/types'
import Box from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Typography from '@system/atoms/Typography'
import { Pressable, PressableProps } from 'react-native'

const { Text } = Typography

type Props = {
  author: Author
} & PressableProps

const AuthorCardTrending: React.FC<Props> = ({ author, ...rest }) => (
  <Pressable {...rest}>
    <Box mb="sm" height={250} width={145} borderRadius="sm" overflow="hidden">
      <Image sourceUri={author.avatarUrl || ''} height="100%" width="100%" />
    </Box>
    <Text color="primaryText">{author.firstName}</Text>
  </Pressable>
)

export default AuthorCardTrending
