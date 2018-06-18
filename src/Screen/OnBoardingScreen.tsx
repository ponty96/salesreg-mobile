import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import ButtonAtom from '../Atom/ButtonAtom';
import AuthenticationHeader from '../Components/AuthenticationHeader';
import { color } from '../Style/Color';

interface IProps {
  navigation: any;
}

interface IState {}

class OnBoardingScreen extends PureComponent<IProps, IState> {
  navigate = (location: string) => {
    this.props.navigation.navigate(location);
  };

  render() {
    const appDetails = [
      'All your businesses in one place',
      'Manage all your produts',
      'Make your customers happy',
      'Increase your profit'
    ];

    return (
      <View style={styles.container}>
        <AuthenticationHeader smallHeader={false} />
        <ScrollView>
          <View style={styles.boardingScreenFeatureText}>
            {appDetails.map((details, i) => (
              <View style={styles.appFunctionWrapper} key={i}>
                <Icon name="check" style={styles.blueCheck} type="Feather" />
                <Text style={styles.appDetailsText}>{details}</Text>
              </View>
            ))}
          </View>

          <ButtonAtom
            btnText="TRY FOR FREE"
            btnStyle={styles.signupButton}
            funcValue={'Signup'}
            onPress={this.navigate}
          />
          <Text style={styles.haveAccount}>Or you have an account?</Text>

          <ButtonAtom
            btnText="LOGIN"
            transparent={true}
            funcValue={'Login'}
            onPress={this.navigate}
            btnStyle={styles.loginButton}
            textStyle={{ color: color.button, fontWeight: 'bold' }}
          />
        </ScrollView>
      </View>
    );
  }
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 0,
    paddingHorizontal: 0,
    marginBottom: '4%'
  },
  signupButton: {
    width: '80%',
    justifyContent: 'center',
    height: '13%',
    marginBottom: 16
  },
  haveAccount: {
    marginTop: '4%',
    textAlign: 'center',
    color: color.menu
  },
  appFunctionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  appDetailsText: {
    marginLeft: 20,
    color: color.black,
    fontSize: 14
  },
  blueCheck: {
    color: color.warning
  },
  boardingScreenFeatureText: {
    marginVertical: '7%',
    marginHorizontal: '10%'
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
});
