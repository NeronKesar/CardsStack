import React, { Component } from 'react'
import { Animated, PanResponder } from 'react-native'
import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
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
        if (gestureState.dx > -200 && gestureState.dx < 200) {
          Animated
            .spring(this.state.pan, { toValue: { x: 0, y: 0 } })
            .start()
        } else if (gestureState.dx < -200) {
          Animated
            .timing(this.state.pan, { toValue: { x: -500, y: 0 }, duration: 200 })
            .start(this.moveStack)
        } else if (gestureState.dx > 200) {
          Animated
            .timing(this.state.pan, { toValue: { x: 500, y: 0 }, duration: 200 })
            .start(this.moveStack)
        }
      },
    })
  }

  moveStack = () =>
    Animated
      .timing(this.state.scale, { toValue: 1, duration: 500 })
      .start(() => {
        this.state.pan.setValue({ x: 0, y: 0 })
        this.state.scale.setValue(0)
    })

  render() {
    return (
      <Container>
        <Animated.View
          style={{
            width: '90%',
            height: '80%',
            backgroundColor: 'blue',
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
        />
        <Animated.View
          style={{
            width: '90%',
            height: '80%',
            backgroundColor: 'green',
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
        />
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            this.state.pan.getLayout(),
            {
              width: '90%',
              height: '80%',
              backgroundColor: 'red',
              zIndex: 3,
              marginTop: '19%',
              alignSelf: 'center',
              borderRadius: 10,
              transform: [
                { scale: 1 },
              ],
            }
          ]}
        />
      </Container>
    )
  }
}

export default CardsStack
