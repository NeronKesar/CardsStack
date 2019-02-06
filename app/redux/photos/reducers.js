import * as R from 'ramda'
import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAILURE,
  MOVE_TO_TRASH_SUCCESS,
  SET_TRASH,
  MOVE_TO_FAVORITES_SUCCESS,
  SET_FAVORITES,
  MOVE_TO_HISTORY_SUCCESS,
  SET_HISTORY,
} from './actions'

const photos = handleActions(
  {
    [GET_PHOTOS_SUCCESS]: (_, { payload }) => payload,
    [GET_PHOTOS_FAILURE]: R.always([]),
  },
  [],
)

const trash = handleActions(
  {
    [MOVE_TO_TRASH_SUCCESS]: (state, { payload }) => R.concat(state, [payload]),
    [SET_TRASH]: (_, { payload }) => payload,
  },
  [],
)

const favorites = handleActions(
  {
    [MOVE_TO_FAVORITES_SUCCESS]: (state, { payload }) => R.concat(state, [payload]),
    [SET_FAVORITES]: (_, { payload }) => payload,
  },
  [],
)

const history = handleActions(
  {
    [MOVE_TO_HISTORY_SUCCESS]: (state, { payload }) => R.concat(state, [payload]),
    [SET_HISTORY]: (_, { payload }) => payload,
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
  true,
)

const photosReducers = combineReducers({
  photos,
  trash,
  favorites,
  history,
  isLoading,
})

export default photosReducers
