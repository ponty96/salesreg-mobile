import React, { Component } from "react";
import { Text, View, ListView, FlatList, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

import orderListStyles from './../Style/exportStyle';
import DateOrderAtom from "../Atom/DateOrderAtom";
import TotalOrderAtom from "../Atom/TotalOrderAtom";
import OrderListAtom from "../Atom/OrderListAtom";

export default class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          date: "19 March 2018",
          key: 1,
          header: "start",
          name: "Ankara",
          customerName: "Salomy",
          time: "02:00pm",
          amount: 0,
          status: "paid",
          number: 20,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
        },
        {
          date: "19 March 2018",
          key: 2,
          header: "middle",
          name: "Ankara",
          customerName: "Salomy",
          number: 20,
          time: "02:00pm",
          amount: 9000,
          status: "paid",
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
        },
        {
          date: "19 March 2018",
          key: 3,
          header: "middle",
          name: "Smart Perfume",
          customerName: "Mummy Ella",
          time: "11:57pm",
          amount: 3500,
          status: "paid",
          number: 4,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
        },
        {
          date: "19 March 2018",
          key: 4,
          header: "middle",
          name: "Boos perfume",
          customerName: "Mr David",
          time: "10:00am",
          amount: 2500,
          status: "paid",
          number: 7,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e"
        },
        {
          date: "19 March 2018",
          key: 5,
          header: "middle",
          name: "Flat heel sandals",
          customerName: "Klazbaba",
          time: "09:31am",
          amount: 5000,
          status: "paid",
          number: 3,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
        },
        {
          date: "19 March 2018",
          key: 6,
          header: "middle",
          name: "Medicare liquid bath soap",
          customerName: "Mummy Ella",
          time: "08:46am",
          amount: 3000,
          status: "paid",
          number: 8,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
        },
        {
          date: "19 March 2018",
          key: 7,
          header: "middle",
          name: "Joy soap",
          customerName: "Salomy",
          time: "08:46am",
          amount: 3000,
          status: "paid",
          number: 24,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
        },
        {
          date: "19 March 2018",
          key: 8,
          header: "middle",
          name: "Closeup tooth paste",
          customerName: "Salomy",
          time: "08:46am",
          amount: "3000",
          status: "paid",
          number: 20,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/03c6d4d99c3d76575cc03c2a7f816280"
        },
        {
          date: "19 March 2018",
          key: 9,
          header: "end",
          name: "Ankara",
          customerName: "Salomy",
          time: "02:00pm",
          amount: "20,000",
          status: "paid",
          number: 20,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/03c6d4d99c3d76575cc03c2a7f816280"
        },
        {
          date: "20 March 2018",
          key: 10,
          header: "start",
          name: "Ankara",
          customerName: "Salomy",
          time: "02:00pm",
          amount: 0,
          status: "paid",
          number: 20,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/03c6d4d99c3d76575cc03c2a7f816280"
        },
        {
          date: "20 March 2018",
          key: 11,
          header: "middle",
          name: "Iman Powder",
          customerName: "Emanbe",
          time: "11:25am",
          amount: 3000,
          status: "paid",
          number: 12,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
        },
        {
          date: "20 March 2018",
          key: 12,
          header: "middle",
          name: "Fake Name",
          customerName: "Tracy Baddass",
          time: "10:37am",
          amount: 3000,
          status: "paid",
          number: 20,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0815e147451c6ccdead11da27189a22d"
        },
        {
          date: "20 March 2018",
          key: 13,
          header: "middle",
          name: "Union",
          customerName: "Union PZA",
          time: "10:33am",
          amount: 3000,
          status: "paid",
          number: 32,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/03c6d4d99c3d76575cc03c2a7f816280"
        },
        {
          date: "20 March 2018",
          key: 14,
          header: "middle",
          name: "Global B LTD",
          customerName: "Global International",
          time: "09:07am",
          amount: 3000,
          status: "paid",
          number: 1,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
        },
        {
          date: "20 March 2018",
          key: 15,
          header: "middle",
          name: "Bright Towel",
          customerName: "Tracy",
          time: "08:46am",
          amount: 3000,
          status: "paid",
          number: 0.5,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0815e147451c6ccdead11da27189a22d"
        },
        {
          date: "20 March 2018",
          key: 16,
          header: "middle",
          name: "Bright Towel",
          customerName: "Tracy",
          time: "08:46am",
          amount: 3000,
          status: "paid",
          number: 0.5,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0815e147451c6ccdead11da27189a22d"
        },
        {
          date: "20 March 2018",
          key: 17,
          header: "middle",
          name: "Bright Towel",
          customerName: "Tracy",
          time: "08:46am",
          amount: 3000,
          status: "paid",
          number: 0.5,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0815e147451c6ccdead11da27189a22d"
        },
        {
          date: "20 March 2018",
          key: 18,
          header: "middle",
          name: "John Bellion",
          customerName: "Okonkwo Chioma",
          time: "08:46am",
          amount: "2000",
          status: "paid",
          number: 3,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
        },
        {
          date: "20 March 2018",
          key: 19,
          header: "end",
          name: "John Bellion",
          customerName: "Okonkwo Chioma",
          time: "08:46am",
          amount: "17,000",
          status: "paid",
          number: 3,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
        },
        {
          date: "21 March 2018",
          key: 20,
          header: "start",
          name: "John Bellion",
          customerName: "Okonkwo Chioma",
          time: "08:46am",
          amount: "0",
          status: "paid",
          number: 3,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
        },
        {
          date: "21 March 2018",
          key: 21,
          header: "end",
          name: "John Bellion",
          customerName: "Okonkwo Chioma",
          time: "08:46am",
          amount: "0",
          status: "paid",
          number: 3,
          images:
            "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/ee06c63d01543a44631c3421df6ee5fa"
        }
      ],
      stickyHeaderIndices: []
    };
  }

  componentDidMount() {
    var arr = [];
    this.state.data.map(obj => {
      if (obj.header == "start") {
        arr.push(this.state.data.indexOf(obj));
      }
    });
    arr.push(0);
    this.setState({
      stickyHeaderIndices: arr
    });
  }

  renderItem = ({item}) => {
    if (item.header == "start") {
      return <DateOrderAtom date={item.date} />;
    } else if (item.header == "middle") {
      return (
        <OrderListAtom
          onPress={this.onPress}
          items={item}
        />
      );
    } else if (item.header == "end") {
      return <TotalOrderAtom totalAmount={item.amount} />;
    }
  };

  render() {
    return (
      <View style={orderListStyles.container}>
        <FlatList
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: false });
          }}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.key}
          stickyHeaderIndices={this.state.stickyHeaderIndices}
        />
      </View>
    );
  }
}