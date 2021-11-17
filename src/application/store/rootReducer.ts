import { combineReducers } from 'redux'

import authReducer from './modules/auth'
import topicsReducer from './modules/topics'

const rootReducer = combineReducers({
  auth: authReducer,
  topics: topicsReducer,
})

export default rootReducer
