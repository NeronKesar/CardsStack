import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Feather'
import Constants from '../utils/Constants'

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 18px;
`
const Text = styled.Text`
  color: ${({ color }) => color};
  fontSize: ${({ size }) => size};
  font-weight: ${({ weight }) => weight || 'normal'};
  margin-right: ${({ marginRight }) => marginRight || 0}px;
`
const Button = styled.TouchableOpacity``

const Header = ({ undoActive, undoDisabled, onUndoPress }) => {
  return (
    <Container>
      <Button
        disabled={undoDisabled}
        onPress={onUndoPress}
      >
        <Text
          color={
            undoActive
              ? Constants.colors.GRAY
              : Constants.colors.RED
          }
          size={18}
          weight={500}
        >
          Undo
        </Text>
      </Button>
      <Text
        color={Constants.colors.BLACK}
        size={22}
        weight={500}
        marginRight={12}
      >
        My Mars
      </Text>
      <Button>
        <Icon
          name="heart"
          size={28}
          color={Constants.colors.RED}
        />
      </Button>
    </Container>
  )
}

export default Header
