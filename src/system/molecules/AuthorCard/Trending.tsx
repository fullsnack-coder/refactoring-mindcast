import type { Author } from '@application/types'
import Box, { BoxProps } from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import Avatar from '@system/molecules/Avatar'

const { Text } = Typography

type Props = {
  author: Author
  onCallToAction?: (selectedAuthor: Author) => void
} & BoxProps

const AuthorCardTrending: React.FC<Props> = ({
  author,
  onCallToAction,
  ...rest
}) => (
  <Box
    alignItems="center"
    justifyContent="space-between"
    bg="primaryBackground"
    borderRadius="xs"
    elevation={6}
    height={255}
    maxWidth={160}
    px="sm"
    {...rest}>
    <Separator y={16} />
    <Avatar name={author.firsName} avatarUri={author.avatarUrl} />
    <Separator y={22} />
    <Text color="primaryText" textAlign="center" numberOfLines={2}>
      {`${author.firsName} ${author.lastName || ''}`}
    </Text>
    <Separator y={12} />
    <Text
      color="secondaryBackground"
      textAlign="center">{`${author.podcasts} podcasts`}</Text>
    <Separator y={12} />
    <Box>
      <Button
        onPress={() => onCallToAction?.(author)}
        type="primary"
        text="LEARN MORE"
      />
    </Box>
    <Separator y={16} />
  </Box>
)

export default AuthorCardTrending
