import { createAction } from 'redux-actions'
import Constants from '../../utils/Constants'

const moduleName = 'photos'

export const GET_PHOTOS_REQUEST = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_REQUEST`
export const GET_PHOTOS_SUCCESS = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_SUCCESS`
export const GET_PHOTOS_FAILURE = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_FAILURE`

export const MOVE_TO_TRASH_REQUEST = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_TRASH_REQUEST`

export const MOVE_TO_FAVORITES_REQUEST = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_FAVORITES_REQUEST`
export const MOVE_TO_FAVORITES_SUCCESS = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_FAVORITES_SUCCESS`
export const MOVE_TO_FAVORITES_FAILURE = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_FAVORITES_FAULIRE`
export const SET_FAVORITES = `${Constants.APP_NAME}/${moduleName}/SET_FAVORITES`

export const MOVE_TO_HISTORY_REQUEST = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_HISTORY_REQUEST`
export const MOVE_TO_HISTORY_SUCCESS = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_HISTORY_SUCCESS`
export const MOVE_TO_HISTORY_FAILURE = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_HISTORY_FAILURE`
export const SET_HISTORY = `${Constants.APP_NAME}/${moduleName}/SET_HISTORY`

export const UNDO_REQUEST = `${Constants.APP_NAME}/${moduleName}/UNDO_REQUEST`
export const UNDO_SUCCESS = `${Constants.APP_NAME}/${moduleName}/UNDO_SUCCESS`
export const UNDO_FAILURE = `${Constants.APP_NAME}/${moduleName}/UNDO_FAILURE`

export const getPhotosRequest = createAction(GET_PHOTOS_REQUEST)
export const getPhotosSuccess = createAction(GET_PHOTOS_SUCCESS)
export const getPhotosFailure = createAction(GET_PHOTOS_FAILURE)

export const moveToTrashRequest = createAction(MOVE_TO_TRASH_REQUEST)

export const moveToFavoritesRequest = createAction(MOVE_TO_FAVORITES_REQUEST)
export const moveToFavoritesSuccess = createAction(MOVE_TO_FAVORITES_SUCCESS)
export const moveToFavoritesFailure = createAction(MOVE_TO_FAVORITES_FAILURE)
export const setFavorites = createAction(SET_FAVORITES)

export const moveToHistoryRequest = createAction(MOVE_TO_HISTORY_REQUEST)
export const moveToHistorySuccess = createAction(MOVE_TO_HISTORY_SUCCESS)
export const moveToHistoryFailure = createAction(MOVE_TO_HISTORY_FAILURE)
export const setHistory = createAction(SET_HISTORY)

export const undoRequest = createAction(UNDO_REQUEST)
export const undoSuccess = createAction(UNDO_SUCCESS)
export const undoFailure = createAction(UNDO_FAILURE)
