import rootReducer from '@application/store/rootReducer'
import rootSaga from '@application/store/rootSaga'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
