import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import { DiscoverStackParamList } from '@application/navigation/AppHome'
import { getNewReleasesStart } from '@application/store/modules/podcasts'
import NoDataComponent from '@presentation/containers/NoDataComponent'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import PodcastListItem from '@system/molecules/PodcastListItem'
import Ribbon from '@system/molecules/Ribbon'
import { useCallback, useEffect } from 'react'
import { ActivityIndicator, FlatList, Pressable, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { Text } = Typography

type Props = {} & NativeStackScreenProps<DiscoverStackParamList, 'new-releases'>

const ReleasesScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { colors, spacing } = useAppTheme()
  const { data: releases, status } = useAppSelector(
    state => state.podcasts.newReleases,
  )

  useEffect(() => {
    if (releases.length === 0) dispatch(getNewReleasesStart({}))
  }, [dispatch, releases])

  const handleRedirectToPodcast = useCallback(
    (podcastId: string) => () => {
      navigation.navigate('podcast-details', { podcastId })
    },
    [navigation],
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.secondaryBackground} />
      <Box flex={1} bg="primaryBackground">
        <Ribbon
          title="New Releases"
          onPressLeftButton={navigation.goBack}
          renderLeft={
            <Icon
              color={colors.primaryText}
              name="arrow-left"
              size="md"
              style={{ marginLeft: 16 }}
            />
          }
        />
        {status === 'pending' ? (
          <Box flex={1} alignItems="center" justifyContent="center">
            <ActivityIndicator size="large" color={colors.primary} />
          </Box>
        ) : (
          <FlatList
            data={releases}
            keyExtractor={({ id }) => id}
            ListEmptyComponent={
              <Box flex={1} pt="xxl">
                <NoDataComponent noDataMessage="Sorry we could'nt find any podcast" />
              </Box>
            }
            contentContainerStyle={{ flexGrow: 1, paddingTop: spacing.sm }}
            ItemSeparatorComponent={() => <Separator y={10} />}
            renderItem={({ item, index }) => (
              <Pressable onPress={handleRedirectToPodcast(item.id)}>
                <PodcastListItem
                  podcast={item}
                  renderLeftItem={
                    <Box justifyContent="center" mr="sm">
                      <Text>{index + 1}</Text>
                    </Box>
                  }
                />
              </Pressable>
            )}
          />
        )}
      </Box>
    </SafeAreaView>
  )
}

export default ReleasesScreen
