import { Podcast } from '@application/types'
import { getPodcastInformation } from '@infrastructure/api/podcasts'

import { useEffect, useState } from 'react'

const usePodcast = (podcastId: string) => {
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (podcastId) {
      setIsLoading(true)
      getPodcastInformation(podcastId)
        .then(info => {
          setPodcast(info)
          setIsLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setIsLoading(false)
        })
    }
  }, [podcastId])

  return {
    podcast,
    isLoading,
    error,
  }
}

export default usePodcast
