import rootReducer from '@application/store/rootReducer'
import { createStore } from 'redux'

const store = createStore(rootReducer)

export default store
