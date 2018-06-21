import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Font, AppLoading } from 'expo'
import { Root, Icon } from 'native-base'

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
  state = {
    loading: true
  }
  async componentDidMount() {
    await Font.loadAsync({
      SourceSansPro: require('../../Fonts/SourceSansPro-Regular.ttf'),
      SourceSansPro_Semibold: require('../../Fonts/SourceSansPro-Semibold.ttf'),
      SourceSansPro_Bold: require('../../Fonts/SourceSansPro-Bold.ttf')
    })
    this.setState({ loading: false })
  }

  render() {
    const appDetails = [
      'Manage all your produts',
      'Process all your orders',
      'Track all payments & outstandings',
      'Manage all your business contacts'
    ]
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }

    return (
      <View style={styles.container}>
        <AuthenticationHeader smallHeader={false} />
        <ScrollView>
          <View style={styles.boardingScreenFeatureText}>
            {appDetails.map((details, i) => (
              <View style={styles.appFunctionWrapper} key={i}>
                <Icon name="check" style={styles.blueCheck} type="Feather" />
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
  loginButton: {
    marginTop: 0,
    paddingHorizontal: 0,
    marginBottom: '4%'
  },
  signupButton: {
    width: '80%',
    justifyContent: 'center',
    height: '11%',
    marginTop: '4%'
  },
  haveAccount: {
    marginTop: '4%',
    textAlign: 'center',
    color: color.menu
  },
  appDetailsText: {
    marginLeft: '4%',
    fontSize: 14,
    alignSelf: 'flex-end'
  },
  blueCheck: {
    color: color.warning
  },
  appFunctionWrapper: {
    flexDirection: 'row',
    marginVertical: '1%'
  },
  boardingScreenFeatureText: {
    marginVertical: '10%',
    marginHorizontal: '10%'
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  loginText: { color: color.button }
})
