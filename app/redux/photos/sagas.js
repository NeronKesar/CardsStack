import {
  all,
  put,
  takeLatest,
  delay,
  select,
  call,
} from 'redux-saga/effects'
import * as R from 'ramda'
import {
  GET_PHOTOS_REQUEST,
  getPhotosSuccess,
  getPhotosFailure,
  MOVE_TO_TRASH_REQUEST,
  moveToTrashSuccess,
  moveToTrashFailure,
  MOVE_TO_FAVORITES_REQUEST,
  moveToFavoritesSuccess,
  moveToFavoritesFailure,
  MOVE_TO_HISTORY_REQUEST,
  moveToHistorySuccess,
  moveToHistoryFailure,
} from './actions'
import {
  getPhotos,
  getTrash,
  getFavorites,
  getHistory,
} from './selectors'

const getPhotosSaga = function* () {
  try {
    const array = [
      { color: 'red' },
      { color: 'green' },
      { color: 'blue' },
      { color: 'yellow' },
      { color: 'orange' },
      { color: 'purple' },
    ]

    yield delay(2000)
    yield put(getPhotosSuccess(array))

  } catch (error) {
    yield put(getPhotosFailure(error))
  }
}

const moveToTrashSaga = function* ({ payload: callback }) {
  try {
    const photosStore = yield select(getPhotos)
    const photos = [...photosStore]
    const lastPhoto = photos.pop()

    yield put(moveToTrashSuccess(lastPhoto))
    yield put(moveToHistorySuccess(R.merge(lastPhoto, { category: 'trash' })))
    yield call(callback)
    yield delay(500)
    yield put(getPhotosSuccess(photos))

  } catch (error) {
    yield put(moveToTrashFailure(error))
  }
}

const moveToFavoritesSaga = function* ({ payload: callback }) {
  try {
    const photosStore = yield select(getPhotos)
    const photos = [...photosStore]
    const lastPhoto = photos.pop()

    yield put(moveToFavoritesSuccess(lastPhoto))
    yield put(moveToHistorySuccess(R.merge(lastPhoto, { category: 'favorites' })))
    yield call(callback)
    yield delay(500)
    yield put(getPhotosSuccess(photos))
  } catch (error) {
    yield put(moveToFavoritesFailure(error))
  }
}

const photosSaga = function* () {
  yield all([
    takeLatest(GET_PHOTOS_REQUEST, getPhotosSaga),
    takeLatest(MOVE_TO_TRASH_REQUEST, moveToTrashSaga),
    takeLatest(MOVE_TO_FAVORITES_REQUEST, moveToFavoritesSaga),
  ])
}

export default photosSaga
