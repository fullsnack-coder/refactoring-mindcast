import { HomeTabsParamList } from '@application/navigation/AppHome'
import { Podcast } from '@application/types'
import { NavigatorScreenParams } from '@react-navigation/native'

export type AppStackParamList = {
  onboarding: undefined
  auth: undefined
  interests: undefined
  home: NavigatorScreenParams<HomeTabsParamList>
  about: undefined
  player: {
    podcastId: Podcast['id']
  }
}
