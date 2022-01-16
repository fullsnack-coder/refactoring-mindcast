import { Topic, User } from '@application/types'
import { sleep } from '@application/utils/tools'
import { topics } from '@infrastructure/mock/apiData'

export const getAllTopics = async (): Promise<Topic[]> => {
  if (__DEV__) await sleep(300)
  const fetchedTopics = await Promise.resolve(topics)
  return fetchedTopics
}

export const getUserTopics = async (userId: User['id']): Promise<Topic[]> => {
  if (__DEV__) await sleep(400)
  const fetchedTopics = await Promise.resolve(topics.slice(0, 2))
  return fetchedTopics
}

export type SaveTopicsToUserResult = {
  topics: Topic[]
  userId: User['id']
}

export const saveTopicsToUser = async (
  userId: User['id'],
  topicsIds: Topic['id'][],
): Promise<SaveTopicsToUserResult> => {
  const addedTopics = await Promise.resolve(
    topics.filter(t => topicsIds.includes(t.id)),
  )
  return {
    topics: addedTopics,
    userId,
  }
}

export type RemoveTopicsFromUserResult = SaveTopicsToUserResult

export const removeTopicsFromUser = async (
  userId: User['id'],
  topicsIds: Topic['id'][],
): Promise<RemoveTopicsFromUserResult> => {
  const removedTopics = await Promise.resolve(
    topics.filter(t => topicsIds.includes(t.id)),
  )
  return {
    topics: removedTopics,
    userId,
  }
}
