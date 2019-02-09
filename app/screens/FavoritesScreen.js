import React, { Component } from 'react'
import { FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import { isIphoneX } from 'react-native-iphone-x-helper'
import Constants from '../utils/Constants'
import { getDate } from '../utils/functions'

const Container = styled.View`
  flex: 1;
  background-color: ${Constants.colors.WHITE};
`

const Header = styled.View`
  padding: ${isIphoneX() ? 40 : 20}px 18px 0px 10px;
  flex-direction: row;
`

const TextWrapper = styled.View`
  width: 85%;
  align-items: center;
  padding-top: 10px;
`

const Title = styled.Text`
  font-size: 22;
  font-weight: 500;
  color: ${Constants.colors.BLACK};
`

const Button = styled.TouchableOpacity`
  padding: 10px;
`

const ListItemContainer = styled.View`
  width: 100%;
  height: 300px;
  padding: 10px 18px 10px 18px;
`

const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

const TextPhotos = styled.Text`
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${Constants.colors.WHITE};
  position: absolute;
  top: ${({ top }) => top}%;
  left: 10%;
`

class Favorites extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  keyExtractor = item => item.img_src

  renderItem = ({ item }) => {
    return (
      <ListItemContainer>
        <Photo source={{ uri: item.img_src }} />
        <TextPhotos
          size={24}
          weight={500}
          top={10}
        >
          Curiosity
        </TextPhotos>
        <TextPhotos
          size={16}
          weight={400}
          top={20}
        >
          {item.camera.full_name}
        </TextPhotos>
        <TextPhotos
          size={16}
          weight={400}
          top={27}
        >
          {getDate(item.earth_date)}
        </TextPhotos>
      </ListItemContainer>
    )
  }

  render() {
    const { navigator, favorites } = this.props

    return (
      <Container>
        <Header>
          <Button onPress={() => navigator.dismissModal()}>
            <Icon
              name="ios-arrow-back"
              size={28}
              color={Constants.colors.RED}
            />
          </Button>
          <TextWrapper>
            <Title>Favorites</Title>
          </TextWrapper>
        </Header>
        <FlatList
          data={favorites}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </Container>
    )
  }
}

export default Favorites
