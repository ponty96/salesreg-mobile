import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import RedButton from "../src/Atom/RedButton";
import RedText from "../src/Atom/RedText";
import InputForText from "../src/Atom/InputForText";

class Form extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 40 }}>
        <InputForText
          placeholder="  Phone number"
          length={11}
          keyboardType="numeric"
        />

        <InputForText
          style={styles.input}
          placeholder="  Password"
          secureTextEntry={true}
        />

        <RedText text="Forgot password" />
        <RedButton text="Login" />
        <RedText text="I don't have an account" />
      </View>
    );
  }
}

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.redView}>
          <View><Text>{this.props.appName}</Text></View>
        </View>
        <View style={styles.greyView} />
        <View style={styles.signupForm}>
          <KeyboardAvoidingView style={styles.innerLayer} behaviour="position">
            <Form />
          </KeyboardAvoidingView>
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
    marginTop: 30,
    position: "absolute",
    top: 70,
    alignItems: "center",
    alignSelf: "center",
    //justifyContent: "center",
    minHeight: 350,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  input: {
    margin: 5,
    height: 50,
    width: "85%",
    fontSize: 18,
    borderColor: "#fff",
    backgroundColor: "white",
    padding: 5
  },
  firstInput: {
    marginTop: 20,
    margin: 5,
    height: 50,
    width: "85%",
    fontSize: 18,
    borderColor: "#fff",
    backgroundColor: "white",
    padding: 5,
    paddingTop: 20
  },
  innerLayer: {
    width: 320
  }
});
