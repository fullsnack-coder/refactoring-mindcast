import { Author, Podcast, Topic } from '@application/types'
import { NavigatorScreenParams } from '@react-navigation/native'

export type HomeTabsParamList = {
  'home-discover': NavigatorScreenParams<DiscoverStackParamList>
  'home-search': NavigatorScreenParams<SearchStackParamList>
  'home-library': NavigatorScreenParams<LibraryStackParamList>
  'home-settings': NavigatorScreenParams<SettingsStackParamList>
}

export type DiscoverStackParamList = {
  discover: undefined
  'podcast-details': {
    podcastId: Podcast['id']
  }
  'author-details': {
    authorId: Podcast['author']['id']
  }
  'new-releases': undefined
  'hottest-podcasts': undefined
  'trending-authors': undefined
}

export type SearchStackParamList = {
  search: undefined
  topic: { topic: Topic }
  'search-results': { searchedTerm: string }
  'author-details': { authorId: Author['id'] }
  'podcast-details': { podcastId: Podcast['id'] }
}

export type LibraryStackParamList = {
  library: undefined
  downloads: undefined
  'your-podcasts': undefined
  'recently-played': undefined
  'podcast-details': { podcastId: Podcast['id'] }
  'your-interests': undefined
}

export type SettingsStackParamList = {
  settings: undefined
}
