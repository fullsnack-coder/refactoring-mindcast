import { Author } from '@application/types'
import Box, { BoxProps } from '@system/atoms/Box'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import Avatar from '@system/molecules/Avatar'

const { Text } = Typography

type Props = { author: Author; containerProps?: BoxProps }

const AuthorListItem: React.FC<Props> = ({ author, containerProps }) => {
  const { firstName, lastName, avatarUrl } = author

  const displayName = `${firstName} ${lastName || ''}`

  return (
    <Box
      alignItems="center"
      flexDirection="row"
      px="md"
      py="sm"
      {...containerProps}>
      <Avatar avatarUri={avatarUrl} size="small" name={displayName} />
      <Separator x={12} />
      <Text>{displayName}</Text>
    </Box>
  )
}

export default AuthorListItem
