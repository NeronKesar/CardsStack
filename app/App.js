import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { registerScreens } from './utils/navigationService'
import Constants from './utils/Constants'

registerScreens()

export default class App extends Component {
  constructor(props) {
    super(props)
    Navigation.startSingleScreenApp({
      screen: {
        screen: Constants.screens.ALL_CARDS_SCREEN,
      },
      animationType: 'fade',
      appStyle: {
        orientation: 'portrait',
        keepStyleAcrossPush: true,
      },
    })
  }
}


