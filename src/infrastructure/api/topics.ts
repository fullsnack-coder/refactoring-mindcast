import { Topic, User } from '@application/types'
import { topics } from '@infrastructure/mock/apiData'

export const getAllTopics = async (): Promise<Topic[]> => {
  const fetchedTopics = await Promise.resolve(topics)
  return fetchedTopics
}

export const getUserTopics = async (userId: User['id']): Promise<Topic[]> => {
  const fetchedTopics = await Promise.resolve(topics.slice(0, 2))
  return fetchedTopics
}

export type AddTopicToUserResult = {
  topic: Topic
  userId: User['id']
}

export const saveTopicToUser = async (
  userId: User['id'],
  topicId: Topic['id'],
): Promise<AddTopicToUserResult> => {
  const [addedTopic] = await Promise.resolve(
    topics.filter(topic => topic.id === topicId),
  )
  return {
    topic: addedTopic,
    userId,
  }
}

export type RemoveTopicToUserResult = AddTopicToUserResult

export const removeTopicFromUser = async (
  userId: User['id'],
  topicId: Topic['id'],
): Promise<RemoveTopicToUserResult> => {
  const [removedTopic] = await Promise.resolve(
    topics.filter(tp => tp.id === topicId),
  )
  return {
    topic: removedTopic,
    userId,
  }
}
