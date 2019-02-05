import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  getPhotos,
  moveToTrashRequest,
  moveToFavoritesRequest,
} from '../redux/photos'
import CardsStack from '../components/CardsStack'

const mapStateToProps = R.applySpec({
  photos: getPhotos,
})

const mapDispatchToProps = {
  moveToTrashRequest,
  moveToFavoritesRequest,
}

const CardsStackContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsStack)

export default CardsStackContainer
