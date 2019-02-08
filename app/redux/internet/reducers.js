import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'
import { SET_IS_CONNECTED } from './actions'

const isConnected = handleAction(
  SET_IS_CONNECTED,
  (_, { payload }) => payload,
  false,
)

const internetReducers = combineReducers({
  isConnected,
})

export default internetReducers
