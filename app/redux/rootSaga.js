import { all, call } from 'redux-saga/effects'
import { photosSaga } from './photos'

const rootSaga = function* () {
  yield all([
    call(photosSaga)
  ])
}

export default rootSaga
