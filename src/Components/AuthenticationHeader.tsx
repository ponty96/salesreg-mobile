import React, { PureComponent } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { color } from '../Style/Color'

interface IProps {
  smallHeader?: boolean
}

interface IState {}

class AuthenticationHeader extends PureComponent<IProps, IState> {
  static defaultProps = {
    smallHeader: true
  }

  render() {
    return (
      <View
        style={
          this.props.smallHeader
            ? styles.smallHeader
            : [styles.smallHeader, styles.bigHeader]
        }
      >
        {this.props.smallHeader ? (
          <Image source={require('./../../Assets/Images/loginLogo.png')} />
        ) : (
          <Image source={require('./../../Assets/Images/onboardingLogo.png')} />
        )}
      </View>
    )
  }
}

export default AuthenticationHeader

const styles = StyleSheet.create({
  smallHeader: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondary,
    shadowOffset: { width: 5, height: 5 },
    elevation: 5
  },
  bigHeader: {
    height: 200
  }
})
