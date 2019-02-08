import * as R from 'ramda'

const getPhotosReducers = R.prop('photos')

export const getPhotos = R.pipe(
  getPhotosReducers,
  R.prop('photos'),
)

export const getFavorites = R.pipe(
  getPhotosReducers,
  R.prop('favorites'),
)

export const getHistory = R.pipe(
  getPhotosReducers,
  R.prop('history'),
)

export const getIsLoading = R.pipe(
  getPhotosReducers,
  R.prop('isLoading'),
)
