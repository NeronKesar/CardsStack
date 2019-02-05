import { createAction } from 'redux-actions'
import Constants from '../../utils/Constants'

const moduleName = 'photos'

export const GET_PHOTOS_REQUEST = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_REQUEST`
export const GET_PHOTOS_SUCCESS = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_SUCCESS`
export const GET_PHOTOS_FAILURE = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_FAILURE`

export const MOVE_TO_TRASH_REQUEST = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_TRASH_REQUEST`
export const MOVE_TO_TRASH_SUCCESS = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_TRASH_SUCCESS`
export const MOVE_TO_TRASH_FAILURE = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_TRASH_FAILURE`

export const MOVE_TO_FAVORITES_REQUEST = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_FAVORITES_REQUEST`
export const MOVE_TO_FAVORITES_SUCCESS = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_FAVORITES_SUCCESS`
export const MOVE_TO_FAVORITES_FAILURE = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_FAVORITES_FAULIRE`

export const MOVE_TO_HISTORY_REQUEST = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_HISTORY_REQUEST`
export const MOVE_TO_HISTORY_SUCCESS = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_HISTORY_SUCCESS`
export const MOVE_TO_HISTORY_FAILURE = `${Constants.APP_NAME}/${moduleName}/MOVE_TO_HISTORY_FAILURE`

export const getPhotosRequest = createAction(GET_PHOTOS_REQUEST)
export const getPhotosSuccess = createAction(GET_PHOTOS_SUCCESS)
export const getPhotosFailure = createAction(GET_PHOTOS_FAILURE)

export const moveToTrashRequest = createAction(MOVE_TO_TRASH_REQUEST)
export const moveToTrashSuccess = createAction(MOVE_TO_TRASH_SUCCESS)
export const moveToTrashFailure = createAction(MOVE_TO_TRASH_FAILURE)

export const moveToFavoritesRequest = createAction(MOVE_TO_FAVORITES_REQUEST)
export const moveToFavoritesSuccess = createAction(MOVE_TO_FAVORITES_SUCCESS)
export const moveToFavoritesFailure = createAction(MOVE_TO_FAVORITES_FAILURE)

export const moveToHistoryRequest = createAction(MOVE_TO_HISTORY_REQUEST)
export const moveToHistorySuccess = createAction(MOVE_TO_HISTORY_SUCCESS)
export const moveToHistoryFailure = createAction(MOVE_TO_HISTORY_FAILURE)
