import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import sagaMiddlewareFactory from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleWare = sagaMiddlewareFactory()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare, logger))

sagaMiddleWare.run(rootSaga)

export default store
