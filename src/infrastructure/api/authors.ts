//TODO: change this mock value by podcast real backend

import { trendingAuthors } from '@infrastructure/mock/apiData'

export const getAuthorInfo = async (authorId: string) => {
  const authorInfo = await Promise.resolve(trendingAuthors[0])
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
