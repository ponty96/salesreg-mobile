import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";
import { TabNavigator, TabBarBottom } from "react-navigation";
import { Icon } from 'native-base';

const users = [
    {
      name: "Ankara",
      customerName: "Salomy",
      number: 20,
      date: "19 March 2018",
      time: "02:00pm",
      amount: 9000,
      status: "paid",
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
    },
    {
      name: "Smart Perfume",
      customerName: "Mummy Ella",
      date: "19 March 2018",
      time: "11:57pm",
      amount: 3500,
      status: "paid",
      number: 4,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
    },
    {
      name: "Boos perfume",
      customerName: "Mr David",
      date: "19 March 2018",
      time: "10:00am",
      amount: 2500,
      status: "paid",
      number: 7,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
    },
    {
      name: "Flat heel sandals",
      customerName: "Klazbaba",
      date: "19 March 2018",
      time: "09:31am",
      amount: 5000,
      status: "paid",
      number: 3,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
    },
    {
      name: "Medicare liquid bath soap",
      customerName: "Mummy Ella",
      date: "20 March 2018",
      time: "08:46am",
      amount: 3000,
      status: "paid",
      number: 8,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
    },
    {
      name: "Joy soap",
      customerName: "Salomy",
      date: "19 March 2018",
      time: "08:46am",
      amount: 3000,
      status: "paid",
      number: 24,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
    },
    {
      name: "Closeup tooth paste",
      customerName: "Salomy",
      date: "19 March 2018",
      time: "08:46am",
      amount: 3000,
      status: "paid",
      number: 20,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/03c6d4d99c3d76575cc03c2a7f816280"
    },
    {
      name: "Iman Powder",
      customerName: "Emanbe",
      date: "20 March 2018",
      time: "11:25am",
      amount: 3000,
      status: "paid",
      number: 12,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
    },
    {
      name: "Fake Name",
      customerName: "Tracy Baddass",
      date: "20 March 2018",
      time: "10:37am",
      amount: 3000,
      status: "paid",
      number: 20,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0815e147451c6ccdead11da27189a22d"
    },
    {
      name: "Union",
      customerName: "Union PZA",
      date: "20 March 2018",
      time: "10:33am",
      amount: 3000,
      status: "paid",
      number: 32,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/03c6d4d99c3d76575cc03c2a7f816280"
    },
    {
      name: "Global B LTD",
      customerName: "Global International",
      date: "20 March 2018",
      time: "09:07am",
      amount: 3000,
      status: "paid",
      number: 1,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
    },
    {
      name: "Bright Towel",
      customerName: "Tracy",
      date: "20 March 2018",
      time: "08:46am",
      amount: 3000,
      status: "paid",
      number: 0.5,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0815e147451c6ccdead11da27189a22d"
    },
    {
      name: "John Bellion",
      customerName: "Okonkwo Chioma",
      date: "20 March 2018",
      time: "08:46am",
      amount: 3000,
      status: "paid",
      number: 3,
      images:
        "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
    }
  ];

  
  export default class ProductList extends Component {
    constructor() {
      super();
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.state = {
        userDataSource: ds.cloneWithRows(users)
      };
    }
  
    static navigationOptions = {
      tabBarIcon: ({tintColor})=>(
        <Icon name="md-briefcase" style={{color: tintColor}} />
      )
    } 
  
  
    onPress = () => {
      alert("Product View Unavailable");
    };
    addRow = () => {
      alert("Create New Product Unavailable");
    };
    renderRow(user) {
      return (
        <TouchableOpacity onPress={this.onPress}>
          <View style={styles.row}>
            <Image source={{ uri: user.images }} style={styles.dp} />
            <Text style={styles.rowText1}>{user.name}</Text>
            <Text style={styles.rowText3}> {user.number}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    render() {
      return (
        <View style={styles.container}>
          <ListView
            /*ref={ref => (this.scrollView = ref)}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({ animated: false });
            }}*/
            dataSource={this.state.userDataSource}
            renderRow={this.renderRow.bind(this)}
          />
          <View style={styles.part}>
            <TouchableOpacity style={styles.btn} onPress={this.addRow}>
              <Icon name="md-briefcase" style={{color: 'white'}} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#c0c0c0",
    },
    row: {
      flexDirection: "row",
      top: 0,
      padding: 10,
      height: 75,
      alignItems: "center",
      backgroundColor: "#fff",
      marginBottom: .5,
    },
    rowText1: {
      flex: 1,
      fontWeight: "bold",
      fontSize: 15,
      paddingLeft: 20,
      color: 'grey',
    },
    rowText2: {
      flex: 1
    },
    rowText3: {
      color: 'red',
      paddingRight: 18,
      fontSize: 18,
    },
    part: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    btn: {
      position: "absolute",
      width: 60,
      height: 60,
      backgroundColor: "rgba(218,11,11,59)",
      borderRadius: 50,
      bottom: 40,
      right: 15,
      alignItems: "center",
      justifyContent: "center"
    },
    plus: {
      color: "white",
      fontSize: 15,
      marginRight: 15,
      margin: 0,
    },
    image: {
      height: 20,
      width: 20,
      padding: 6
    },
    dp: {
      height: 55,
      width: 55,
      borderRadius: 55/2,
      margin: 8,
    },
    icons: {
      backgroundColor: "#fff",
      height: 25,
      width: 25
    }
  });
