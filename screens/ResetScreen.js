import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import RedButton from "../components/RedButton";
import RedText from "../components/RedText";
import NumberInput from "../components/NumberInput";

class Form extends React.Component {

    constructor(){  
        super();   
        this.state={  
          ButtonStateHolder : true,     
        }
      }

  handleButton = (text) => {
    if (text.length > 5) {
      this.setState({
        ButtonStateHolder: false
      });
    } else {
        this.setState({
            ButtonStateHolder: true
        }); 
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.instruct}>
          A six digit reset code will be sent to xxxxxxxx678
          . Enter the code to reset your password.
        </Text>

        <NumberInput placeholder="  Enter reset code" length={6} onChangeText= {this.handleButton.bind(this)}/>

        <RedText text="Send another code" />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity style={[styles.redButton , { backgroundColor: this.state.ButtonStateHolder ? '#c0c0c0' : 'rgba(218,11,11,59)' }]} disabled={this.state.ButtonStateHolder}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        </View>
        <RedText text="I don't have an account" />
      </View>
    );
  }
}

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.redView} />
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
    width: 500,
    backgroundColor: "rgba(218,11,11,59)"
  },
  greyView: {
    height: "60%",
    flex: 1,
    backgroundColor: "#F0F0F0"
  },
  signupForm: {
    marginTop: 120,
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 500,
    width: 435,
    backgroundColor: "#fff",
    zIndex: 1
  },
  input: {
    margin: 8,
    height: 50,
    width: "100%",
    fontSize: 18,
    borderColor: "#fff",
    backgroundColor: "white",
    padding: 5
  },
  innerLayer: {
    width: 400
  },
  instruct: {
    fontSize: 17,
    margin: 10
  },
  redButton: {
    width: 180,
    marginTop: 25,
    marginBottom: 25,
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
