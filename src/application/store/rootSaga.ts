import { all } from 'redux-saga/effects'

import {
  watcherLoginAuthentication,
  watcherRegisterAuthentication,
  watcherLogoutAuthentication,
} from './modules/auth'

import { getTopAuthorsWatcher } from './modules/authors'
import {
  watcherDownloadEpisodeSaga,
  watcherRemoveDownloadedEpisode,
  watcherLoadAllDownloads,
} from './modules/downloads'
import {
  watcherUpdateRecentlyEpisode,
  watcherLoadRecentlyList,
} from './modules/episodes'
import {
  watcherCreatePlaylistSaga,
  watcherRemovePlaylistSaga,
  watcherAddPodcastSaga,
  watcherRemovePodcastSaga,
  watcherGetPlaylistsSaga,
} from './modules/playlists'

import { watcherHottestPodcasts, watcherNewReleases } from './modules/podcasts'
import {
  getTopicsSagaWatcher,
  saveTopicToUserWatcher,
  removeTopicFromUserWatcher,
} from './modules/topics'

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
    watcherDownloadEpisodeSaga(),
    watcherRemoveDownloadedEpisode(),
    watcherLoadAllDownloads(),
    getTopicsSagaWatcher(),
    saveTopicToUserWatcher(),
    removeTopicFromUserWatcher(),
    watcherUpdateRecentlyEpisode(),
    watcherLoadAllDownloads(),
    watcherLogoutAuthentication(),
  ])
}
