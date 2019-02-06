import {
  all,
  put,
  takeLatest,
  delay,
  select,
  call,
} from 'redux-saga/effects'
import * as R from 'ramda'
import store from '../store'
import {
  GET_PHOTOS_REQUEST,
  getPhotosSuccess,
  getPhotosFailure,
  MOVE_TO_TRASH_REQUEST,
  moveToTrashSuccess,
  moveToTrashFailure,
  setTrash,
  MOVE_TO_FAVORITES_REQUEST,
  moveToFavoritesSuccess,
  moveToFavoritesFailure,
  setFavorites,
  MOVE_TO_HISTORY_REQUEST,
  moveToHistorySuccess,
  moveToHistoryFailure,
  setHistory,
  UNDO_REQUEST,
  undoSuccess,
  undoFailure,
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
    yield call(callback, () => store.dispatch(getPhotosSuccess(photos)))

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
    yield call(callback, () => store.dispatch(getPhotosSuccess(photos)))
  } catch (error) {
    yield put(moveToFavoritesFailure(error))
  }
}

const undoSaga = function* ({ payload: callback }) {
  try {
    const photosStore = yield select(getPhotos)
    const photos = [...photosStore]
    const trashStore = yield select(getTrash)
    const trash = [...trashStore]
    const favoritesStore = yield select(getFavorites)
    const favorites = [...favoritesStore]
    const historyStore = yield select(getHistory)
    const history = [...historyStore]
    const item = history.pop()

    if (item.category === 'trash') {
      photo = trash.pop()
      photos.push(photo)
    } else {
      photo = favorites.pop()
      photos.push(photo)
    }

    yield put(setTrash(trash))
    yield put(setFavorites(favorites))
    yield put(setHistory(history))
    yield put(getPhotosSuccess(photos))

    yield call(callback)

  } catch (error) {
    yield put(undoFailure(error))
  }
}

const photosSaga = function* () {
  yield all([
    takeLatest(GET_PHOTOS_REQUEST, getPhotosSaga),
    takeLatest(MOVE_TO_TRASH_REQUEST, moveToTrashSaga),
    takeLatest(MOVE_TO_FAVORITES_REQUEST, moveToFavoritesSaga),
    takeLatest(UNDO_REQUEST, undoSaga),
  ])
}

export default photosSaga
