import { Episode, Podcast } from '@application/types'
import { podcastEpisodes, podcasts } from '@infrastructure/mock/apiData'

//TODO: change this mock value by podcast real backend

export type PodcastInfo = Podcast & {
  episodes: Episode[]
}

export const getPodcastInformation = async (
  podcastId: string,
): Promise<PodcastInfo | null> => {
  const podcast = await Promise.resolve(
    podcasts.find(podcast => podcast.id === podcastId),
  )
  if (!podcast) return null
  return {
    ...podcast,
    episodes: podcastEpisodes.filter(
      episode => episode.podcastId === podcastId,
    ),
  }
}

export type HottestOptions = {
  size?: number
  order?: 'asc' | 'desc'
}

export const getRecentlyReleases = async () => {
  const recentlyReleases = await new Promise(resolve => {
    setTimeout(() => resolve(podcasts.reverse()), 1000)
  })
  return recentlyReleases
}

export const getHottestPodcasts = async ({
  size = 10,
  order = 'asc',
}: HottestOptions) => {
  const hottestPodcasts = await new Promise(resolve => {
    setTimeout(
      () =>
        resolve(
          podcasts.sort(
            (current, next) =>
              current.averagePuntuation - next.averagePuntuation,
          ),
        ),
      1000,
    )
  })
  return hottestPodcasts
}

export const getNewReleases = async (): Promise<Podcast[]> => {
  const newReleases: Podcast[] = await new Promise(resolve => {
    setTimeout(() => resolve(podcasts.reverse()), 1500)
  })
  return newReleases
}
