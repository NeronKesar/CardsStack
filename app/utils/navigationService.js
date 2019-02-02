import { Navigation } from 'react-native-navigation'
import AllCardsScreen from '../screens/AllCardsScreen'
import Constants from './Constants'

export const registerScreens = () => {
  Navigation.registerComponent(
    Constants.screens.ALL_CARDS_SCREEN,
    () => AllCardsScreen,
  )
}
