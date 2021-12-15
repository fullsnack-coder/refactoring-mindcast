import { Podcast, StoreAction } from '@application/types'
import {
  HottestOptions,
  getHottestPodcasts,
} from '@infrastructure/api/podcasts'
import { call, takeLatest, put } from 'redux-saga/effects'

import newReleasesReducer, {
  ActionTypes,
  NewReleasesState,
  actionTypeStrings,
  initialState as newReleasesInitialState,
  NewReleasesPayloads,
} from './new-releases'

type State = {
  hottestPodcasts: Podcast[]
  recentlyPodcasts: Podcast[]
  newReleases: NewReleasesState
  status: 'idle' | 'started' | 'complete'
  error: null | Error
}

type PodcastsPayloads =
  | {
      podcasts?: Podcast[]
      hottestOptions?: HottestOptions
    }
  | NewReleasesPayloads

const PODCASTS_GET_TOP_STARTED = 'podcasts/get-top-started'
const PODCASTS_GET_TOP_SUCCESS = 'podcasts/get-top-success'
const PODCASTS_GET_TOP_FAILURE = 'podcasts/get-top-failure'

const initialState: State = {
  hottestPodcasts: [],
  recentlyPodcasts: [],
  newReleases: newReleasesInitialState,
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
    if ('hottestOptions' in payload) {
      const { hottestOptions = {} } = payload
      const podcasts: Podcast[] = yield call(getHottestPodcasts, hottestOptions)
      yield put(hottestPodcastsSuccess(podcasts))
    }
  } catch (error) {
    yield put(hottestPodcastsFailure())
  }
}

export function* watcherHottestPodcasts() {
  yield takeLatest(PODCASTS_GET_TOP_STARTED, hottestPodcastsSagaWorker)
}

const podcastsReducer = (
  state = initialState,
  action: StoreAction<PodcastsPayloads>,
): State => {
  const { type, payload = {} } = action
  switch (type) {
    case PODCASTS_GET_TOP_STARTED:
      return {
        ...state,
        status: 'started',
      }
    case PODCASTS_GET_TOP_SUCCESS: {
      if ('podcasts' in payload) {
        const { podcasts = [] } = payload
        return {
          ...state,
          status: 'complete',
          hottestPodcasts: podcasts,
        }
      }
      return state
    }
    case PODCASTS_GET_TOP_FAILURE:
      return {
        ...state,
        status: 'complete',
        error: null,
      }
    case actionTypeStrings.PODCASTS_GET_NEW_RELEASES_START:
    case actionTypeStrings.PODCASTS_GET_NEW_RELEASES_SUCCESS:
    case actionTypeStrings.PODCASTS_GET_NEW_RELEASES_FAILURE:
      return {
        ...state,
        newReleases: newReleasesReducer(
          state.newReleases,
          action as StoreAction<NewReleasesState, ActionTypes>,
        ),
      }
    default:
      return state
  }
}

export default podcastsReducer
