import { Author } from '@application/types'
import { getAuthors } from '@infrastructure/api/authors'
import { useEffect, useState } from 'react'

type UseAuthorsOptions = {
  name?: string
  tag?: string
}

const useAuthors = ({ name, tag }: UseAuthorsOptions) => {
  const [currentAuthors, setCurrentAuthors] = useState<Author[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    getAuthors({ name, topicTag: tag })
      .then(authors => {
        setCurrentAuthors(authors)
        setIsLoading(false)
      })
      .catch(reason => {
        setError(reason)
        setIsLoading(false)
      })
  }, [name, tag])

  return {
    currentAuthors,
    error,
    isLoading,
  }
}

export default useAuthors
