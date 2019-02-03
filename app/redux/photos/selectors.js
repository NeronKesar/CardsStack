import * as R from 'ramda'

const getPhotosReducers = R.prop('photos')

export const getPhotos = R.pipe(
  getPhotosReducers,
  R.prop('photos'),
)

export const getIsLoading = R.pipe(
  getPhotosReducers,
  R.prop('isLoading'),
)
