import { StoreAction, Topic } from '@application/types'

type State = {
  isLoading: boolean
  error?: string
  topics: Topic[]
}

type TopicsPayloads = { data?: Topic[]; error?: string }

const GET_TOPICS = 'topics/get-topics'
const GET_TOPICS_SUCCESS = 'topics/get-topics-success'
const GET_TOPICS_FAILURE = 'topics/get-topics-failure'

const initialState: State = {
  isLoading: false,
  topics: [],
}

export const getTopics = (): StoreAction<TopicsPayloads> => ({
  type: GET_TOPICS,
})

export const getTopicsSuccess = (
  topics: Topic[],
): StoreAction<TopicsPayloads> => ({
  type: GET_TOPICS_SUCCESS,
  payload: {
    data: topics,
  },
})

export const getTopicsFailure = (
  error?: string,
): StoreAction<TopicsPayloads> => ({
  type: GET_TOPICS_FAILURE,
  payload: {
    error,
  },
})

const topicsReducer = (
  state = initialState,
  action: StoreAction<TopicsPayloads>,
): State => {
  switch (action.type) {
    case GET_TOPICS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TOPICS_SUCCESS: {
      const { payload } = action
      return {
        ...state,
        isLoading: false,
        topics: payload?.data || [],
      }
    }
    case GET_TOPICS_FAILURE:
      return {
        ...state,
        error: action.payload?.error,
      }
    default:
      return state
  }
}

export default topicsReducer
