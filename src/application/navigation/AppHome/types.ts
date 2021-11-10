import { NavigatorScreenParams } from '@react-navigation/native'

export type HomeTabsParamList = {
  'home-discover': NavigatorScreenParams<DiscoverStackParamList>
  'home-search': NavigatorScreenParams<SearchStackParamList>
  'home-library': NavigatorScreenParams<LibraryStackParamList>
  'home-settings': NavigatorScreenParams<SettingsStackParamList>
}

export type DiscoverStackParamList = {
  discover: undefined
  'podcast-details': undefined
  'author-details': undefined
  'new-releases': undefined
  'hottest-podcasts': undefined
}

export type SearchStackParamList = {
  search: undefined
  topic: undefined
  'search-results': undefined
  'author-details': undefined
  'podcast-details': undefined
}

export type LibraryStackParamList = {
  library: undefined
  playlist: undefined
  downloads: undefined
  'your-podcasts': undefined
  'recently-played': undefined
  'podcast-details': undefined
  'your-interests': undefined
}

export type SettingsStackParamList = {
  settings: undefined
}
