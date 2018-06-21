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
          <Image source={require('./../../Assets/Images/logo_mini.png')} />
        ) : (
<<<<<<< HEAD
          <Image source={require('./../../Images/onboardingLogo.png')} />
=======
          <Image source={require('./../../Assets/Images/logo.png')} />
>>>>>>> 69d2835812952db407f0696f460eb5ebd7a26859
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
    alignItems: 'center',
    backgroundColor: color.secondary
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
