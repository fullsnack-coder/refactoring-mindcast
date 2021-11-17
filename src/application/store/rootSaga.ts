import { all } from 'redux-saga/effects'

import {
  watcherLoginAuthentication,
  watcherRegisterAuthentication,
} from './modules/auth'

export default function* rootSaga() {
  yield all([watcherLoginAuthentication(), watcherRegisterAuthentication()])
}
