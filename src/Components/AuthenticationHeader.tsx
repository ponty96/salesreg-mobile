import React, { PureComponent } from 'react'
import { View, Image, StyleSheet } from 'react-native'

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
          <Image source={require('./../../Images/logo_mini.png')} />
        ) : (
          <Image source={require('./../../Images/onboardingLogo.png')} />
        )}
      </View>
    )
  }
}

export default AuthenticationHeader

const styles = StyleSheet.create({
  smallHeader: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigHeader: {
    height: 200
  },
  smallHeaderLogo: {
    flex: 0.4,
    alignSelf: 'center',
    width: '44%'
  },
  bigHeaderLogo: {
    flex: 0.6,
    alignSelf: 'center',
    width: '23%'
  }
})
