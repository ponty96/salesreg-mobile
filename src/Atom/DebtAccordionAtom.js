import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListItem, Text, Thumbnail, Left, Body, Right } from "native-base";
import { ListView, View } from "react-native";
import styles from "./../Style/ProductAndCustomerList";
import { ScrollView } from "react-native-gesture-handler";

class InnerList extends Component {
  render() {
    const defaultImg = "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7";
    const avatar = this.props.items.images != "" ? this.props.items.images : defaultImg;
    return (
        <ListItem style={styles.rowD} onPress={this.props.onPress}>
            <Left style={styles.view1}>
                <Thumbnail source={{ uri: avatar }} style={styles.dpD} />
            </Left>
            <Body style={styles.view2}>
                <Text style={styles.rowText1}>{this.props.items.name}</Text>
            </Body>
            <Right style={styles.view3}>
                <Text style={styles.lilFontDA}>{this.props.items.quantity}</Text>
                <Text style={styles.rowText3DA}># {this.props.items.amount}.00</Text>
            </Right>
        </ListItem>
    );
  }
}

InnerList.propTypes = {
  items: PropTypes.object.isRequired,
};

const users = [
    {
      name: "Iman Powder",
      date: "20-03-2018",
      amount: "400",
      quantity: 1,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
    },
    {
      name: "Close up",
      date: "20-04-2018",
      amount: "150",
      quantity: 1,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
    },
    {
      name: "Honey Soap",
      date: "20-04-2018",
      amount: "3,000",
      quantity: 2,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
    },
    {
        name: "Tresee liquid bath",
        date: "20-05-2018",
        amount: "700",
        quantity: 1,
        images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0815e147451c6ccdead11da27189a22d"
    }
  ];
  
  export default class DebtAccordionAtom extends Component {
    constructor() {
      super();
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.state = {
        userDataSource: ds.cloneWithRows(users)
      };
    }
    
    onPress = () => {};
  
    renderRow(user) {
      return (
        <InnerList
          items={user}
        />
      );
    }
  
    render() {
      return (
        <View style={{flex: 1, width: "100%", backgroundColor: "#FFF"}}>
            <ScrollView>
                <ListView
                    dataSource={this.state.userDataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </ScrollView>
        </View>
      );
    }
  }

