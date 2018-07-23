import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';

import { color } from '../Style/Color';

interface IProps {
  smallHeader?: boolean;
}

interface IState {}

class AuthenticationHeader extends PureComponent<IProps, IState> {
  static defaultProps = {
    smallHeader: true
  };

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
            source={require('./../../Assets/Images/loginLogo.png')}
            style={styles.image}
          />
        ) : (
          <Image source={require('./../../Assets/Images/onboardingLogo.png')} />
        )}
      </View>
    );
  }
}

export default AuthenticationHeader;

const styles = StyleSheet.create({
  smallHeader: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.secondary,
    ...Platform.select({
      ios: {
        shadowColor: color.grey,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },

  bigHeader: {
    height: 200
  },
  image: {
    marginTop: 20
  }
});
