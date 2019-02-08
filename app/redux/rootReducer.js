import { combineReducers } from 'redux'
import photos from './photos'
import internet from './internet'

const rootReducer = combineReducers({
  photos,
  internet,
})

export default rootReducer
