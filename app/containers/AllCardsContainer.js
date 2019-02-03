import * as R from 'ramda'
import { connect } from 'react-redux'
import { getPhotos, getIsLoading, getPhotosRequest } from '../redux/photos'
import AllCardsScreen from '../screens/AllCardsScreen'

const mapStateToProps = R.applySpec({
  photos: getPhotos,
  isLoading: getIsLoading,
})

const mapDispactToProps = {
  getPhotosRequest
}

const AllCardsContainer = connect(
  mapStateToProps,
  mapDispactToProps,
)(AllCardsScreen)

export default AllCardsContainer
