import { combineReducers } from 'redux'

import authReducer from './modules/auth'
import authorsReducer from './modules/authors'
import podcastsReducer from './modules/podcasts'
import topicsReducer from './modules/topics'

const rootReducer = combineReducers({
  auth: authReducer,
  topics: topicsReducer,
  podcasts: podcastsReducer,
  authors: authorsReducer,
})

export default rootReducer
