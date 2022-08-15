import { Podcast, StoreAction } from '@application/types'
import {
  getNewReleases,
  GetNewReleasesOptions,
} from '@infrastructure/api/podcasts'
import { call, put, takeLatest } from 'redux-saga/effects'

const PODCASTS_GET_NEW_RELEASES_START = 'podcasts/get-new-releases-start'
const PODCASTS_GET_NEW_RELEASES_SUCCESS = 'podcasts/get-new-releases-success'
const PODCASTS_GET_NEW_RELEASES_FAILURE = 'podcasts/get-new-releases-failure'

export type ActionTypes =
  | typeof PODCASTS_GET_NEW_RELEASES_START
  | typeof PODCASTS_GET_NEW_RELEASES_SUCCESS
  | typeof PODCASTS_GET_NEW_RELEASES_FAILURE

export const actionTypeStrings: Record<string, ActionTypes> = {
  PODCASTS_GET_NEW_RELEASES_START,
  PODCASTS_GET_NEW_RELEASES_SUCCESS,
  PODCASTS_GET_NEW_RELEASES_FAILURE,
}

export type NewReleasesState = {
  status: 'idle' | 'pending' | 'success' | 'failure'
  data: Podcast[]
  error: Error | null
}

export type NewReleasesPayloads =
  | {
      podcasts: Podcast[]
    }
  | { error: Error | null }
  | GetNewReleasesOptions

export const initialState: NewReleasesState = {
  status: 'idle',
  data: [],
  error: null,
}

/**
 * @description type guards for check if payload is success payload or error payload
 * @param payload
 * @returns true if payload is success payload
 */
const guards = {
  isSuccessPayload: (
    payload: NewReleasesPayloads,
  ): payload is { podcasts: Podcast[] } => {
    return 'podcasts' in payload
  },
  isErrorPayload: (
    payload: NewReleasesPayloads,
  ): payload is { error: Error } => {
    return 'error' in payload
  },
  isNewReleasesGet: (
    payload: NewReleasesPayloads,
  ): payload is GetNewReleasesOptions => {
    return 'author' in payload || 'topicTag' in payload
  },
}

export const getNewReleasesStart = (
  options: GetNewReleasesOptions,
): StoreAction<NewReleasesPayloads> => ({
  type: PODCASTS_GET_NEW_RELEASES_START,
  payload: options,
})

const getNewReleasesSuccess = (
  podcasts: Podcast[],
): StoreAction<NewReleasesPayloads> => ({
  type: PODCASTS_GET_NEW_RELEASES_SUCCESS,
  payload: { podcasts },
})

const getNewReleasesFailure = (
  error: Error,
): StoreAction<NewReleasesPayloads> => ({
  type: PODCASTS_GET_NEW_RELEASES_FAILURE,
  payload: { error },
})

function* newReleasesSagaWorker({ payload }: StoreAction<NewReleasesPayloads>) {
  try {
    const { author, topicTag } = (payload || {}) as GetNewReleasesOptions
    const podcasts: Podcast[] = yield call(getNewReleases, {
      author,
      topicTag,
    })
    yield put(getNewReleasesSuccess(podcasts))
  } catch (error) {
    yield put(getNewReleasesFailure(error as Error))
  }
}

export function* watcherNewReleases() {
  yield takeLatest(PODCASTS_GET_NEW_RELEASES_START, newReleasesSagaWorker)
}

const newReleasesReducer = (
  state: NewReleasesState = initialState,
  action: StoreAction<NewReleasesPayloads, ActionTypes>,
): NewReleasesState => {
  switch (action.type) {
    case PODCASTS_GET_NEW_RELEASES_START: {
      return {
        ...state,
        status: 'pending',
      }
    }
    case PODCASTS_GET_NEW_RELEASES_SUCCESS: {
      if (action.payload && guards.isSuccessPayload(action.payload)) {
        const { podcasts } = action.payload
        return {
          ...state,
          status: 'success',
          data: podcasts,
        }
      }
      return state
    }
    case PODCASTS_GET_NEW_RELEASES_FAILURE: {
      if (action.payload && guards.isErrorPayload(action.payload)) {
        const { error } = action.payload
        return {
          ...state,
          status: 'failure',
          error,
        }
      }
      return state
    }
    default:
      return state
  }
}

export default newReleasesReducer
