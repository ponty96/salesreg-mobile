import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'

import styles from '../Style/Auth'

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
          <Image
            source={require('./../../Images/logo_mini.png')}
          />
        ) : (
          <Image
            source={require('./../../Images/logo.png')}
          />
        )}
      </View>
    )
  }
}

export default AuthenticationHeader
