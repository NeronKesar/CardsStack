import { createAction } from 'redux-actions'
import Constants from '../../utils/Constants'

const moduleName = 'internet'

export const SET_IS_CONNECTED = `${Constants.APP_NAME}/${moduleName}/SET_IS_CONNECTED`

export const setIsConnected = createAction(SET_IS_CONNECTED)
