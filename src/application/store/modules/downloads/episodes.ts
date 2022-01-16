import { STORE_EPISODES_DOWNLOADS } from '@application/constants'
import { RootState } from '@application/store'
import { Episode, StoreAction } from '@application/types'
import DownloadManager from '@application/utils/DownloadManager'
import { fileManager } from '@application/utils/tools'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { call, put, select, takeLatest } from 'redux-saga/effects'

export const actionTypes = {
  DOWNLOAD_EPISODES_LOAD_ALL: 'downloads/download-episode-load-all',
  DOWNLOAD_EPISODES_SET_ALL: 'downloads/download-episode-set-all',
  DOWNLOAD_EPISODES_REQUEST: 'downloads/download-episode-request',
  DOWNLOAD_EPISODES_SUCCESS: 'downloads/download-episode-success',
  DOWNLOAD_EPISODES_FAILURE: 'downloads/download-episode-failure',
  DOWNLOAD_EPISODES_REMOVE_REQUEST: 'downloads/download-episode-remove-request',
  DOWNLOAD_EPISODES_REMOVE_SUCCESS: 'downloads/download-episode-remove-success',
  DOWNLOAD_EPISODES_REMOVE_FAILURE: 'downloads/download-episode-remove-failure',
}

export type State = {
  episodes: Episode[]
  isLoading: boolean
  error: boolean
}

type DownloadEpisode = Episode

type Payloads =
  | {
      episode?: DownloadEpisode
      onProgress?: (progress: number) => void
    }
  | {
      episodeId: DownloadEpisode['id']
      podcastId?: DownloadEpisode['podcastId']
    }
  | { episodes: DownloadEpisode[] }

const payloadGuards = {
  isEpisodePayload: (
    payload: Payloads,
  ): payload is {
    episode: Episode
    onProgress: (progress: number) => void
  } => {
    return 'episode' in payload
  },
  isEpisodeIdPayload: (
    payload: Payloads,
  ): payload is { episodeId: string; podcastId: string } => {
    return 'episodeId' in payload
  },
  isEpisodesPayload: (
    payload: Payloads,
  ): payload is { episodes: DownloadEpisode[] } => {
    return 'episodes' in payload
  },
}

export const downloadEpisodesLoadAll = (): DownloadAction => ({
  type: actionTypes.DOWNLOAD_EPISODES_LOAD_ALL,
})

const downloadEpisodesSetAll = (
  episodes: DownloadEpisode[],
): DownloadAction => ({
  type: actionTypes.DOWNLOAD_EPISODES_SET_ALL,
  payload: { episodes },
})

type DownloadAction = StoreAction<Payloads>

const downloadEpisodeSuccess = (episode: DownloadEpisode): DownloadAction => ({
  type: actionTypes.DOWNLOAD_EPISODES_SUCCESS,
  payload: { episode },
})

const downloadEpisodeFailure = (): DownloadAction => ({
  type: actionTypes.DOWNLOAD_EPISODES_FAILURE,
})

export const downloadEpisodeRequest = (
  episode: DownloadEpisode,
  onProgress?: (progress: number) => void,
): DownloadAction => {
  return {
    type: actionTypes.DOWNLOAD_EPISODES_REQUEST,
    payload: { episode, onProgress },
  }
}

const downloadEpisodeRemoveSuccess = (episodeId: string): DownloadAction => ({
  type: actionTypes.DOWNLOAD_EPISODES_REMOVE_SUCCESS,
  payload: { episodeId },
})

const downloadEpisodeRemoveFailure = (): DownloadAction => ({
  type: actionTypes.DOWNLOAD_EPISODES_REMOVE_FAILURE,
})

export const downloadEpisodeRemoveRequest = (
  episodeId: Episode['id'],
  podcastId: Episode['podcastId'],
): DownloadAction => {
  return {
    type: actionTypes.DOWNLOAD_EPISODES_REMOVE_REQUEST,
    payload: { episodeId, podcastId },
  }
}

function* downloadEpisodeSagaWorker({ payload = {} }: DownloadAction) {
  try {
    if (payloadGuards.isEpisodePayload(payload)) {
      const downloadManager = new DownloadManager({})
      const { episode, onProgress } = payload
      const { url, id, podcastId } = episode
      const parsedId = id.replace(/[^a-zA-Z0-9]/g, '-')
      const fileNameWithExtension = `${podcastId}-${parsedId}.mp3`

      const downloadUrl: string = yield call(downloadManager.downloadFile, {
        fileNameWithExtension,
        onProgress,
        url,
      })
      const currentEpisodes: Episode[] = yield select(
        (state: RootState) => state.downloads.episodes.episodes,
      )
      const nextDownloadedEpisodes = [
        ...currentEpisodes,
        { ...episode, localUrl: downloadUrl },
      ]

      yield call(
        AsyncStorage.setItem,
        STORE_EPISODES_DOWNLOADS,
        JSON.stringify(nextDownloadedEpisodes),
      )

      yield put(
        downloadEpisodeSuccess({
          ...payload.episode,
          localUrl: downloadUrl,
        }),
      )
    }
  } catch (error) {
    yield put(downloadEpisodeFailure())
  }
}

export function* watcherDownloadEpisodeSaga() {
  yield takeLatest(
    actionTypes.DOWNLOAD_EPISODES_REQUEST,
    downloadEpisodeSagaWorker,
  )
}

function* removeDownloadedEpisodeSagaWorker({ payload = {} }: DownloadAction) {
  try {
    if (payloadGuards.isEpisodeIdPayload(payload)) {
      const { episodeId, podcastId } = payload
      const currentEpisodes: Episode[] = yield select(
        (state: RootState) => state.downloads.episodes.episodes,
      )
      const parsedId = episodeId.replace(/[^a-zA-Z0-9]/g, '-')
      const fileName = `${podcastId}-${parsedId}.mp3`
      yield call(fileManager().deleteFile, fileName)
      const nextEpisodes = currentEpisodes.filter(({ id }) => id !== episodeId)
      yield call(
        AsyncStorage.setItem,
        STORE_EPISODES_DOWNLOADS,
        JSON.stringify(nextEpisodes),
      )
      yield put(downloadEpisodeRemoveSuccess(episodeId))
    }
  } catch (error) {
    yield put(downloadEpisodeRemoveFailure())
  }
}

export function* watcherRemoveDownloadedEpisode() {
  yield takeLatest(
    actionTypes.DOWNLOAD_EPISODES_REMOVE_REQUEST,
    removeDownloadedEpisodeSagaWorker,
  )
}

function* loadAllDownloadsSagaWorker() {
  try {
    const episodesStr: string | null = yield call(
      AsyncStorage.getItem,
      STORE_EPISODES_DOWNLOADS,
    )
    if (episodesStr) {
      const episodes: DownloadEpisode[] = JSON.parse(episodesStr)
      yield put(downloadEpisodesSetAll(episodes))
    }
  } catch (error) {}
}

export function* watcherLoadAllDownloads() {
  yield takeLatest(
    actionTypes.DOWNLOAD_EPISODES_LOAD_ALL,
    loadAllDownloadsSagaWorker,
  )
}

export const initialState: State = {
  episodes: [],
  isLoading: false,
  error: false,
}

const downloadEpisodesReducer = (
  state = initialState,
  action: DownloadAction,
): State => {
  const { payload = {}, type } = action
  switch (type) {
    case actionTypes.DOWNLOAD_EPISODES_SET_ALL: {
      if (payloadGuards.isEpisodesPayload(payload)) {
        const { episodes = [] } = payload
        return {
          ...state,
          episodes,
        }
      }
      return state
    }
    case actionTypes.DOWNLOAD_EPISODES_REQUEST:
    case actionTypes.DOWNLOAD_EPISODES_REMOVE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      }
    case actionTypes.DOWNLOAD_EPISODES_SUCCESS: {
      if (payloadGuards.isEpisodePayload(payload)) {
        const { episode } = payload
        return {
          ...state,
          episodes: [...state.episodes, episode],
          error: false,
          isLoading: false,
        }
      }
      return state
    }
    case actionTypes.DOWNLOAD_EPISODES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      }
    case actionTypes.DOWNLOAD_EPISODES_REMOVE_SUCCESS: {
      if (payloadGuards.isEpisodeIdPayload(payload)) {
        const { episodeId } = payload
        return {
          ...state,
          episodes: state.episodes.filter(({ id }) => id !== episodeId),
          isLoading: false,
        }
      }
      return state
    }
    case actionTypes.DOWNLOAD_EPISODES_REMOVE_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false,
      }
    default:
      return state
  }
}

export default downloadEpisodesReducer
