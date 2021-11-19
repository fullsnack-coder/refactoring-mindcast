import * as HomeViews from './stacks'
import type { HomeTabsParamList } from './types'

type HomeTab = {
  name: keyof HomeTabsParamList
  stack: React.FC
  icon: string
  label: string
}

export const homeTabs: HomeTab[] = [
  {
    name: 'home-discover',
    stack: HomeViews.DiscoverStack,
    icon: 'compass',
    label: 'Discover',
  },
  {
    name: 'home-search',
    stack: HomeViews.SearchStack,
    icon: 'magnify',
    label: 'Search',
  },
  {
    name: 'home-library',
    stack: HomeViews.LibraryStack,
    icon: 'music-circle-outline',
    label: 'Library',
  },
  {
    name: 'home-settings',
    stack: HomeViews.SettingsStack,
    icon: 'account-settings',
    label: 'Settings',
  },
]
