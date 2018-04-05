import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

import ModalDropdown from "react-native-modal-dropdown";

import RedButton from "../src/Atom/RedButton";
import RedText from "../src/Atom/RedText";
import InputForText from "../src/Atom/InputForText";


export default class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
      useThis: true
    };
  }

  onFocusChange = () => {
    this.setState({ isFocused: true });
  };
  onFocusBack = () => {
    this.setState({ isFocused: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.redView}>
          <AppName text="NAME OF APP HERE" />
        </View>
        <View style={styles.greyView} />
        <View
          style={!this.state.isFocused ? styles.signupForm : styles.goUpForm}
        >
          <View style={styles.innerLayer}>
            <InputForText
              onFocus={this.onFocusBack}
              style={styles.firstInput}
              placeholder="  Full name"
              autoCapitalize="none"
            />
            <InputForText
              placeholder="  Phone number"
              length={11}
              keyboardType="numeric"
            />

            <ModalDropdown
              defaultValue="Gender..."
              options={["Male", "Female"]}
              style={styles.modalStyle}
              textStyle={styles.modalTextStyle}
              dropdownTextStyle={styles.modalDropdownTextStyle}
              dropdownTextHighlightStyle={{ color: "red" }}
            />

            <InputForText
              onFocus={this.onFocusChange}
              style={styles.pinPut}
              placeholder="  Password"
              secureTextEntry={true}
            />
            <InputForText
              onFocus={this.onFocusChange}
              style={styles.input}
              placeholder="  Reenter-password"
              secureTextEntry={true}
            />
            <RedButton text="Sign Up" />
            <RedText text="I have an account already" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  redView: {
    height: "40%",
    backgroundColor: "rgba(218,11,11,59)"
  },
  greyView: {
    height: "60%",
    flex: 1,
    backgroundColor: "#F0F0F0"
  },
  signupForm: {
    position: "absolute",
    top: 70,
    alignItems: "center",
    alignSelf: "center",
    minHeight: 500,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  goUpForm: {
    position: "absolute",
    top: 22,
    alignItems: "center",
    alignSelf: "center",
    minHeight: 500,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  input: {
    margin: 3,
    marginLeft: 15,
    height: 50,
    width: "85%",
    fontSize: 18,
    borderColor: "#fff",
    backgroundColor: "white",
    padding: 2
  },
  pinPut: {
    margin: 3,
    marginTop: 15,
    marginLeft: 15,
    height: 50,
    width: "85%",
    fontSize: 18,
    borderColor: "#fff",
    backgroundColor: "white",
    padding: 2
  },
  firstInput: {
    marginTop: 30,
    marginLeft: 15,
    margin: 3,
    height: 50,
    width: "85%",
    fontSize: 18,
    borderColor: "#fff",
    backgroundColor: "white",
    padding: 2,
    paddingTop: 5
  },
  innerLayer: {
    width: 320
  },
  modalStyle: {
    marginLeft: 20,
    marginTop: 5,
    borderBottomWidth: 0.5,
    borderColor: "#c0c0c0",
    width: 120,
    paddingLeft: 10,
    paddingRight: 50,
    padding: 10
  },
  modalTextStyle: {
    fontSize: 18,
    color: "#000"
  },
  modalDropdownTextStyle: {
    fontSize: 18,
    color: "#000",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 20
  }
});
