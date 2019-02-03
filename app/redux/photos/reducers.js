import * as R from 'ramda'
import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAILURE,
} from './actions'

const photos = handleActions(
  {
    [GET_PHOTOS_SUCCESS]: (_, { payload }) => payload,
    [GET_PHOTOS_FAILURE]: R.always([]),
  },
  [],
)

const isLoading = handleActions(
  {
    [GET_PHOTOS_REQUEST]: R.T,
    [combineActions(
      GET_PHOTOS_SUCCESS,
      GET_PHOTOS_FAILURE,
    )]: R.F,
  },
  false,
)

const photosReducers = combineReducers({
  photos,
  isLoading,
})

export default photosReducers
