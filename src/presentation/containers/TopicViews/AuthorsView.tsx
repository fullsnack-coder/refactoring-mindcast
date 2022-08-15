import { useAppTheme } from '@application/hooks'
import { Author } from '@application/types'
import Box from '@system/atoms/Box'
import AuthorSearchItem from '@system/molecules/AuthorSearchItem'
import MessageScreen from '@system/molecules/MessageScreen'
import { FlatList } from 'react-native'

type Props = {
  authors: Author[]
  onTapAuthor: (author: Author) => void
}

const AuthorsView: React.FC<Props> = ({ authors, onTapAuthor }) => {
  const { spacing } = useAppTheme()
  const { colors } = useAppTheme()

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: spacing.sm,
        backgroundColor: colors.primaryBackground,
        flexGrow: 1,
      }}
      ItemSeparatorComponent={() => <Box height={12} />}
      ListEmptyComponent={
        <Box pt="xxl" alignItems="center" flex={1}>
          <MessageScreen
            message="There is no authors related with this topic found"
            renderAs="text"
            messageProps={{ textAlign: 'center' }}
          />
        </Box>
      }
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
