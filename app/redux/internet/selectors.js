import * as R from 'ramda'

const getInternetReducers = R.prop('internet')

export const getIsConnected = R.pipe(
  getInternetReducers,
  R.prop('isConnected'),
)
