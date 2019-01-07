import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageSourcePropType
} from "react-native";

import ButtonAtom from "../../Atom/Form/ButtonAtom";
import { color } from "../../Style/Color";

interface IProps {
  navigation: any;
}

interface IState {
  messageTitle: string;
  messageBody: string;
  isFirstImage?: boolean;
  isSecondImage?: boolean;
  isThirdImage?: boolean;
}

class LandingScreen extends PureComponent<IProps, IState> {
  LANDING_SCREEN_IMAGES: ImageSourcePropType[] = [
    require("../../../assets-v1/images/onboardingScreen/ecommerce.png"),
    require("../../../assets-v1/images/onboardingScreen/delivery.png"),
    require("../../../assets-v1/images/onboardingScreen/restock.png")
  ];
  viewabilityConfig: object = { viewAreaCoveragePercentThreshold: 50 };

  imageDidChange = (info: any): void => {
    const screenMessage: any = this.getScreenMessage(
      info.viewableItems[0].index
    );
    this.setState({
      messageTitle: screenMessage.title,
      messageBody: screenMessage.body,
      isFirstImage: screenMessage.isFirstImage,
      isSecondImage: screenMessage.isSecondImage,
      isThirdImage: screenMessage.isThirdImage
    });
  };

  getScreenMessage = (screenIndex: number): object => {
    let message = {};

    switch (screenIndex) {
      case 0:
        message = {
          title: "You now have your own \nE-commerce website",
          body:
            "Let customers view your products, make \npurchase and pay easily from anywhere",
          isFirstImage: true
        };
        break;

      case 1:
        message = {
          title: "Package delivery \nto your customers",
          body:
            "Get items picked up and delivered to your \ncustomers, and get paid on delivery",
          isSecondImage: true
        };
        break;

      case 2:
        message = {
          title: "Let customers always find \nwhat they need",
          body:
            "Keep your stocks up to date. Get restock \nreminders before they run out on you",
          isThirdImage: true
        };
    }
    return message;
  };

  state: IState = {
    messageTitle: "",
    messageBody: "",
    isFirstImage: false,
    isSecondImage: false,
    isThirdImage: false
  };

  render() {
    const { navigate } = this.props.navigation;
    const { messageTitle, messageBody } = this.state;

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
              resizeMode="cover"
              style={{ height: undefined }}
            />
          )}
          keyExtractor={index => String(index)}
          onViewableItemsChanged={this.imageDidChange}
          viewabilityConfig={this.viewabilityConfig}
        />

        <View style={styles.indicatorsWrapper}>
          <View
            style={[
              styles.indicator,
              this.state.isFirstImage && styles.activeIndicator
            ]}
          />
          <View
            style={[
              styles.indicator,
              this.state.isSecondImage && styles.activeIndicator
            ]}
          />
          <View
            style={[
              styles.indicator,
              this.state.isThirdImage && styles.activeIndicator
            ]}
          />
        </View>
        <Text style={[styles.haveAccount, styles.messageTitle]}>
          {messageTitle}
        </Text>
        <Text style={[styles.haveAccount, styles.messageBody]}>
          {messageBody}
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
    marginBottom: 8,
    marginTop: 16
  },
  messageBody: {
    marginTop: 0,
    marginBottom: 36
  },
  indicator: {
    height: 8,
    width: 16,
    borderColor: color.active,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 8
  },
  indicatorsWrapper: {
    flexDirection: "row",
    marginTop: 16
  },
  activeIndicator: {
    backgroundColor: color.secondary,
    borderColor: "transparent"
  }
});
