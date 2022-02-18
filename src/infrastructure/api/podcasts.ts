import { Episode, Podcast } from '@application/types'
import { sleep } from '@application/utils/tools'
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
  topicTag?: string
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
  topicTag,
}: HottestOptions) => {
  if (__DEV__) await sleep(100)
  const hottestPodcasts = await Promise.resolve(
    podcasts.sort(
      (current, next) => current.averagePuntuation - next.averagePuntuation,
    ),
  )
  return topicTag
    ? hottestPodcasts.filter(({ subjects }) =>
        subjects.some(
          ({ tag }) => tag.toLowerCase() === topicTag.trim().toLowerCase(),
        ),
      )
    : hottestPodcasts
}

type GetNewReleasesOptions = {
  author?: string
  topicTag?: string
}

export const getNewReleases = async ({
  author,
  topicTag,
}: GetNewReleasesOptions): Promise<Podcast[]> => {
  if (__DEV__) await sleep(270)
  const newReleases: Podcast[] = await Promise.resolve(podcasts.reverse())
  return newReleases.filter(({ subjects, author: podcastAuthor }) => {
    let shouldReturn = false
    if (author)
      shouldReturn = `${podcastAuthor.firstName}${podcastAuthor.lastName}`
        .toLowerCase()
        .includes(author)
    if (topicTag)
      shouldReturn = subjects.some(
        ({ tag }) => tag.toLowerCase() === topicTag.trim().toLowerCase(),
      )
    return shouldReturn
  })
}
