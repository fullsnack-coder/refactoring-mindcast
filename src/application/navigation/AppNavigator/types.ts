import { HomeTabsParamList } from '@application/navigation/AppHome'
import { AuthStackParamList } from '@application/navigation/Auth'
import { PlaylistStackParamList } from '@application/navigation/Playlists'
import { Podcast } from '@application/types'
import { NavigatorScreenParams } from '@react-navigation/native'

export type AppStackParamList = {
  onboarding: undefined
  auth: NavigatorScreenParams<AuthStackParamList>
  interests: undefined
  home: NavigatorScreenParams<HomeTabsParamList>
  about: undefined
  player: {
    podcastId: Podcast['id']
  }
  playlistsStack: NavigatorScreenParams<PlaylistStackParamList>
}
