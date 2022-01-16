import { StoreAction, Topic, User } from '@application/types'
import {
  getUserTopics,
  saveTopicsToUser,
  removeTopicsFromUser,
  SaveTopicsToUserResult,
  RemoveTopicsFromUserResult,
} from '@infrastructure/api/topics'
import { call, put, takeLatest } from 'redux-saga/effects'

type State = {
  isLoading: boolean
  error?: string
  topics: Topic[]
}

type AddOrRemoveTopicInfo = {
  userId: User['id']
  topics: Topic[]
  onSuccess?: () => void
  onFailure?: () => void
}

type TopicsPayloads =
  | { data?: Topic[] }
  | { error?: string }
  | { userId: User['id'] }
  | { topics: Topic[] }
  | AddOrRemoveTopicInfo

const guards = {
  isDataPayload: (payload: TopicsPayloads): payload is { data: Topic[] } =>
    'data' in payload,
  isTopicsPayload: (payload: TopicsPayloads): payload is { topics: Topic[] } =>
    'topics' in payload,
  isUserIdPayload: (
    payload: TopicsPayloads,
  ): payload is { userId: User['id'] } => 'userId' in payload,
  isErrorPayload: (payload: TopicsPayloads): payload is { error: string } =>
    'error' in payload,
}

const TOPICS_GET_TOPICS_START = 'topics/get-topics'
const TOPICS_GET_TOPICS_SUCCESS = 'topics/get-topics-success'
const TOPICS_GET_TOPICS_FAILURE = 'topics/get-topics-failure'

const TOPICS_SAVE_TOPICS_TO_USER_START = 'topics/save-topics-to-user'
const TOPICS_SAVE_TOPICS_TO_USER_SUCCESS = 'topics/save-topics-to-user-success'
const TOPICS_SAVE_TOPICS_TO_USER_FAILURE = 'topics/save-topics-to-user-failure'

const TOPICS_REMOVE_TOPICS_FROM_USER_START = 'topics/remove-topics-from-user'
const TOPICS_REMOVE_TOPICS_FROM_USER_SUCCESS =
  'topics/remove-topic-from-user-success'
const TOPICS_REMOVE_TOPICS_FROM_USER_FAILURE =
  'topics/remove-topic-from-user-failure'

const initialState: State = {
  isLoading: false,
  topics: [],
}

export const getTopicsFromUser = (
  userId: string,
): StoreAction<TopicsPayloads> => ({
  type: TOPICS_GET_TOPICS_START,
  payload: { userId },
})

const getTopicsSuccess = (topics: Topic[]): StoreAction<TopicsPayloads> => ({
  type: TOPICS_GET_TOPICS_SUCCESS,
  payload: {
    data: topics,
  },
})

const getTopicsFailure = (error?: string): StoreAction<TopicsPayloads> => ({
  type: TOPICS_GET_TOPICS_FAILURE,
  payload: {
    error,
  },
})

function* getTopicsSagaWorker({ payload = {} }: StoreAction<TopicsPayloads>) {
  try {
    if ('userId' in payload && payload.userId) {
      const userTopics: Topic[] = yield call(getUserTopics, payload.userId)
      yield put(getTopicsSuccess(userTopics))
    } else throw new Error('UserID must be provided')
  } catch (error: any) {
    yield put(getTopicsFailure(error.message))
  }
}

export function* getTopicsSagaWatcher() {
  yield takeLatest(TOPICS_GET_TOPICS_START, getTopicsSagaWorker)
}

export const saveTopicsToUserStart = (
  info: AddOrRemoveTopicInfo,
): StoreAction<AddOrRemoveTopicInfo> => ({
  type: TOPICS_SAVE_TOPICS_TO_USER_START,
  payload: info,
})

const saveTopicSuccess = ({
  topics,
  userId,
}: AddOrRemoveTopicInfo): StoreAction<TopicsPayloads> => ({
  type: TOPICS_SAVE_TOPICS_TO_USER_SUCCESS,
  payload: { topics, userId },
})

const saveTopicFailure = (error?: string): StoreAction<TopicsPayloads> => ({
  type: TOPICS_SAVE_TOPICS_TO_USER_FAILURE,
  payload: { error },
})

// TODO: integrate firebase cloud messaging into effects
function* saveTopicsToUserWorker({
  payload,
}: StoreAction<AddOrRemoveTopicInfo>) {
  if (payload) {
    const { topics, userId, onFailure, onSuccess } = payload
    try {
      const topicsIdsToSave = topics.map(({ id }) => id)
      const { topics: savedTopics }: SaveTopicsToUserResult = yield call(
        saveTopicsToUser,
        userId,
        topicsIdsToSave,
      )
      yield put(
        saveTopicSuccess({
          topics: savedTopics,
          userId,
        }),
      )
      if (onSuccess) yield call(onSuccess)
    } catch (error: any) {
      yield put(saveTopicFailure(error.message))
      if (onFailure) yield call(onFailure)
    }
  }
}

export function* saveTopicToUserWatcher() {
  yield takeLatest(TOPICS_SAVE_TOPICS_TO_USER_START, saveTopicsToUserWorker)
}

export const removeTopicFromUserStart = ({
  userId,
  topics,
}: AddOrRemoveTopicInfo): StoreAction<TopicsPayloads> => ({
  type: TOPICS_REMOVE_TOPICS_FROM_USER_START,
  payload: { userId, topics },
})

const removeTopicFromUserSuccess = (
  topics: Topic[],
  userId: User['id'],
): StoreAction<TopicsPayloads> => ({
  type: TOPICS_REMOVE_TOPICS_FROM_USER_SUCCESS,
  payload: { topics },
})

const removeTopicFromUserFailure = (): StoreAction<TopicsPayloads> => ({
  type: TOPICS_REMOVE_TOPICS_FROM_USER_FAILURE,
})

function* removeTopicFromUserSagaWorker({
  payload,
}: StoreAction<AddOrRemoveTopicInfo>) {
  try {
    if (payload) {
      const { topics, userId } = payload
      const topicsIdsToRemove = topics.map(({ id }) => id)
      const { topics: removedTopics }: RemoveTopicsFromUserResult = yield call(
        removeTopicsFromUser,
        userId,
        topicsIdsToRemove,
      )
      yield put(removeTopicFromUserSuccess(removedTopics, userId))
    }
  } catch (error) {
    yield put(removeTopicFromUserFailure())
  }
}

export function* removeTopicFromUserWatcher() {
  yield takeLatest(
    TOPICS_REMOVE_TOPICS_FROM_USER_START,
    removeTopicFromUserSagaWorker,
  )
}

const topicsReducer = (
  state = initialState,
  action: StoreAction<TopicsPayloads>,
): State => {
  switch (action.type) {
    case TOPICS_GET_TOPICS_START:
    case TOPICS_REMOVE_TOPICS_FROM_USER_START:
    case TOPICS_SAVE_TOPICS_TO_USER_START:
      return {
        ...state,
        isLoading: true,
      }
    case TOPICS_GET_TOPICS_SUCCESS: {
      const { payload = {} } = action
      if (guards.isDataPayload(payload)) {
        return {
          ...state,
          isLoading: false,
          topics: payload?.data || [],
        }
      }
      return state
    }
    case TOPICS_GET_TOPICS_FAILURE:
    case TOPICS_SAVE_TOPICS_TO_USER_FAILURE:
    case TOPICS_REMOVE_TOPICS_FROM_USER_FAILURE: {
      const { payload = {} } = action
      if (guards.isErrorPayload(payload)) {
        return {
          ...state,
          error: payload.error,
          isLoading: false,
        }
      }
      return state
    }
    case TOPICS_SAVE_TOPICS_TO_USER_SUCCESS: {
      const { payload = {} } = action
      if (guards.isTopicsPayload(payload)) {
        return {
          ...state,
          topics: payload.topics,
          isLoading: false,
        }
      }
      return state
    }
    case TOPICS_REMOVE_TOPICS_FROM_USER_SUCCESS: {
      const { payload = {} } = action
      if (guards.isTopicsPayload(payload)) {
        const { topics } = payload
        const removedIds = topics.map(({ id }) => id)
        return {
          ...state,
          topics: state.topics.filter(
            prevTopic => !removedIds.includes(prevTopic.id),
          ),
          isLoading: false,
        }
      }
      return state
    }
    default:
      return state
  }
}

export default topicsReducer
