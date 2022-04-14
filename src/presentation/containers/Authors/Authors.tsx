import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Typography from '@system/atoms/Typography'
import Avatar from '@system/molecules/Avatar'
import { Linking, Pressable } from 'react-native'
import { authors } from './utils'

const { Heading, Text } = Typography

type Props = {}

const Authors: React.FC<Props> = () => {
  return (
    <>
      {authors.map((author, idx) => {
        const { avatarURL, description, name, role, socialLinks } = author

        return (
          <Box key={idx} p="sm" mb="md">
            <Heading color="primaryText" fontSize={28} textAlign="center">
              {name}
            </Heading>
            <Text
              color="primaryTextTransparent"
              fontSize={18}
              textAlign="center">
              {role}
            </Text>
            <Box alignItems="center" my="md">
              <Avatar avatarUri={avatarURL} />
            </Box>
            <Box flexDirection="row" justifyContent="center" mb="md">
              {socialLinks.map(({ color, icon, link }, idx) => (
                <Pressable
                  key={idx}
                  style={{ marginLeft: 12 }}
                  onPress={() => Linking.openURL(link)}>
                  <Icon name={icon} color={color} size="lg" />
                </Pressable>
              ))}
            </Box>
            <Text color="primaryText" textAlign="center">
              {description}
            </Text>
          </Box>
        )
      })}
    </>
  )
}

export default Authors
