import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import {
  DiscoverStackParamList,
  HomeTabsParamList,
} from '@application/navigation/AppHome'
import { getHottestsPodcasts } from '@application/store/modules/podcasts'
import { getTopAuthors } from '@application/store/modules/authors'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import AuthorCard from '@system/molecules/AuthorCard'
import PodcastHottestPreview from '@system/molecules/PodcastHottestPreview'
import PodcastPreview from '@system/molecules/PodcastPreview'
import Section from '@system/molecules/Section'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { Heading } = Typography

type Navigation = CompositeNavigationProp<
  NativeStackNavigationProp<DiscoverStackParamList, 'discover'>,
  BottomTabNavigationProp<HomeTabsParamList>
>

const DiscoverScreen: React.FC = () => {
  const { navigate } = useNavigation<Navigation>()
  const { hottestPodcasts, status: podcastsStatus } = useAppSelector(
    state => state.podcasts,
  )
  const { topAuthors: trendingAuthors, status: authorsStatus } = useAppSelector(
    state => state.authors,
  )
  const dispatch = useAppDispatch()
  const [isPulled, setIsPulled] = useState(false)
  const { colors } = useAppTheme()

  const dataIsFetching = useMemo(
    () => authorsStatus === 'started' || podcastsStatus === 'started',
    [authorsStatus, podcastsStatus],
  )

  const loadScreenData = useCallback(() => {
    dispatch(getHottestsPodcasts({}))
    dispatch(getTopAuthors({}))
  }, [dispatch])

  useEffect(() => {
    loadScreenData()
  }, [loadScreenData])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle="dark-content"
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              loadScreenData()
              setIsPulled(true)
            }}
            refreshing={dataIsFetching && isPulled}
            colors={[colors.primary]}
          />
        }>
        {dataIsFetching ? (
          <Box
            bg="primaryBackground"
            flex={1}
            justifyContent="center"
            alignItems="center">
            <ActivityIndicator size="large" color={colors.primary} />
          </Box>
        ) : (
          <Box bg="primaryBackground">
            <Box p="md">
              <Heading>Discover</Heading>
            </Box>
            <Section
              title="New Releases"
              callToActionButton={<Button type="primary" text="SEE ALL" />}>
              <FlatList
                data={hottestPodcasts}
                keyExtractor={({ id }) => id}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                }}
                ItemSeparatorComponent={() => <Separator x={12} />}
                renderItem={({ item }) => <PodcastPreview podcast={item} />}
                horizontal
              />
            </Section>
            <Separator y={32} />
            <Section
              title="Trending Authors"
              callToActionButton={<Button text="SEE ALL" type="primary" />}>
              <FlatList
                horizontal
                ItemSeparatorComponent={() => <Separator x={22} />}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                }}
                data={trendingAuthors}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => <AuthorCard.Trending author={item} />}
              />
            </Section>
            <Separator y={32} />
            <Section
              title="Hottest Podcasts"
              callToActionButton={
                <Button
                  text="SEE ALL"
                  type="primary"
                  onPress={() => navigate('hottest-podcasts')}
                />
              }>
              <FlatList
                horizontal
                ItemSeparatorComponent={() => <Separator x={22} />}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingBottom: 12,
                }}
                data={hottestPodcasts}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                  <PodcastHottestPreview podcast={item} />
                )}
              />
            </Section>
            <Separator y={50} />
          </Box>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default DiscoverScreen
