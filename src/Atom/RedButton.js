import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class RedButton extends React.Component {
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

const styles = StyleSheet.create({
  redButton: {
    width: 180,
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
  }
});
