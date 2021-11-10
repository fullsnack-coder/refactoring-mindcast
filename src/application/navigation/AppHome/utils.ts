import * as HomeViews from './stacks'
import type { HomeTabsParamList } from './types'

type HomeTab = {
  name: keyof HomeTabsParamList
  stack: React.FC
  icon: string
}

export const homeTabs: HomeTab[] = [
  { name: 'home-discover', stack: HomeViews.DiscoverStack, icon: 'compass' },
  { name: 'home-search', stack: HomeViews.SearchStack, icon: 'magnify' },
  {
    name: 'home-library',
    stack: HomeViews.LibraryStack,
    icon: 'music-circle-outline',
  },
  {
    name: 'home-settings',
    stack: HomeViews.SettingsStack,
    icon: 'account-settings',
  },
]
