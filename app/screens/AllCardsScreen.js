import React, { Component } from 'react'
import styled from 'styled-components'
import Constants from '../utils/Constants'
import Header from '../components/Header'
import CardsStack from '../components/CardsStack'

const Container = styled.View`
  flex: 1;
  background-color: ${Constants.colors.WHITE};
  padding-top: 30px;
`

class AllCardsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  render() {
    return (
      <Container>
        <Header />
        <CardsStack />
      </Container>
    )
  }
}

export default AllCardsScreen
