import { all } from 'redux-saga/effects'

import {
  watcherLoginAuthentication,
  watcherRegisterAuthentication,
} from './modules/auth'

import { getTopAuthorsWatcher } from './modules/authors'
import {
  watcherCreatePlaylistSaga,
  watcherRemovePlaylistSaga,
  watcherAddPodcastSaga,
  watcherRemovePodcastSaga,
  watcherGetPlaylistsSaga,
} from './modules/playlists'

import { watcherHottestPodcasts, watcherNewReleases } from './modules/podcasts'

export default function* rootSaga() {
  yield all([
    watcherLoginAuthentication(),
    watcherRegisterAuthentication(),
    watcherHottestPodcasts(),
    getTopAuthorsWatcher(),
    watcherGetPlaylistsSaga(),
    watcherCreatePlaylistSaga(),
    watcherRemovePlaylistSaga(),
    watcherAddPodcastSaga(),
    watcherRemovePodcastSaga(),
    watcherNewReleases(),
  ])
}
