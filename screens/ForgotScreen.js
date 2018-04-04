import React from 'react';
import { StyleSheet, Text, View ,TextInput } from 'react-native';

import RedText from "../src/Atom/RedText";
import InputForText from "../src/Atom/InputForText";

class RedButton extends React.Component {
  constructor(){  
      super();   
      this.state={  
        ButtonStateHolder : false,   
      }
    }

  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={[styles.redButton , { backgroundColor: this.state.ButtonStateHolder ? '#c0c0c0' : 'rgba(218,11,11,59)' }]} disabled={this.state.ButtonStateHolder}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Form extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.instruct}>
          To recover password, please input your number below...
        </Text>
        <InputForText placeholder="  Phone number" length={11} keyboardType="numeric"/>
        <RedButton text="Reset Password" />
        <RedText text="I remember my password now" />
      </View>
    );
  }
}

export default class ForgotScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.redView}>
        <View><Text>{this.props.appName}</Text></View>
        </View>
        <View style={styles.greyView} />
        <View style={styles.signupForm}>
          <View style={styles.innerLayer}>
            <Form />
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
    minHeight: 420,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  input: {
    margin: 5,
    marginLeft: 15,
    height: 50,
    width: "85%",
    fontSize: 18,
    borderColor: "#fff",
    backgroundColor: "white",
    padding: 5
  },
  innerLayer: {
    width: 320,
    marginTop: 70
  },
  instruct: {
    fontSize: 17,
    margin: 10
  },  
  redButton: {
    width: 220,
    marginTop: 10,
    marginBottom: 8,
    borderRadius: 3
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    padding: 16,
    paddingRight: 38,
    paddingLeft: 38,
    fontWeight: "bold"
  },
});
