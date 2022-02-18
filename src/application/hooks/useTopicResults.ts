import { Author, Podcast } from '@application/types'
import { getAuthors } from '@infrastructure/api/authors'
import {
  getHottestPodcasts,
  getNewReleases,
} from '@infrastructure/api/podcasts'
import { useEffect, useState } from 'react'

interface TopicResults {
  authors: Author[]
  error: Error | null
  hottestPodcasts: Podcast[]
  isLoading: boolean
  newestPodcasts: Podcast[]
}

const useTopicResults = (topicTag: string): TopicResults => {
  const [isLoading, setIsLoading] = useState(false)
  const [authors, setAuthors] = useState<Author[]>([])
  const [hottestPodcasts, setHottestPodcasts] = useState<Podcast[]>([])
  const [newestPodcasts, setNewestPodcasts] = useState<Podcast[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setError(null)
    setIsLoading(true)
    Promise.all([
      getAuthors({ topicTag, size: 10 }),
      getHottestPodcasts({ topicTag, size: 10 }),
      getNewReleases({ topicTag }),
    ])
      .then(
        ([authorsResponse, hottestPodcastsResponse, newReleasesResponse]) => {
          setHottestPodcasts(hottestPodcastsResponse)
          setAuthors(authorsResponse)
          setNewestPodcasts(newReleasesResponse)
          setIsLoading(false)
        },
      )
      .catch(reason => {
        setError(reason)
        setIsLoading(false)
      })
  }, [])

  return {
    isLoading,
    authors,
    hottestPodcasts,
    newestPodcasts,
    error,
  }
}

export default useTopicResults
