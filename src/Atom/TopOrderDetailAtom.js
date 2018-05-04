import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Left, Right, Thumbnail } from "native-base";

import { stylesDetail } from "../Style/exportStyles";

export default class TopOrderDetailAtom extends React.Component {
  render() {
    return (
      <View>
        <ListItem style={stylesDetail.whiteList}>
          <Left>
            <Text style={stylesDetail.redText}>ORDER ID</Text>
          </Left>
          <Right>
            <Text style={stylesDetail.redText}>233232</Text>
          </Right>
        </ListItem>
        <ListItem style={stylesDetail.content}>
          <Left style={stylesDetail.moneyView}>
            <Text style={stylesDetail.greyText}>Bought by</Text>
          </Left>
          <Right style={stylesDetail.pictureView}>
            <Thumbnail
              source={{
                uri:
                  "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
              }}
              style={styles.dp}
            />
            <Text style={stylesDetail.pictureText}>Chito</Text>
          </Right>
        </ListItem>
        <ListItem style={stylesDetail.whiteList}>
          <Left>
            <Text style={stylesDetail.greyText}>Status</Text>
          </Left>
          <Right>
            <Text style={stylesDetail.blackText}>Pending</Text>
          </Right>
        </ListItem>
      </View>
    );
  }
}
