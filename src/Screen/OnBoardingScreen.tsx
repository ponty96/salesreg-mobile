import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import ButtonAtom from '../Atom/ButtonAtom'
import AuthenticationHeader from '../Components/AuthenticationHeader'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

class OnBoardingScreen extends PureComponent<IProps> {
  navigate = (location: string) => {
    this.props.navigation.navigate(location)
  }

  render() {
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
                    { fontFamily: 'SourceSansPro' }
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
            funcValue={'Signup'}
            onPress={this.navigate}
          />
          <Text style={[styles.haveAccount, { fontFamily: 'SourceSansPro' }]}>
            Or you have an account?
          </Text>

          <ButtonAtom
            btnText="LOGIN"
            transparent={true}
            funcValue={'Login'}
            onPress={this.navigate}
            btnStyle={styles.loginButton}
            textStyle={styles.loginText}
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
    marginBottom: 10
  },
  signupButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50,
    marginTop: 32,
    marginHorizontal: 32
  },
  haveAccount: {
    marginTop: 16,
    textAlign: 'center',
    color: color.menu
  },
  appDetailsText: {
    marginLeft: 16,
    alignSelf: 'center'
  },
  check: {
    color: color.warning
  },
  appFunctionWrapper: {
    flexDirection: 'row',
    marginVertical: 5
  },
  boardingScreenFeatureText: {
    marginVertical: 32,
    marginHorizontal: 32
  },
  container: {
    flex: 1
  },
  loginText: {
    color: color.button
  }
})
