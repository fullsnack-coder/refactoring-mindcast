import { useAppTheme } from '@application/hooks'
import useTopicResults from '@application/hooks/useTopicResults'
import {
  HomeTabsParamList,
  SearchStackParamList,
} from '@application/navigation/AppHome'
import { Author } from '@application/types'
import {
  AuthorsView,
  FeaturedView,
  TrendingView,
} from '@presentation/containers/TopicViews'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icon from '@system/atoms/Icon'
import Image from '@system/atoms/Image'
import Ribbon from '@system/molecules/Ribbon'
import StepPanelSlider from '@system/organisms/StepsPanelSlider'
import { useCallback } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, 'topic'>,
  BottomTabScreenProps<HomeTabsParamList>
>

const TopicScreen: React.FC<Props> = ({ navigation, route }) => {
  const {
    params: { topic },
  } = route
  const { coverUrl, tag } = topic
  const { authors, hottestPodcasts, newestPodcasts } = useTopicResults(tag)
  const { colors } = useAppTheme()

  const redirectToPodcastDetail = useCallback(
    podcastId => {
      navigation.navigate('podcast-details', { podcastId })
    },
    [navigation],
  )

  const redirectToAuthorDetail = useCallback(
    ({ id }: Author) => {
      navigation.navigate('author-details', { authorId: id })
    },
    [navigation],
  )

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <StatusBar backgroundColor={colors.darkOverlay} translucent />
      <Ribbon
        title={tag}
        containerProps={{
          bg: 'darkOverlay',
          elevation: undefined,
          position: 'absolute',
          top: StatusBar.currentHeight,
          zIndex: 1,
        }}
        onPressLeftButton={navigation.goBack}
        titleProps={{ color: 'buttonTextPrimary' }}
        renderLeft={
          <Icon
            color={colors.buttonTextPrimary}
            name="arrow-left"
            size="md"
            style={{ marginLeft: 16 }}
          />
        }
      />
      <Image sourceUri={coverUrl} width="100%" height={200} />
      <StepPanelSlider
        thumb={{
          config: {
            thumbs: [
              { index: 0, thumbContent: 'FEATURED' },
              { index: 1, thumbContent: 'TRENDING' },
              { index: 2, thumbContent: 'AUTHORS' },
            ],
          },
        }}>
        <FeaturedView
          podcasts={hottestPodcasts}
          onTapPodcast={redirectToPodcastDetail}
        />
        <TrendingView
          podcasts={newestPodcasts}
          onTapPodcast={redirectToPodcastDetail}
        />
        <AuthorsView authors={authors} onTapAuthor={redirectToAuthorDetail} />
      </StepPanelSlider>
    </SafeAreaView>
  )
}

export default TopicScreen
