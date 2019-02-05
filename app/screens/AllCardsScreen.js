import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import Constants from '../utils/Constants'
import Header from '../components/Header'
import CardsStackContainer from '../containers/CardsStackContainer'

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

class AllCardsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  }

  componentDidMount() {
    this.props.getPhotosRequest()
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
      return <CardsStackContainer />
    }
  }

  render() {
    return (
      <Container>
        <Header />
        {this.renderContent()}
      </Container>
    )
  }
}

export default AllCardsScreen
