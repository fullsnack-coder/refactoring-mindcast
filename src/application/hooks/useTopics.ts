import { Topic } from '@application/types'
import { getAllTopics } from '@infrastructure/api/topics'
import { useEffect, useState } from 'react'

const useTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    getAllTopics()
      .then(info => {
        setTopics(info)
        setIsLoading(false)
      })
      .catch(reason => {
        setError(reason)
        setIsLoading(false)
      })
  }, [])

  return {
    topics,
    isLoading,
    error,
  }
}

export default useTopics
