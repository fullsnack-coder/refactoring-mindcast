import { combineReducers } from 'redux'

import topicsReducer from './modules/topics'

const rootReducer = combineReducers({
  topics: topicsReducer,
})

export default rootReducer
