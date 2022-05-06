import React from 'react'
import { ImageBackground } from 'react-native'

interface IProps {
  children: any
}

const style = {
  flex: 1,
  height: null,
  width: null
}
export default class OnboardingContainer extends React.PureComponent<IProps> {
  render() {
    return (
      <ImageBackground
        source={require('../../assets-v1/onboard-screen-background.png')}
        style={style}
      >
        {this.props.children}
      </ImageBackground>
    )
  }
}
