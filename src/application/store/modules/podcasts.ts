import { Podcast, StoreAction } from '@application/types'
import {
  getHottestPodcasts,
  HottestOptions,
} from '@infrastructure/api/podcasts'
import { call, takeLatest, put } from 'redux-saga/effects'

type State = {
  hottestPodcasts: Podcast[]
  recentlyPodcasts: Podcast[]
  status: 'idle' | 'started' | 'complete'
  error: null | Error
}

type PodcastsPayloads = {
  podcasts?: Podcast[]
  hottestOptions?: HottestOptions
}

const PODCASTS_GET_TOP_STARTED = 'podcasts/get-top-started'
const PODCASTS_GET_TOP_SUCCESS = 'podcasts/get-top-success'
const PODCASTS_GET_TOP_FAILURE = 'podcasts/get-top-failure'

const initialState: State = {
  hottestPodcasts: [],
  recentlyPodcasts: [],
  status: 'idle',
  error: null,
}

export const getHottestsPodcasts = (
  options: HottestOptions,
): StoreAction<PodcastsPayloads> => ({
  type: PODCASTS_GET_TOP_STARTED,
  payload: {
    hottestOptions: options,
  },
})

export const hottestPodcastsSuccess = (
  podcasts: Podcast[],
): StoreAction<PodcastsPayloads> => ({
  type: PODCASTS_GET_TOP_SUCCESS,
  payload: { podcasts },
})

export const hottestPodcastsFailure = (): StoreAction<PodcastsPayloads> => ({
  type: PODCASTS_GET_TOP_FAILURE,
})

function* hottestPodcastsSagaWorker({
  payload,
}: StoreAction<PodcastsPayloads>) {
  try {
    if (!payload) throw new Error('payload must be provided')
    const { hottestOptions = {} } = payload
    const podcasts: Podcast[] = yield call(getHottestPodcasts, hottestOptions)
    yield put(hottestPodcastsSuccess(podcasts))
  } catch (error) {
    yield put(hottestPodcastsFailure())
  }
}

export function* watcherHottestPodcasts() {
  yield takeLatest(PODCASTS_GET_TOP_STARTED, hottestPodcastsSagaWorker)
}

const podcastsReducer = (
  state = initialState,
  { payload = {}, type }: StoreAction<PodcastsPayloads>,
): State => {
  switch (type) {
    case PODCASTS_GET_TOP_STARTED:
      return {
        ...state,
        status: 'started',
      }
    case PODCASTS_GET_TOP_SUCCESS:
      return {
        ...state,
        status: 'complete',
        hottestPodcasts: payload.podcasts || [],
      }
    case PODCASTS_GET_TOP_FAILURE:
      return {
        ...state,
        status: 'complete',
        error: null,
      }
    default:
      return state
  }
}

export default podcastsReducer
