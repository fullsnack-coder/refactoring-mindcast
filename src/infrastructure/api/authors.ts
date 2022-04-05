//TODO: change this mock value by podcast real backend

import { Author, Podcast } from '@application/types'
import { sleep } from '@application/utils/tools'
import { trendingAuthors, podcasts } from '../mock/apiData'

export const getAuthorInfo = async (authorId: string) => {
  const authorInfo = await Promise.resolve(
    trendingAuthors.filter(author => author.id === authorId)[0] ??
      trendingAuthors[0],
  )
  return authorInfo
}

export type GetAuthorsOptions = {
  name?: string
  topicTag?: string
  order?: 'asc' | 'desc'
  size?: number
}

export type TrendingOptions = {
  size?: number
  order?: 'asc' | 'desc'
  name?: string
  topicTag?: string
}

export const getTrendingAuthors = async ({
  name = '',
  size = 5,
  topicTag = '',
}: TrendingOptions) => {
  if (__DEV__) await sleep(300)
  const authors = await Promise.resolve(trendingAuthors.slice(0, size))
  return authors.filter(({ subjects, firstName, lastName }) => {
    let shouldReturn = true
    if (name)
      shouldReturn = `${firstName}${lastName}`.toLowerCase().includes(name)
    if (topicTag) shouldReturn = subjects.some(({ tag }) => tag === topicTag)
    return shouldReturn
  })
}

type GetRelatedInfoOptions = {
  authorId?: string
  size?: number
}

export const getRelatedInfo = async ({
  size = 5,
  authorId,
}: GetRelatedInfoOptions) => {
  const newReleases: Podcast[] = await new Promise(resolve => {
    setTimeout(() => {
      resolve(podcasts.slice(0, size))
    })
  })

  const featured: Podcast[] = await new Promise(resolve => {
    setTimeout(() => {
      resolve(podcasts.slice(0, size))
    })
  })

  const relatedAuthors: Author[] = await new Promise(resolve => {
    setTimeout(() => {
      resolve(trendingAuthors.filter(author => author.id !== authorId))
    })
  })

  return {
    newReleases,
    featured,
    relatedAuthors,
  }
}

export const getAuthors = async ({
  name = '',
  topicTag = '',
  size = 10,
}: GetAuthorsOptions) => {
  if (__DEV__) await sleep(300)
  const authors = await Promise.resolve(trendingAuthors.slice(0, size))
  return authors.filter(({ subjects, firstName, lastName }) => {
    let shouldReturn = true
    if (name)
      shouldReturn = `${firstName}${lastName}`.toLowerCase().includes(name)
    if (topicTag)
      shouldReturn = subjects.some(
        ({ tag }) => tag.toLowerCase() === topicTag.trim().toLowerCase(),
      )
    return shouldReturn
  })
}
