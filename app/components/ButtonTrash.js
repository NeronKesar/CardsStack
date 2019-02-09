import React from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Feather'
import Constants from '../utils/Constants'

const Button = styled.TouchableOpacity`
  zIndex: 999;
  position: absolute;
  left: 19%;
  bottom: 4%;
`

const ButtonTrash = ({ animatedValue, onPressIn, onPressOut }) =>
  <Button
    activeOpacity={1}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
  >
    <Animated.View
      style={{
        width: 64,
        height: 64,
        backgroundColor: Constants.colors.BLACK,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Constants.colors.BLACK,
        shadowOpacity: 0.2,
        shadowRadius: 20,
        shadowOffset: {
          width: 0,
          height: 20,
        },
        transform: [{
          scale: animatedValue.x.interpolate({
            inputRange: [-500, -400, -200, 0],
            outputRange: [1, 1.25, 1.25, 1],
            extrapolate: 'clamp',
          })
        }],
      }}
    >
      <Icon
        name="thumbs-down"
        color={Constants.colors.WHITE}
        size={27}
        style={{ marginTop: 3 }}
      />
    </Animated.View>
  </Button>

export default ButtonTrash
