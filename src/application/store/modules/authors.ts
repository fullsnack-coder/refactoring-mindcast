import { Author, StoreAction } from '@application/types'
import {
  getTrendingAuthors,
  TrendingOptions,
} from '@infrastructure/api/authors'
import { call, takeLatest, put } from 'redux-saga/effects'

type State = {
  topAuthors: Author[]
  status: 'idle' | 'started' | 'complete'
  error: null | Error
}

type AuthorsPayloads = {
  authors?: Author[]
  trendingOptions?: TrendingOptions
}

const AUTHORS_GET_TOP_STARTED = 'authors/get-top-started'
const AUTHORS_GET_TOP_SUCCESS = 'authors/get-top-success'
const AUTHORS_GET_TOP_FAILURE = 'authors/get-top-failure'

const initialState: State = {
  topAuthors: [],
  status: 'idle',
  error: null,
}

export const getTopAuthors = (
  options: TrendingOptions,
): StoreAction<AuthorsPayloads> => ({
  type: AUTHORS_GET_TOP_STARTED,
  payload: {
    trendingOptions: options,
  },
})

const getTopAuthorsSuccess = (
  authors: Author[],
): StoreAction<AuthorsPayloads> => {
  return {
  type: AUTHORS_GET_TOP_SUCCESS,
  payload: { authors },
}}

const getTopAuthorsFailure = (): StoreAction<AuthorsPayloads> => ({
  type: AUTHORS_GET_TOP_FAILURE,
})

export function* getTopAuthorsWorker({
  payload = {},
}: StoreAction<AuthorsPayloads>) {
  try {
    const { trendingOptions } = payload
    if (!trendingOptions) throw new Error('options must be provided')
    const trendingAuthors: Author[] = yield call(
      getTrendingAuthors,
      trendingOptions,
    )
    yield put(getTopAuthorsSuccess(trendingAuthors))
  } catch (error) {
    yield put(getTopAuthorsFailure())
  }
}

export function* getTopAuthorsWatcher() {
  yield takeLatest(AUTHORS_GET_TOP_STARTED, getTopAuthorsWorker)
}

const authorsReducer = (
  state = initialState,
  { payload = {}, type }: StoreAction<AuthorsPayloads>,
): State => {
  switch (type) {
    case AUTHORS_GET_TOP_STARTED:
      return {
        ...state,
        status: 'started',
      }
    case AUTHORS_GET_TOP_SUCCESS:
      return {
        ...state,
        status: 'complete',
        topAuthors: payload.authors || [],
      }
    case AUTHORS_GET_TOP_FAILURE:
      return {
        ...state,
        status: 'complete',
        error: null,
      }
    default:
      return state
  }
}

export default authorsReducer
