import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Thumbnail } from "native-base";

export default class AboveAccordionAtom extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.pictureView}>
                <Thumbnail source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7" }} style={styles.dp} />
                <Text style={styles.pictureText}>{this.props.name}</Text>
            </View>
            <View style={styles.moneyView}>
                <Text style={styles.redNumber}># {this.props.totalAmount}.00</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      flex: 0,
      borderTopWidth: 0.5,
      borderTopColor: "#f0f0f0"
  },
  pictureView: {
    flexDirection: "column",
    width: '50%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  pictureText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: "400",
    color: "grey",
  },
  redNumber: {
    color: 'rgba(218,11,11,59)',
    fontSize: 25,
    fontWeight: 'bold',
  },
  moneyView: {
    width: '50%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  dp: {
      height: 90,
      width: 90,
  }
});
