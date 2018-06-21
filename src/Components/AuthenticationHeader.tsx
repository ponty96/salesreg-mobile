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
          <Image source={require('./../../Assets/Images/logo.png')} />
        )}
      </View>
    )
  }
}

export default AuthenticationHeader

const styles = StyleSheet.create({
  smallHeader: {
    height: '20%',
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bigHeader: {
    height: '36%'
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
