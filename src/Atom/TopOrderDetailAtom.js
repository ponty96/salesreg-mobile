import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Left, Right, Thumbnail } from "native-base";

import styles from "../Style/exportStyles";

export default class TopOrderDetailAtom extends React.Component {
  render() {
    return (
      <View>
        <ListItem style={styles.stylesDetailWhiteList}>
          <Left>
            <Text style={styles.stylesDetailRedText}>ORDER ID</Text>
          </Left>
          <Right>
            <Text style={styles.stylesDetailRedText}>233232</Text>
          </Right>
        </ListItem>
        <ListItem style={styles.stylesDetailContent}>
          <Left style={styles.stylesDetailMoneyView}>
            <Text style={styles.stylesDetailGreyText}>Bought by</Text>
          </Left>
          <Right style={styles.stylesDetailPictureView}>
            <Thumbnail
              source={{
                uri:
                  "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
              }}
              style={styles.dp}
            />
            <Text style={styles.stylesDetailPictureText}>Chito</Text>
          </Right>
        </ListItem>
        <ListItem style={styles.stylesDetailWhiteList}>
          <Left>
            <Text style={styles.stylesDetailGreyText}>Status</Text>
          </Left>
          <Right>
            <Text style={styles.stylesDetailBlackText}>Pending</Text>
          </Right>
        </ListItem>
      </View>
    );
  }
}
