import { Icon } from 'native-base'
import React, { PureComponent } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import ButtonAtom from '../Atom/ButtonAtom'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

class OnBoardingScreen extends PureComponent<IProps> {
  public navigate = (location: string) => {
    this.props.navigation.navigate(location)
  }

  public render() {
    const APP_DETAILS = [
      'Manage all your produts',
      'Process all your orders',
      'Track all payments & outstandings',
      'Manage all your business contacts'
    ]

    return (
      <View style={styles.container}>
        <AuthenticationHeader smallHeader={false} />
        <ScrollView style={styles.bodyContainer}>
          <View style={styles.boardingScreenFeatureText}>
            {APP_DETAILS.map((details, i) => (
              <View style={styles.appFunctionWrapper} key={i}>
                <Icon name="check" style={styles.check} type="Feather" />
                <Text
                  style={[
                    styles.appDetailsText,
                    { fontFamily: 'SourceSansPro_Semibold' }
                  ]}
                >
                  {details}
                </Text>
              </View>
            ))}
          </View>

          <ButtonAtom
            btnText="TRY FOR FREE"
            btnStyle={styles.signupButton}
            // tslint:disable-next-line:jsx-no-lambda
            onPress={() => this.navigate('Signup')}
            textStyle={styles.freeTrialText}
          />
          <Text style={[styles.haveAccount, { fontFamily: 'SourceSansPro' }]}>
            Or you have an account?
          </Text>

          <ButtonAtom
            btnText="LOGIN"
            transparent={true}
            // tslint:disable-next-line:jsx-no-lambda
            onPress={() => this.navigate('Login')}
            btnStyle={styles.loginButton}
            textStyle={[
              styles.loginText,
              { fontFamily: 'SourceSansPro_Semibold' }
            ]}
          />
        </ScrollView>
      </View>
    )
  }
}

export default OnBoardingScreen

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: color.secondary
  },
  loginButton: {
    marginTop: 0,
    paddingHorizontal: 0,
    marginBottom: 16
  },
  signupButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50,
    marginTop: 32,
    marginHorizontal: 32
  },
  haveAccount: {
    marginTop: 32,
    textAlign: 'center',
    color: color.principal,
    fontSize: 14
  },
  appDetailsText: {
    marginLeft: 16,
    alignSelf: 'center',
    fontSize: 14,
    color: color.black
  },
  check: {
    color: color.warning
  },
  appFunctionWrapper: {
    flexDirection: 'row',
    marginVertical: 5
  },
  boardingScreenFeatureText: {
    marginTop: 48,
    marginBottom: 32,
    marginHorizontal: 32
  },
  container: {
    flex: 1
  },
  loginText: {
    color: color.button,
    fontSize: 16
  },
  freeTrialText: {
    fontSize: 16
  }
})
