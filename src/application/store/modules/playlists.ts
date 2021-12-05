import { RootState } from '@application/store'
import { Playlist, Podcast, StoreAction } from '@application/types'
import {
  CreatePlaylist,
  createPlaylist,
  deletePlaylist,
  addPodcastToPlaylist,
  removePodcastFromPlaylist,
  getPlaylists,
} from '@infrastructure/api/playlist'

import { call, put, select, takeLatest } from 'redux-saga/effects'

const PLAYLIST_GET_PLAYLISTS_START = 'playlist/get-playlists-start'
const PLAYLIST_GET_PLAYLISTS_SUCCESS = 'playlist/get-playlists-success'
const PLAYLIST_GET_PLAYLISTS_FAILURE = 'playlist/get-playlists-failure'

const PLAYLIST_START_CREATE_PLAYLIST = 'playlist/create-playlist'
const PLAYLIST_ADD_PLAYLIST = 'playlist/add-playlist'
const PLAYLIST_START_REMOVE_PLAYLIST = 'playlist/start-remove-playlist'
const PLAYLIST_REMOVE_PLAYLIST = 'playlist/remove-playlist'

const PLAYLIST_START_ADD_PODCAST = 'playlist/start-add-podcast'
const PLAYLIST_ADD_PODCAST_TO_PLAYLIST = 'playlist/add-podcast'
const PLAYLIST_START_REMOVE_PODCAST = 'playlist/start-remove-podcast'
const PLAYLIST_REMOVE_PODCAST_FROM_PLAYLIST =
  'playlist/remove-podcast-from-playlist'

type PlaylistPayloads =
  | {
      playlists: Playlist[]
    }
  | {
      createdPlaylist: Playlist
    }
  | {
      updatedPlaylist: Playlist
    }
  | {
      removedPlaylistId: Playlist['id']
    }
  | {
      addedPodcast: Podcast & { playlistId: Playlist['id'] }
    }
  | {
      playlistId: Playlist['id']
      removedPodcastId: Podcast['id']
    }

export const playlistGetPlaylistsStart = (): StoreAction<void> => ({
  type: PLAYLIST_GET_PLAYLISTS_START,
})

const playlistsGetPlaylistsSuccess = (
  playlists: Playlist[],
): StoreAction<PlaylistPayloads> => ({
  type: PLAYLIST_GET_PLAYLISTS_SUCCESS,
  payload: {
    playlists,
  },
})

const playlistsGetPlaylistsFailure = (): StoreAction<PlaylistPayloads> => ({
  type: PLAYLIST_GET_PLAYLISTS_FAILURE,
})

export const playlistStartCreatePlaylist = (
  opts: CreatePlaylistSagaWorkerOptions,
): StoreAction<CreatePlaylistSagaWorkerOptions> => ({
  type: PLAYLIST_START_CREATE_PLAYLIST,
  payload: opts,
})

export const playlistAddPlaylist = (
  playlist: Playlist,
): StoreAction<PlaylistPayloads> => ({
  type: PLAYLIST_ADD_PLAYLIST,
  payload: { createdPlaylist: playlist },
})

export const playlistRemovePlaylist = (
  playlistId: Playlist['id'],
): StoreAction<PlaylistPayloads> => ({
  type: PLAYLIST_REMOVE_PLAYLIST,
  payload: { removedPlaylistId: playlistId },
})

export const playlistStartRemovePlaylist = (
  playlistId: Playlist['id'],
): StoreAction<PlaylistPayloads> => ({
  type: PLAYLIST_START_REMOVE_PLAYLIST,
  payload: { removedPlaylistId: playlistId },
})

export const playlistAddPodcast = (
  addedPodcast: Podcast & { playlistId: string },
): StoreAction<PlaylistPayloads> => ({
  type: PLAYLIST_ADD_PODCAST_TO_PLAYLIST,
  payload: { addedPodcast },
})

export const playlistRemovePodcast = (
  removedPodcastId: string,
  playlistId: string,
): StoreAction<PlaylistPayloads> => ({
  type: PLAYLIST_REMOVE_PODCAST_FROM_PLAYLIST,
  payload: {
    removedPodcastId,
    playlistId,
  },
})

type CreatePlaylistSagaWorkerOptions = {
  info: CreatePlaylist
  onSuccess?: (playlist: Playlist) => void
  onError?: (error: Error) => void
}

function* playlistStartCreatePlaylistSagaWorker({
  payload,
}: StoreAction<CreatePlaylistSagaWorkerOptions>) {
  const { info, onSuccess, onError } = payload || {}
  try {
    if (!info?.name.trim() || info?.ownerId === undefined) {
      throw new Error('Invalid playlist info')
    }
    const createdPlaylist: Playlist = yield call(createPlaylist, info)
    yield put(playlistAddPlaylist(createdPlaylist))
    if (onSuccess) yield call(onSuccess, createdPlaylist)
  } catch (error) {
    if (onError) yield call(onError, error as Error)
  }
}

export function* watcherCreatePlaylistSaga() {
  yield takeLatest(
    PLAYLIST_START_CREATE_PLAYLIST,
    playlistStartCreatePlaylistSagaWorker,
  )
}

type PlaylistStartRemoveOptions = {
  playlistId: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}

function* playlistStartRemovePlaylistSagaWorker({
  payload,
}: StoreAction<PlaylistStartRemoveOptions>) {
  const { playlistId = '', onError, onSuccess } = payload!
  try {
    yield call(deletePlaylist, playlistId)
    yield put(playlistRemovePlaylist(playlistId))
    if (onSuccess) yield call(onSuccess)
  } catch (error) {
    if (onError) yield call(onError, error as Error)
  }
}

export function* watcherRemovePlaylistSaga() {
  yield takeLatest(
    PLAYLIST_START_REMOVE_PLAYLIST,
    playlistStartRemovePlaylistSagaWorker,
  )
}

type PlaylistStartAddPodcastOptions = {
  updateInfo: {
    podcastId: string
    playlistId: string
  }
  onSuccess?: () => void
  onError?: (error: Error) => void
}

function* playlistStartAddPodcastSagaWorker({
  payload,
}: StoreAction<PlaylistStartAddPodcastOptions>) {
  const { updateInfo, onError, onSuccess } = payload!
  try {
    if (!updateInfo.playlistId || !updateInfo.podcastId) {
      throw new Error('Invalid update info')
    }
    const addedPodcast: Podcast = yield call(
      addPodcastToPlaylist,
      updateInfo.playlistId,
      updateInfo.podcastId,
    )
    yield put(
      playlistAddPodcast({
        ...addedPodcast,
        playlistId: updateInfo.playlistId,
      }),
    )
    if (onSuccess) yield call(onSuccess)
  } catch (error) {
    if (onError) yield call(onError, error as Error)
  }
}

export function* watcherAddPodcastSaga() {
  yield takeLatest(
    PLAYLIST_START_ADD_PODCAST,
    playlistStartAddPodcastSagaWorker,
  )
}

type PlaylistStartRemovePodcastOptions = PlaylistStartAddPodcastOptions

function* playlistStartRemovePodcastSagaWorker({
  payload,
}: StoreAction<PlaylistStartRemovePodcastOptions>) {
  const { updateInfo, onError, onSuccess } = payload!
  try {
    if (!updateInfo.playlistId || !updateInfo.podcastId) {
      throw new Error('Invalid update info')
    }
    const removedPodcast: Podcast = yield call(
      removePodcastFromPlaylist,
      updateInfo.playlistId,
      updateInfo.podcastId,
    )
    yield put(playlistRemovePodcast(removedPodcast.id, updateInfo.playlistId))
    if (onSuccess) yield call(onSuccess)
  } catch (error) {
    if (onError) yield call(onError, error as Error)
  }
}

export function* watcherRemovePodcastSaga() {
  yield takeLatest(
    PLAYLIST_START_REMOVE_PODCAST,
    playlistStartRemovePodcastSagaWorker,
  )
}

type PlaylistGetPlaylistsOptions = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

function* playlistGetPlaylistsSagaWorker({
  payload,
}: StoreAction<PlaylistGetPlaylistsOptions>) {
  const { onSuccess, onError } = payload!
  try {
    const userId: string = yield select(
      (state: RootState) => state.auth.currentUser?.id,
    )
    const playlists: Playlist[] = yield call(getPlaylists, userId)
    yield put(playlistsGetPlaylistsSuccess(playlists))
    if (onSuccess) yield call(onSuccess)
  } catch (error) {
    yield put(playlistsGetPlaylistsFailure())
    if (onError) yield call(onError, error as Error)
  }
}

export function* watcherGetPlaylistsSaga() {
  yield takeLatest(PLAYLIST_GET_PLAYLISTS_START, playlistGetPlaylistsSagaWorker)
}

type PlaylistStatus = 'idle' | 'loading' | 'error' | 'success'
type State = {
  playlists: Playlist[]
  status: PlaylistStatus
  error?: string | null
}

const initialState: State = {
  playlists: [],
  status: 'idle',
  error: null,
}

const playlistReducer = (
  state = initialState,
  action: StoreAction<PlaylistPayloads>,
): State => {
  const { type, payload } = action
  switch (type) {
    case PLAYLIST_GET_PLAYLISTS_START:
      return {
        ...state,
        status: 'loading',
      }
    case PLAYLIST_GET_PLAYLISTS_SUCCESS:
      if ('playlists' in payload!) {
        return {
          ...state,
          playlists: payload.playlists,
          status: 'success',
        }
      }
      return state
    case PLAYLIST_GET_PLAYLISTS_FAILURE:
      return {
        ...state,
        status: 'error',
      }
    case PLAYLIST_ADD_PLAYLIST:
      if ('createdPlaylist' in payload!) {
        const { createdPlaylist } = payload
        return {
          ...state,
          playlists: [...state.playlists, createdPlaylist],
        }
      }
      return state
    case PLAYLIST_REMOVE_PLAYLIST:
      if ('removedPlaylistId' in payload!) {
        const { removedPlaylistId } = payload
        return {
          ...state,
          playlists: state.playlists.filter(
            playlist => playlist.id !== removedPlaylistId,
          ),
        }
      }
      return state
    case PLAYLIST_ADD_PODCAST_TO_PLAYLIST:
      if ('addedPodcast' in payload!) {
        const { addedPodcast } = payload
        return {
          ...state,
          playlists: state.playlists.map(playlist => {
            if (playlist.id === addedPodcast.playlistId) {
              return {
                ...playlist,
                podcasts: [...playlist.podcasts, addedPodcast],
              }
            }
            return playlist
          }),
        }
      }
      return state
    case PLAYLIST_REMOVE_PODCAST_FROM_PLAYLIST:
      if ('removedPodcastId' in payload!) {
        const { removedPodcastId, playlistId } = payload
        return {
          ...state,
          playlists: state.playlists.map(playlist => {
            if (playlist.id === playlistId) {
              return {
                ...playlist,
                podcasts: playlist.podcasts.filter(
                  podcast => podcast.id !== removedPodcastId,
                ),
              }
            }
            return playlist
          }),
        }
      }
      return state
    default:
      return state
  }
}

export default playlistReducer
