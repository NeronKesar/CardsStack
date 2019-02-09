import { combineReducers } from 'redux'
import photos from './photos'
import internet from './internet'
import navigator from './navigator'

const rootReducer = combineReducers({
  photos,
  internet,
  navigator,
})

export default rootReducer
