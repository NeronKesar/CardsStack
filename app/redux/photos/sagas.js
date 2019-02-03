import { all, put, takeLatest, delay } from 'redux-saga/effects'
import {
  GET_PHOTOS_REQUEST,
  getPhotosSuccess,
  getPhotosFailure,
} from './actions'

const getPhotosSaga = function* () {
  try {
    const array = [
      'red',
      'green',
      'blue',
      'yellow',
      'orange',
      'purple',
    ]

    yield delay(5000)
    yield put(getPhotosSuccess(array))

  } catch (error) {
    yield put(getPhotosFailure(error))
  }
}

const photosSaga = function* () {
  yield all([
    takeLatest(GET_PHOTOS_REQUEST, getPhotosSaga)
  ])
}

export default photosSaga
