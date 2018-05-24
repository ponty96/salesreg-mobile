import React, { PureComponent } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Icon } from 'native-base'

import ButtonAtom from '../Atom/ButtonAtom'
import styles from '../Style/Auth'
import styles1 from '../Style/exportStyles'
import AuthenticationHeader from '../Components/AuthenticationHeader'

interface IProps {
  navigation: any
}

interface IState {}

class OnBoardingScreen extends PureComponent<IProps, IState> {
  navigate = (location: string) => {
    this.props.navigation.navigate(location)
  }

  render() {
    const appDetails = [
      'All your businesses in one place',
      'Manage all your produts',
      'Make your customers happy',
      'Reduce debts',
      'Increase your profit'
    ]

    return (
      <View style={styles.container}>
        <AuthenticationHeader smallHeader={false} />
          <ScrollView>
            <View style={styles.boardingScreenFeatureText}>
              {appDetails.map((details, i) => (
                <View style={styles.appFunctionWrapper} key={i}>
                  <Icon name="check" style={styles.blueCheck} type="Entypo" />
                  <Text style={styles.appDetailsText}>{details}</Text>
                </View>
              ))}
            </View>

            <ButtonAtom
              btnText="TRY FOR FREE"
              textStyle={styles1.redButtonText}
              btnStyle={styles1.signupButton}
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
            />
          </ScrollView>
        </View>
    )
  }
}

export default OnBoardingScreen
