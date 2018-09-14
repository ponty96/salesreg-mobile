import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ButtonAtom from '../Atom/ButtonAtom'
import OnboardingContainer from '../Container/OnboardingContainer'

interface IProps {
  navigation: any
}

class OnBoardingScreen extends PureComponent<IProps> {
  render() {
    const { navigate } = this.props.navigation
    return (
      <OnboardingContainer>
        <View style={styles.container}>
          <ButtonAtom
            btnText="Get Started"
            onPress={() => navigate('Signup')}
            type="primary"
          />
          <Text style={styles.haveAccount}>Already have an account?</Text>

          <ButtonAtom
            btnText="LOGIN"
            transparent={true}
            onPress={() => navigate('Login')}
            type="secondary"
            hideIcon={true}
          />
        </View>
      </OnboardingContainer>
    )
  }
}

export default OnBoardingScreen

const styles = StyleSheet.create({
  haveAccount: {
    marginTop: 32,
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24
  }
})
