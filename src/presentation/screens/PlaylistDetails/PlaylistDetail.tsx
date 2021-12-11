import { useAppTheme } from '@application/hooks'
import usePlaylist from '@application/hooks/usePlaylist'
import { PlaylistStackParamList } from '@application/navigation/Playlists'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Icon from '@system/atoms/Icon'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import PodcastListItem from '@system/molecules/PodcastListItem'
import Ribbon from '@system/molecules/Ribbon'
import { FlatList, Pressable } from 'react-native'
import { Switch } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const { Heading, Text } = Typography

const GenericCoverImage: React.FC = () => {
  const { colors } = useAppTheme()
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      width={120}
      height={120}
      bg="primaryText"
      borderRadius="md">
      <Icon name="headphones" color={colors.primary} size="lg" />
    </Box>
  )
}

type Props = {} & NativeStackScreenProps<
  PlaylistStackParamList,
  'playlistDetails'
>

const PlaylistDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { playlistId } = route.params
  const { colors, textSize, borderRadii } = useAppTheme()
  const { playlist } = usePlaylist({ playlistId })

  if (!playlist) return null

  const { name, podcasts, coverImage, description } = playlist

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        <Ribbon
          title="Podcast Detail"
          onPressLeftButton={navigation.goBack}
          renderLeft={
            <Icon
              name="arrow-left"
              size="md"
              style={{ marginLeft: 16 }}
              color={colors.primaryText}
            />
          }
        />
        <Box alignItems="center" flexDirection="row" p="md">
          {coverImage ? (
            <Image
              sourceUri={coverImage}
              style={{ borderRadius: borderRadii.xs }}
            />
          ) : (
            <GenericCoverImage />
          )}
          <Separator x={16} />
          <Box py="sm" flexShrink={1}>
            <Heading color="primaryText" fontSize={textSize.md}>
              {name}
            </Heading>
            {description ? (
              <Text
                color="secondaryText"
                fontSize={textSize.sm}
                style={{ marginTop: 8 }}
                numberOfLines={3}>
                {description}
              </Text>
            ) : null}
            <Separator y={12} />
            <Box flexDirection="row">
              <Button
                type="primary"
                text="PLAY ALL"
                onPress={() => console.log('play all pressed')}
              />
              <Separator x={14} />
              <Button
                scheme="black"
                type="secondary"
                text="SHUFFLE"
                onPress={() => console.log('SHUFFLE pressed')}
              />
            </Box>
          </Box>
        </Box>
        <Box px="md">
          <Box flexDirection="row" my="md">
            <Heading variant="paragraph">Available Offline</Heading>
            <Separator x={14} />
            <Switch value={false} />
          </Box>
          <FlatList
            data={podcasts}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() =>
                  console.log(`redirecting to podcast ${item.title}`)
                }>
                <PodcastListItem
                  renderLeftItem={
                    <Box justifyContent="center" mr="sm">
                      <Text>{`${index + 1}`}</Text>
                    </Box>
                  }
                  podcast={item}
                />
              </Pressable>
            )}
          />
        </Box>
      </Box>
    </SafeAreaView>
  )
}

export default PlaylistDetailsScreen
