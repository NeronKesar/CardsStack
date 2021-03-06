import React, { Component } from 'react'
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  NetInfo,
} from 'react-native'
import styled from 'styled-components'
import { isIphoneX } from 'react-native-iphone-x-helper'
import Constants from '../utils/Constants'
import { getDate } from '../utils/functions'
import Header from '../components/Header'
import ButtonTrash from '../components/ButtonTrash'
import ButtonFavorite from '../components/ButtonFavorite'
import store from '../redux/store'
import { setIsConnected } from '../redux/internet'

const Container = styled.View`
  flex: 1;
  background-color: ${Constants.colors.WHITE};
  padding-top: ${isIphoneX() ? 50 : 30}px;
`

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const CardsContainer = styled.View`
  flex: 1;
`

const CardWrapper = styled.View`
  border-radius: 10;
  shadow-color: ${Constants.colors.BLACK};
  shadow-opacity: 0.2;
  shadow-radius: 20px;
  shadow-offset: 0px 20px;
  background-color: ${Constants.colors.WHITE};
`

const Card = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10;
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

const TextPhotos = styled.Text`
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${Constants.colors.WHITE};
  position: absolute;
  top: ${({ top }) => top}%;
  left: 7%;
`

const BottomText = styled.Text`
  font-size: 16;
  font-weight: 300;
  color: ${Constants.colors.DARK_GRAY};
  position: absolute;
  align-self: center;
  bottom: 3%;
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
            this.moveCardLeft()
          } else if (gestureState.dx > 200) {
            this.moveCardRight()
          }
        }
      },
    })
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    )
    this.props.getPhotosRequest()
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    )
  }

  handleConnectivityChange(isConnected) {
    store.dispatch(setIsConnected(isConnected))
  }

  moveCardLeft = () =>
    Animated
      .timing(this.state.pan, { toValue: { x: -500, y: 0 }, duration: 200 })
      .start(this.moveToTrash)

  moveCardRight = () =>
    Animated
      .timing(this.state.pan, { toValue: { x: 500, y: 0 }, duration: 200 })
      .start(this.moveToFavorites)

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

  handleTrash = () =>
    Animated
      .timing(this.state.pan, { toValue: { x: -200, y: 0 }, duration: 200 })
      .start()

  handleFavorites = () =>
    Animated
      .timing(this.state.pan, { toValue: { x: 200, y: 0 }, duration: 200 })
      .start()

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
                  <CardWrapper>
                    <Card source={{ uri: photos[photos.length - 3].img_src }} />
                  </CardWrapper>
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
                  <CardWrapper>
                    <Card source={{ uri: photos[photos.length - 2].img_src }} />
                  </CardWrapper>
                  <TextPhotos
                    size={24}
                    weight={500}
                    top={6}
                  >
                    Curiosity
                  </TextPhotos>
                  <TextPhotos
                    size={16}
                    weight={400}
                    top={12}
                  >
                    {photos[photos.length - 2].camera.full_name}
                  </TextPhotos>
                  <TextPhotos
                    size={16}
                    weight={400}
                    top={16}
                  >
                    {getDate(photos[photos.length - 2].earth_date)}
                  </TextPhotos>
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
                        outputRange: ['7%', `${isIphoneX() ? 24 : 19}%`],
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
                  <CardWrapper>
                    <Card source={{ uri: photos[photos.length - 1].img_src }} />
                  </CardWrapper>
                  <TextPhotos
                    size={24}
                    weight={500}
                    top={6}
                  >
                    Curiosity
                  </TextPhotos>
                  <TextPhotos
                    size={16}
                    weight={400}
                    top={12}
                  >
                    {photos[photos.length - 1].camera.full_name}
                  </TextPhotos>
                  <TextPhotos
                    size={16}
                    weight={400}
                    top={16}
                  >
                    {getDate(photos[photos.length - 1].earth_date)}
                  </TextPhotos>
                </Animated.View>
              )
              : (
                <NoPhotos>
                  <Text>No Photos</Text>
                </NoPhotos>
              )
          }
          {
            photos.length
              ? (
                <ButtonTrash
                  animatedValue={this.state.pan}
                  onPressIn={this.handleTrash}
                  onPressOut={this.moveCardLeft}
                />
              )
              : null
          }
          {
            photos.length
              ? (
                <ButtonFavorite
                  animatedValue={this.state.pan}
                  onPressIn={this.handleFavorites}
                  onPressOut={this.moveCardRight}
                />
              )
              : null
          }
        </CardsContainer>
      )
    }
  }

  render() {
    const { isLoading, photos, history, favorites } = this.props

    return (
      <Container>
        <Header
          undoActive={history.length === 0}
          undoDisabled={
            history.length === 0
            || this.state.userActionsDisabled
          }
          onUndoPress={this.handleUndo}
          favoritesDisabled={favorites.length === 0}
          onFavoritesPress={() => this.props.navigator.showModal({ screen: Constants. screens.FAVORITES_SCREEN })}
        />
        {this.renderContent()}
        <BottomText>
            {
              isLoading
                ? 'Downloading'
                : `${photos.length} cards`
            }
          </BottomText>
      </Container>
    )
  }
}

export default AllCardsScreen
