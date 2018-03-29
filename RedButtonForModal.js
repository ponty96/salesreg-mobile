import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import NumberInput from "./NumberInput";

export default class RedButtonForModal extends React.Component {
  state = {
    isModalVisible: false
  };

  //loginNow = () => this.props.navigation.goBack(null);

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this._toggleModal}
        >
          <Text style={styles.submitButtonText}>{this.props.wakeModal}</Text>
        </TouchableOpacity>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalContent}>
            <View
              style={{
                backgroundColor: "lightgray",
                flex: 1,
                width: "92%",
                height: 30,
                flexDirection: "row"
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold" }}>{this.props.heading}</Text>
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Image
                  style={{ height: 50, width: 50, alignSelf: "flex-end" }}
                  source={require("../images/close1.png")}
                />
              </View>
            </View>
            <NumberInput placeholder=" Enter Amount" />
              
            <TouchableOpacity
              style={{ backgroundColor: "darkred", margin: 20, alignSelf: "flex-end", borderRadius: 4 }}
              onPress={this._toggleModal}
            >
              <Text
                style={{
                  color: "#fff",
                  paddingLeft: 60,
                  paddingRight: 60,
                  padding: 15,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {this.props.sleepModal}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "white"
  },
  submitButton: {
    marginTop: 200,
    backgroundColor: "darkred",
    justifyContent: "center",
    padding: 10,
    margin: 15,
    height: 60,
    width: 180,
    borderRadius: 4
  },
  submitButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
