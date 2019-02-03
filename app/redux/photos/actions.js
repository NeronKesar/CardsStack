import { createAction } from 'redux-actions'
import Constants from '../../utils/Constants'

const moduleName = 'photos'

export const GET_PHOTOS_REQUEST = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_REQUEST`
export const GET_PHOTOS_SUCCESS = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_SUCCESS`
export const GET_PHOTOS_FAILURE = `${Constants.APP_NAME}/${moduleName}/GET_PHOTOS_FAILURE`

export const getPhotosRequest = createAction(GET_PHOTOS_REQUEST)
export const getPhotosSuccess = createAction(GET_PHOTOS_SUCCESS)
export const getPhotosFailure = createAction(GET_PHOTOS_FAILURE)
