import { Episode, StoreAction } from '@application/types'
import { STORE_RECENTLY_EPISODES } from '@application/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { RootState } from '@application/store'

export type State = {
  recentlyQueue: Episode[]
  isPending: boolean
}

export type Payload =
  | {
      episode: Episode
    }
  | { loadedEpisodes: Episode[] }
  | { episodes: Episode[] }

export const actionTypes = {
  RECENTLY_PLAYED_ADD_EPISODE_START: 'recently-played/add-episode-start',
  RECENTLY_PLAYED_ADD_EPISODE_SUCCESS: 'recently-played/add-episode-success',
  RECENTLY_PLAYED_ADD_EPISODE_FAILURE: 'recently-played/add-episode-failure',

  RECENTLY_PLAYED_LOAD_LIST_START: 'recently-played/load-list-start',
  RECENTLY_PLAYED_LOAD_LIST_ERROR: 'recently-played/load-list-error',
  RECENTLY_PLAYED_LOAD_LIST_COMPLETE: 'recently-played/load-list-complete',
}

export const initialState: State = {
  isPending: false,
  recentlyQueue: [],
}

export const loadRecentlyListStart = (): StoreAction<Payload> => ({
  type: actionTypes.RECENTLY_PLAYED_LOAD_LIST_START,
})

const loadRecentlyListComplete = (
  loadedEpisodes: Episode[],
): StoreAction<Payload> => ({
  type: actionTypes.RECENTLY_PLAYED_LOAD_LIST_COMPLETE,
  payload: { loadedEpisodes },
})

const loadRecentlyListError = (): StoreAction<Payload> => ({
  type: actionTypes.RECENTLY_PLAYED_LOAD_LIST_ERROR,
})

function* loadRecentlyListSagaWorker() {
  try {
    const persistedList: string = yield call(
      AsyncStorage.getItem,
      STORE_RECENTLY_EPISODES,
    )
    const listOfEpisodes: Episode[] = persistedList
      ? JSON.parse(persistedList)
      : []
    yield put(loadRecentlyListComplete(listOfEpisodes))
  } catch (error) {
    yield put(loadRecentlyListError())
  }
}

export function* watcherLoadRecentlyList() {
  yield takeLatest(
    actionTypes.RECENTLY_PLAYED_LOAD_LIST_START,
    loadRecentlyListSagaWorker,
  )
}

export const addRecentlyEpisodesStart = (
  episodes: Episode[],
): StoreAction<Payload> => ({
  type: actionTypes.RECENTLY_PLAYED_ADD_EPISODE_START,
  payload: { episodes },
})

const addRecentlyEpisodeError = (): StoreAction<Payload> => ({
  type: actionTypes.RECENTLY_PLAYED_ADD_EPISODE_FAILURE,
})

const addRecentlyEpisodeSuccess = (episode: Episode): StoreAction<Payload> => ({
  type: actionTypes.RECENTLY_PLAYED_ADD_EPISODE_SUCCESS,
  payload: { episode },
})

function* saveRecentlyEpisodeSagaWorker({ payload }: StoreAction<Payload>) {
  try {
    if (payload && 'episodes' in payload) {
      const { episodes } = payload
      for (const episode of episodes) {
        yield put(addRecentlyEpisodeSuccess(episode))
      }
      const currentQueue: State['recentlyQueue'] = yield select(
        (state: RootState) => state.episodes.recentlyPlayed.recentlyQueue,
      )
      const queueString = JSON.stringify(currentQueue)
      yield call(AsyncStorage.setItem, STORE_RECENTLY_EPISODES, queueString)
    }
  } catch (error) {
    yield put(addRecentlyEpisodeError())
  }
}

export function* watcherUpdateRecentlyEpisode() {
  yield takeLatest(
    actionTypes.RECENTLY_PLAYED_ADD_EPISODE_START,
    saveRecentlyEpisodeSagaWorker,
  )
}

const recentlyPlayedReducer = (
  state = initialState,
  action: StoreAction<Payload>,
): State => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.RECENTLY_PLAYED_ADD_EPISODE_START:
    case actionTypes.RECENTLY_PLAYED_LOAD_LIST_START:
      return { ...state, isPending: true }
    case actionTypes.RECENTLY_PLAYED_ADD_EPISODE_SUCCESS: {
      if (!payload || !('episode' in payload)) return state
      const { episode } = payload
      return {
        ...state,
        recentlyQueue: state.recentlyQueue
          .filter(({ id }) => id !== episode.id)
          .concat(episode),
        isPending: false,
      }
    }
    case actionTypes.RECENTLY_PLAYED_LOAD_LIST_COMPLETE: {
      if (!payload || !('loadedEpisodes' in payload)) return state
      const { loadedEpisodes } = payload

      return {
        ...state,
        isPending: false,
        recentlyQueue: loadedEpisodes,
      }
    }
    case actionTypes.RECENTLY_PLAYED_ADD_EPISODE_FAILURE:
    case actionTypes.RECENTLY_PLAYED_LOAD_LIST_ERROR:
      return { ...state, isPending: false }
    default:
      return state
  }
}

export default recentlyPlayedReducer
