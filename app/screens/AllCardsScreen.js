import React, { Component } from 'react'
import {
  ActivityIndicator,
  Animated,
  PanResponder,
} from 'react-native'
import styled from 'styled-components'
import { isIphoneX } from 'react-native-iphone-x-helper'
import Constants from '../utils/Constants'
import Header from '../components/Header'

const Container = styled.View`
  flex: 1;
  background-color: ${Constants.colors.WHITE};
  padding-top: 30px;
`

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const CardsContainer = styled.View`
  flex: 1;
`

const Card = styled.View`
  flex: 1;
  border-radius: 10;
  background-color: ${({ color }) => color};
`

const NoPhotos = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Text = styled.Text`
  font-size: 22;
  font-weight: 500;
  color: ${Constants.colors.GRAY};
`

class AllCardsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  constructor(props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(0),
      userActionsDisabled: false,
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, this.state.userActionsDisabled || { dx: this.state.pan.x }]),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (!this.state.userActionsDisabled) {
          if (gestureState.dx >= -200 && gestureState.dx <= 200) {
            this.moveCard()
          } else if (gestureState.dx < -200) {
            Animated
              .timing(this.state.pan, { toValue: { x: -500, y: 0 }, duration: 200 })
              .start(this.moveToTrash)
          } else if (gestureState.dx > 200) {
            Animated
              .timing(this.state.pan, { toValue: { x: 500, y: 0 }, duration: 200 })
              .start(this.moveToFavorites)
          }
        }
      },
    })
  }

  componentDidMount() {
    this.props.getPhotosRequest()
  }

  moveToTrash = () =>
    this.props.moveToTrashRequest(this.moveStack)

  moveToFavorites = () =>
    this.props.moveToFavoritesRequest(this.moveStack)

  moveStack = callback =>
    Animated
      .timing(this.state.scale, { toValue: 1, duration: 500 })
      .start(() => {
        this.state.pan.setValue({ x: 0, y: 0 })
        this.state.scale.setValue(0)
        callback()
      })

  moveStackBack = side => {
    this.setState({ userActionsDisabled: true })
    Animated
      .timing(this.state.scale, { toValue: -1, duration: 500 })
      .start(() => {
        this.state.pan.setValue({ x: 500 * side, y: 0 })
        this.state.scale.setValue(0)
        this.props.undoRequest(() => {
          this.moveCard()
          this.setState({ userActionsDisabled: false })
        })
      })
  }

  moveCard = () =>
    Animated
      .spring(this.state.pan, { toValue: { x: 0, y: 0 } })
      .start()

  handleUndo = () => {
    const { history } = this.props

    if (!this.state.userActionsDisabled) {
      this.moveStackBack(history[history.length - 1].category === 'trash' ? -1 : 1)
    }
  }

  renderContent = () => {
    if (this.props.isLoading) {
      return (
        <LoaderContainer>
          <ActivityIndicator
            color={Constants.colors.RED}
            size="large"
          />
        </LoaderContainer>
      )
    } else {
      const { photos } = this.props

      return (
        <CardsContainer>
          {
            photos[photos.length - 3] && !this.state.userActionsDisabled
              ? (
                <Animated.View
                  style={{
                    width: '90%',
                    height: '80%',
                    zIndex: 1,
                    position: 'absolute',
                    alignSelf: 'center',
                    borderRadius: 10,
                    bottom: this.state.scale.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['22.5%', '15.5%']
                    }),
                    transform: [{
                      scale: this.state.scale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 0.9],
                      })
                    }],
                  }}
                >
                  <Card color={photos[photos.length - 3].color} />
                </Animated.View>
              )
              : null
          }
          {
            photos[photos.length - 2]
              ? (
                <Animated.View
                  style={{
                    width: '90%',
                    height: '80%',
                    zIndex: 2,
                    position: 'absolute',
                    alignSelf: 'center',
                    borderRadius: 10,
                    bottom: this.state.scale.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['15.5%', '8.5%']
                    }),
                    transform: [{
                      scale: this.state.scale.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [0.8, 0.9, 1],
                      })
                    }],
                  }}
                >
                  <Card color={photos[photos.length - 2].color} />
                </Animated.View>
              )
              : null
          }
          {
            photos[photos.length - 1]
              ? (
                <Animated.View
                  {...this.panResponder.panHandlers}
                  style={[
                    this.state.pan.getLayout(),
                    {
                      width: '90%',
                      height: this.state.scale.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [
                          `${isIphoneX() ? 85.5 : 82}%`,
                          `${isIphoneX() ? 92 : 87.5}%`
                        ],
                      }),
                      zIndex: 3,
                      marginTop: this.state.scale.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [
                          `${isIphoneX() ? 7 : 7}%`,
                          `${isIphoneX() ? 24 : 19}%`
                        ]
                      }),
                      alignSelf: 'center',
                      borderRadius: 10,
                      transform: [{
                        scale: this.state.scale.interpolate({
                          inputRange: [-1, 0],
                          outputRange: [0.9, 1],
                        })
                      }],
                    }
                  ]}
                >
                  <Card color={photos[photos.length - 1].color} />
                </Animated.View>
              )
              : (
                <NoPhotos>
                  <Text>No Photos</Text>
                </NoPhotos>
              )
          }
        </CardsContainer>
      )
    }
  }

  render() {
    return (
      <Container>
        <Header
          undoActive={this.props.history.length === 0}
          undoDisabled={
            this.props.history.length === 0
            || this.state.userActionsDisabled
          }
          onUndoPress={this.handleUndo}
        />
        {this.renderContent()}
      </Container>
    )
  }
}

export default AllCardsScreen
