import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import { DiscoverStackParamList } from '@application/navigation/AppHome'
import { getNewReleasesStart } from '@application/store/modules/podcasts'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import PodcastListItem from '@system/molecules/PodcastListItem'
import Ribbon from '@system/molecules/Ribbon'
import { useCallback, useEffect } from 'react'
import { FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { Text } = Typography

type Props = {} & NativeStackScreenProps<DiscoverStackParamList, 'new-releases'>

const ReleasesScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { colors, spacing } = useAppTheme()
  const { data } = useAppSelector(state => state.podcasts.newReleases)

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getNewReleasesStart())
    }
  }, [dispatch, data])

  const handleRedirectToPodcast = useCallback(
    (podcastId: string) => () => {
      navigation.navigate('podcast-details', { podcastId })
    },
    [navigation],
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          contentContainerStyle={{ paddingTop: spacing.sm }}
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
      </Box>
    </SafeAreaView>
  )
}

export default ReleasesScreen
