import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

import ModalDropdown from "react-native-modal-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RedButton from "../components/RedButton";
import RedText from "../components/RedText";
import NumberInput from "../components/NumberInput";
import AppName from "../components/AppName";

export default class SignupScreen extends React.Component {

  constructor(){
    super();
    this.state={
       isFocused: false 
    };

  }
  
  onFocusChange = () => {
   // this.setState(prevState => ({ isFocused: !prevState.isFocused}));
   this.setState({isFocused: true});
}


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.redView}>
          <AppName text="NAME OF APP HERE" />
        </View>
        <View style={styles.greyView} />
        <View style={(!this.state.isFocused) ? styles.signupForm : styles.goUpForm }>
        <View style={styles.innerLayer}>
          
        <TextInput
          style={styles.firstInput}
          underlineColorAndroid="#c0c0c0"
          placeholder="  Full name"
          placeholderTextColor="#c0c0c0"
          autoCapitalize="none"
        />
        <NumberInput placeholder="  Phone number" length={11} />

        <ModalDropdown
          defaultValue="Gender..."
          options={["Male", "Female"]}
          style={{
            marginLeft: 20,
            marginTop: 5,
            borderBottomWidth: 0.5,
            borderColor: "#c0c0c0",
            width: 120,
            paddingLeft: 10,
            paddingRight: 50,
            padding: 10
          }}
          textStyle={{ fontSize: 18, color: "#000" }}
          dropdownTextStyle={{
            fontSize: 18,
            color: "#000",
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 20,
            paddingBottom: 20
          }}
          dropdownTextHighlightStyle={{ color: "red" }}
        />
        
          <TextInput
            onFocus={this.onFocusChange}
            style={styles.pinPut}
            underlineColorAndroid="#c0c0c0"
            placeholder="  Password"
            placeholderTextColor="#c0c0c0"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TextInput
            onFocus={this.onFocusChange}
            style={styles.input}
            underlineColorAndroid="#c0c0c0"
            placeholder="  Reenter-password"
            placeholderTextColor="#c0c0c0"
            autoCapitalize="none"
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
  }
});
