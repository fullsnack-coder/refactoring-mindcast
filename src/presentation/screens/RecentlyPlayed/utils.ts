import { RootState } from '@application/store'

export const recentlySelector = (state: RootState) =>
  state.episodes.recentlyPlayed.recentlyQueue
