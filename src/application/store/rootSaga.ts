import { all } from 'redux-saga/effects'

import {
  watcherLoginAuthentication,
  watcherRegisterAuthentication,
} from './modules/auth'

import { watcherHottestPodcasts } from './modules/podcasts'
import { getTopAuthorsWatcher } from './modules/authors'

export default function* rootSaga() {
  yield all([
    watcherLoginAuthentication(),
    watcherRegisterAuthentication(),
    watcherHottestPodcasts(),
    getTopAuthorsWatcher(),
  ])
}
