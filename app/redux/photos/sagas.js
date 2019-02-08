import {
  all,
  put,
  takeLatest,
  delay,
  select,
  call,
} from 'redux-saga/effects'
import * as R from 'ramda'
import { Alert } from 'react-native'
import store from '../store'
import {
  GET_PHOTOS_REQUEST,
  getPhotosSuccess,
  getPhotosFailure,
  MOVE_TO_TRASH_REQUEST,
  moveToTrashFailure,
  MOVE_TO_FAVORITES_REQUEST,
  moveToFavoritesSuccess,
  moveToFavoritesFailure,
  setFavorites,
  moveToHistorySuccess,
  setHistory,
  UNDO_REQUEST,
  undoFailure,
} from './actions'
import {
  getPhotos,
  getFavorites,
  getHistory,
} from './selectors'
import { getPhotosApi } from './managers'
import { getIsConnected } from '../internet'

const getPhotosSaga = function* () {
  try {
    yield delay(500)
    const isConnected = yield select(getIsConnected)

    if (isConnected) {
      const response = yield call(getPhotosApi)

      yield put(getPhotosSuccess(response.photos))

    } else {
      Alert.alert('Error', 'No internet connection')
      yield put(getPhotosFailure())
    }

  } catch (error) {
    yield put(getPhotosFailure(error))
  }
}

const moveToTrashSaga = function* ({ payload: callback }) {
  try {
    const photosStore = yield select(getPhotos)
    const photos = [...photosStore]
    const lastPhoto = photos.pop()

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
    const favoritesStore = yield select(getFavorites)
    const favorites = [...favoritesStore]
    const historyStore = yield select(getHistory)
    const history = [...historyStore]
    const item = history.pop()

    if (item.category === 'trash') {
      photos.push(item)
    } else {
      favorites.pop()
      photos.push(item)
    }

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
