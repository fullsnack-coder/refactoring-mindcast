//TODO: change this mock value by podcast real backend

import { trendingAuthors } from '@infrastructure/mock/apiData'

export const getAuthorInfo = async (authorId: string) => {
  const authorInfo = await Promise.resolve(trendingAuthors[0])
  return authorInfo
}

type TrendingOptions = {
  size?: number
  order?: 'asc' | 'desc'
}

export const getTrendingAuthors = async ({
  size = 5,
  order = 'asc',
}: TrendingOptions) => {
  const authors = await Promise.resolve(trendingAuthors)
  return authors
}
