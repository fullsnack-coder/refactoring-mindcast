import { useAppTheme } from '@application/hooks'
import { Author } from '@application/types'
import Box from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import AuthorSearchItem from '@system/molecules/AuthorSearchItem'
import { FlatList, ScrollView } from 'react-native'

const { Text } = Typography

type Props = {
  authors: Author[]
  onTapAuthor: (author: Author) => void
}

const AuthorsView: React.FC<Props> = ({ authors, onTapAuthor }) => {
  const { spacing } = useAppTheme()
  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: spacing.sm }}
      ItemSeparatorComponent={() => <Box height={12} />}
      data={authors}
      renderItem={({ item: author }) => (
        <AuthorSearchItem
          key={author.id}
          author={author}
          onPressSearchButton={onTapAuthor}
        />
      )}
    />
  )
}

export default AuthorsView
