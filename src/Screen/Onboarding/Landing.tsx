import React, { PureComponent } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import ButtonAtom from "../../Atom/Form/ButtonAtom";
import { color } from "../../Style/Color";
// import OnboardingContainer from '../../Container/OnboardingContainer'

interface IProps {
  navigation: any;
}

interface IState {
  screen: {
    id: number;
    message: {
      title: string;
      body: string;
    };
  };
}

class LandingScreen extends PureComponent<IProps, IState> {
  LANDING_SCREEN_IMAGES = [
    require("../../../assets-v1/images/onboardingScreen/ecommerce.png"),
    require("../../../assets-v1/images/onboardingScreen/delivery.png"),
    require("../../../assets-v1/images/onboardingScreen/restock.png")
  ];
  viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  state = {
    screen: {
      id: 0,
      message: {
        title: "You now have your own \nE-commerce website",
        body:
          "Let customers view your products, make \npurchase and pay easily from anywhere"
      }
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    // const {screen} = this.state

    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={this.LANDING_SCREEN_IMAGES}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={{
                marginBottom: 8,
                height: null,
                flex: 1,
                borderRadius: 8
              }}
            />
          )}
          keyExtractor={index => String(index)}
          //   onViewableItemsChanged={info => alert(JSON.stringify(info))}
          viewabilityConfig={this.viewabilityConfig}
          //   style={{ borderWidth: 1, borderColor: "white" }}
        />

        <Text style={[styles.haveAccount, styles.messageTitle]}>
          {this.state.screen.message.title}
        </Text>
        <Text style={[styles.haveAccount, styles.messageBody]}>
          {this.state.screen.message.body}
        </Text>

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
    backgroundColor: color.button,
    paddingTop: 8
  },
  messageTitle: {
    fontSize: 18,
    marginBottom: 8
  },
  messageBody: {
    marginTop: 0,
    marginBottom: 36
  }
});
