import React, { Component } from 'react'
import { Animated, PanResponder } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import styled from 'styled-components'
import Constants from '../utils/Constants';

const Container = styled.View`
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

class CardsStack extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(0),
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, { dx: this.state.pan.x }]),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= -200 && gestureState.dx <= 200) {
          Animated
            .spring(this.state.pan, { toValue: { x: 0, y: 0 } })
            .start()
        } else if (gestureState.dx < -200) {
          Animated
            .timing(this.state.pan, { toValue: { x: -500, y: 0 }, duration: 200 })
            .start(this.moveToTrash)
        } else if (gestureState.dx > 200) {
          Animated
            .timing(this.state.pan, { toValue: { x: 500, y: 0 }, duration: 200 })
            .start(this.moveToFavorites)
        }
      },
    })
  }

  moveToTrash = () =>
    this.props.moveToTrashRequest(this.moveStack)

  moveToFavorites = () =>
    this.props.moveToFavoritesRequest(this.moveStack)

  moveStack = () =>
    Animated
      .timing(this.state.scale, { toValue: 1, duration: 500 })
      .start(() => {
        this.state.pan.setValue({ x: 0, y: 0 })
        this.state.scale.setValue(0)
    })

  render() {
    const { photos } = this.props

    return (
      <Container>
        {
          photos[photos.length - 3]
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
                      inputRange: [0, 1], outputRange: [0.8, 0.9],
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
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    })
                  }],
                }}
              >
                <Card color={this.props.photos[this.props.photos.length - 2].color} />
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
                    height: `${isIphoneX() ? 92 : 87}%`,
                    zIndex: 3,
                    marginTop: `${isIphoneX() ? 24 : 19}%`,
                    alignSelf: 'center',
                    borderRadius: 10,
                    transform: [
                      { scale: 1 },
                    ],
                  }
                ]}
              >
                <Card color={this.props.photos[this.props.photos.length - 1].color} />
              </Animated.View>
            )
            : (
              <NoPhotos>
                <Text>No Photos</Text>
              </NoPhotos>
            )
        }
      </Container>
    )
  }
}

export default CardsStack
