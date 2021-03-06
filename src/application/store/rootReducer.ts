import { combineReducers } from 'redux'

import authReducer from './modules/auth'
import authorsReducer from './modules/authors'
import { podcastsReducer } from './modules/podcasts'
import topicsReducer from './modules/topics'
import playlistsReducer from './modules/playlists'
import downloadsReducer from './modules/downloads'
import { episodesReducer } from './modules/episodes'

const rootReducer = combineReducers({
  auth: authReducer,
  authors: authorsReducer,
  downloads: downloadsReducer,
  playlists: playlistsReducer,
  podcasts: podcastsReducer,
  userTopics: topicsReducer,
  episodes: episodesReducer,
})

export default rootReducer
