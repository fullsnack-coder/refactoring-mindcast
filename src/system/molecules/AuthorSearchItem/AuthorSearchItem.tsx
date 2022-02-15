import { useAppTheme } from '@application/hooks'
import { Author } from '@application/types'
import Box, { BoxProps } from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Typography from '@system/atoms/Typography'
import Avatar from '@system/molecules/Avatar'

import { useCallback } from 'react'
import { Pressable } from 'react-native'

const { Text } = Typography

type Props = {
  author: Author
  onPressSearchButton?: (author?: Author) => void
} & BoxProps

const AuthorSearchItem: React.FC<Props> = ({
  author,
  onPressSearchButton,
  ...rest
}) => {
  const { avatarUrl, firstName } = author
  const { colors } = useAppTheme()

  const handlePress = useCallback(() => {
    onPressSearchButton?.(author)
  }, [onPressSearchButton])

  return (
    <Box
      alignItems="center"
      borderRadius="sm"
      bg="primaryBackground"
      flexDirection="row"
      px="md"
      py="sm"
      {...rest}>
      <Avatar avatarUri={avatarUrl} name={firstName} size="small" />
      <Box justifyContent="center" flex={1} px="md">
        <Text color="primaryText" numberOfLines={1}>
          {firstName}
        </Text>
      </Box>
      <Pressable
        onPress={handlePress}
        hitSlop={{ bottom: 5, left: 5, right: 5, top: 5 }}>
        <Box p="sm" borderRadius="xxl" bg="secondaryBackground">
          <Icon name="magnify" size="md" color={colors.primaryText} />
        </Box>
      </Pressable>
    </Box>
  )
}

export default AuthorSearchItem
