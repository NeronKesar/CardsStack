import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import AllCardsContainer from '../containers/AllCardsContainer'
import FavoritesContainer from '../containers/FavoritesContainer'
import Constants from './Constants'

export default function registerScreens(store) {
  Navigation.registerComponent(
    Constants.screens.ALL_CARDS_SCREEN,
    () => AllCardsContainer,
    store,
    Provider,
  )
  Navigation.registerComponent(
    Constants.screens.FAVORITES_SCREEN,
    () => FavoritesContainer,
    store,
    Provider,
  )
}
