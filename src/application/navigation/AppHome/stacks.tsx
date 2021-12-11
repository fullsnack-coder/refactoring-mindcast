import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthorDetailScreen from '@presentation/screens/AuthorDetail'
import DiscoverScreen from '@presentation/screens/Discover'
import DownloadsScreen from '@presentation/screens/Downloads'
import HottestPodcastsScreen from '@presentation/screens/HottestPodcasts'
import LibraryScreen from '@presentation/screens/Library'

import PlaylistsScreen from '@presentation/screens/Playlists'
import PodcastDetailScreen from '@presentation/screens/PodcastDetail'
import RecentlyPlayedScreen from '@presentation/screens/RecentlyPlayed'
import ReleasesScreen from '@presentation/screens/Releases'
import SearchResultsScreen from '@presentation/screens/SearchResults'

import SearchScreen from '@presentation/screens/Search'
import SettingsScreen from '@presentation/screens/Settings'
import TopicScreen from '@presentation/screens/Topic'
import YourPodcastsScreen from '@presentation/screens/YourPodcasts'
import YourInterestsScreen from '@presentation/screens/YourInterests'

import {
  DiscoverStackParamList,
  SearchStackParamList,
  LibraryStackParamList,
  SettingsStackParamList,
} from './types'

const DiscoverNativeStack = createNativeStackNavigator<DiscoverStackParamList>()
const SearchNativeStack = createNativeStackNavigator<SearchStackParamList>()
const LibraryNativeStack = createNativeStackNavigator<LibraryStackParamList>()
const SettingsNativeStack = createNativeStackNavigator<SettingsStackParamList>()

export const DiscoverStack: React.FC = () => (
  <DiscoverNativeStack.Navigator screenOptions={{ headerShown: false }}>
    <DiscoverNativeStack.Screen name="discover" component={DiscoverScreen} />
    <DiscoverNativeStack.Screen
      name="podcast-details"
      component={PodcastDetailScreen}
    />
    <DiscoverNativeStack.Screen
      name="author-details"
      component={AuthorDetailScreen}
    />
    <DiscoverNativeStack.Screen
      name="new-releases"
      component={ReleasesScreen}
    />
    <DiscoverNativeStack.Screen
      name="hottest-podcasts"
      component={HottestPodcastsScreen}
    />
  </DiscoverNativeStack.Navigator>
)

export const SearchStack: React.FC = () => (
  <SearchNativeStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchNativeStack.Screen name="search" component={SearchScreen} />
    <SearchNativeStack.Screen
      name="search-results"
      component={SearchResultsScreen}
    />
    <SearchNativeStack.Screen name="topic" component={TopicScreen} />
    <SearchNativeStack.Screen
      name="author-details"
      component={AuthorDetailScreen}
    />
    <SearchNativeStack.Screen
      name="podcast-details"
      component={PodcastDetailScreen}
    />
  </SearchNativeStack.Navigator>
)

export const LibraryStack: React.FC = () => (
  <LibraryNativeStack.Navigator screenOptions={{ headerShown: false }}>
    <LibraryNativeStack.Screen name="library" component={LibraryScreen} />
    <LibraryNativeStack.Screen name="downloads" component={DownloadsScreen} />
    <LibraryNativeStack.Screen
      name="your-podcasts"
      component={YourPodcastsScreen}
    />
    <LibraryNativeStack.Screen
      name="recently-played"
      component={RecentlyPlayedScreen}
    />
    <LibraryNativeStack.Screen
      name="podcast-details"
      component={PodcastDetailScreen}
    />
    <LibraryNativeStack.Screen
      name="your-interests"
      component={YourInterestsScreen}
    />
  </LibraryNativeStack.Navigator>
)

export const SettingsStack: React.FC = () => (
  <SettingsNativeStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsNativeStack.Screen name="settings" component={SettingsScreen} />
  </SettingsNativeStack.Navigator>
)
