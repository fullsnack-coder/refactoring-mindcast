import { podcasts } from '@infrastructure/mock/apiData'

//TODO: change this mock value by podcast real backend

export const getPodcastInformation = async (podcastId: string) => {
  const podcast = await Promise.resolve(podcasts[0])
  return podcast
}

type HottestOptions = {
  size?: number
  order?: 'asc' | 'desc'
}

export const getRecentlyReleases = async () => {
  const recentlyReleases = await Promise.resolve(podcasts.reverse())
  return recentlyReleases
}

export const getHottestPodcasts = async ({
  size = 10,
  order = 'asc',
}: HottestOptions) => {
  const hottestPodcasts = await Promise.resolve(
    podcasts.sort(
      (current, next) => current.averagePuntuation - next.averagePuntuation,
    ),
  )
  return hottestPodcasts
}
