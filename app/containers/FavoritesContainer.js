import * as R from 'ramda'
import { connect } from 'react-redux'
import { getFavorites } from '../redux/photos'
import FavoritesScreen from '../screens/FavoritesScreen'

const mapStateToProps = R.applySpec({
  favorites: getFavorites,
})

const FavoritesContainer = connect(
  mapStateToProps,
)(FavoritesScreen)

export default FavoritesContainer
