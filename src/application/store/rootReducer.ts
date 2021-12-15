import { combineReducers } from 'redux'

import authReducer from './modules/auth'
import authorsReducer from './modules/authors'
import { podcastsReducer } from './modules/podcasts'
import topicsReducer from './modules/topics'
import playlistsReducer from './modules/playlists'

const rootReducer = combineReducers({
  playlists: playlistsReducer,
  auth: authReducer,
  authors: authorsReducer,
  topics: topicsReducer,
  podcasts: podcastsReducer,
})

export default rootReducer
