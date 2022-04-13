import { useAppTheme } from '@application/hooks'
import { useAppSelector } from '@application/hooks/store'
import { LibraryStackParamList } from '@application/navigation/AppHome'
import { Episode } from '@application/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Typography from '@system/atoms/Typography'
import EpisodeListItem from '@system/molecules/EpisodeListItem'
import Ribbon from '@system/molecules/Ribbon'
import { useCallback } from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { shallowEqual } from 'react-redux'

import { recentlySelector } from './utils'

const { Heading } = Typography

type Props = NativeStackScreenProps<LibraryStackParamList, 'recently-played'>

const EmptyListComponent = () => (
  <Box flex={1} p="md" alignItems="center" justifyContent="center">
    <Heading color="primaryText" variant="subheading">
      Start to listen any episode and visualize here!
    </Heading>
  </Box>
)

const RecentlyPlayedScreen: React.FC<Props> = ({ navigation }) => {
  const recentlyEpisodes = useAppSelector(recentlySelector, shallowEqual)
  const { colors, spacing } = useAppTheme()

  const redirectToPodcast = useCallback(
    (episode: Episode) => () => {
      navigation.navigate('podcast-details', { podcastId: episode.podcastId })
    },
    [navigation],
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="primaryBackground">
        <Ribbon
          title="Recently Played"
          onPressLeftButton={navigation.goBack}
          renderLeft={
            <Icon
              size="md"
              name="arrow-left"
              style={{ marginLeft: 16 }}
              color={colors.primaryText}
            />
          }
        />
        <FlatList
          contentContainerStyle={{ flexGrow: 1, paddingVertical: spacing.md }}
          data={recentlyEpisodes}
          keyExtractor={({ id }) => id}
          ListEmptyComponent={EmptyListComponent}
          ItemSeparatorComponent={() => <Box height={spacing.sm} />}
          renderItem={({ item }) => (
            <EpisodeListItem
              episode={item}
              onPressItem={redirectToPodcast(item)}
            />
          )}
        />
      </Box>
    </SafeAreaView>
  )
}

export default RecentlyPlayedScreen
