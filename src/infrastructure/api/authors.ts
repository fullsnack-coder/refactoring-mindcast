//TODO: change this mock value by podcast real backend

import { Author, Podcast } from '@application/types'
import { trendingAuthors, podcasts } from '@infrastructure/mock/apiData'

export const getAuthorInfo = async (authorId: string) => {
  const authorInfo = await Promise.resolve(
    trendingAuthors.filter(author => author.id === authorId)[0] ??
      trendingAuthors[0],
  )
  return authorInfo
}

export type TrendingOptions = {
  size?: number
  order?: 'asc' | 'desc'
}

export const getTrendingAuthors = async ({
  size = 5,
  order = 'asc',
}: TrendingOptions) => {
  const authors = await new Promise(resolve => {
    setTimeout(() => {
      resolve(trendingAuthors)
    })
  })
  return authors
}

type NewReleasesOptions = {
  authorId: string
  size?: number
}

export const getRelatedInfo = async ({
  size = 5,
  authorId,
}: NewReleasesOptions) => {
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
