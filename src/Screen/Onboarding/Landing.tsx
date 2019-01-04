import React, { PureComponent } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import ButtonAtom from "../../Atom/Form/ButtonAtom";
import { color } from "../../Style/Color";
// import OnboardingContainer from '../../Container/OnboardingContainer'

interface IProps {
  navigation: any;
}

class LandingScreen extends PureComponent<IProps> {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd = {() => alert('Sure')}
        >
          <Image
            source={require("../../../assets-v1/images/onboardingScreen/ecommerce.png")}
          />
          <Image
            source={require("../../../assets-v1/images/onboardingScreen/delivery.png")}
          />
          <Image
            source={require("../../../assets-v1/images/onboardingScreen/restock.png")}
          />
        </ScrollView>
        <ButtonAtom
          btnText="Get Started"
          onPress={() => navigate("Signup")}
          type="primary"
        />
        <Text style={styles.haveAccount}>Already have an account?</Text>

        <ButtonAtom
          btnText="LOGIN"
          transparent={true}
          onPress={() => navigate("Login")}
          type="secondary"
          hideIcon={true}
        />
      </View>
    );
  }
}

export default LandingScreen;

const styles = StyleSheet.create({
  haveAccount: {
    marginTop: 32,
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontFamily: "AvenirNext-DemiBold"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 24,
    backgroundColor: color.button
  }
});
