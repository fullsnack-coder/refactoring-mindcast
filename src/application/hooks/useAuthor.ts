import { Author, Podcast } from '@application/types'
import { getAuthorInfo, getRelatedInfo } from '@infrastructure/api/authors'
import { useEffect, useState } from 'react'

type AuthorInfo = {
  featured: Podcast[]
  newReleases: Podcast[]
  relatedAuthors: Author[]
} & Author

const useAuthor = (authorId: string) => {
  const [authorInfo, setAuthorInfo] = useState<AuthorInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    Promise.all([getAuthorInfo(authorId), getRelatedInfo({ authorId })])
      .then(([info, relatedInfo]) => {
        setAuthorInfo({
          ...info,
          ...relatedInfo,
        })
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [authorId])

  return {
    authorInfo,
    isLoading,
    error,
  }
}

export default useAuthor
