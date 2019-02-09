import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  getPhotos,
  getHistory,
  getFavorites,
  getIsLoading,
  getPhotosRequest,
  moveToTrashRequest,
  moveToFavoritesRequest,
  undoRequest,
} from '../redux/photos'
import AllCardsScreen from '../screens/AllCardsScreen'

const mapStateToProps = R.applySpec({
  photos: getPhotos,
  history: getHistory,
  favorites: getFavorites,
  isLoading: getIsLoading,
})

const mapDispactToProps = {
  getPhotosRequest,
  moveToTrashRequest,
  moveToFavoritesRequest,
  undoRequest,
}

const AllCardsContainer = connect(
  mapStateToProps,
  mapDispactToProps,
)(AllCardsScreen)

export default AllCardsContainer
