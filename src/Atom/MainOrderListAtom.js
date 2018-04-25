import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, ListItem, Left, Right, Text } from 'native-base';
import PropTypes from "prop-types";
import PopoverAtom from './PopoverAtom';

class MainOrderListAtom extends React.Component {
    static defaultProps = {
        orderId: 123456,
        time: "09:00am",
        customerName: "Customer Name Here",
        amount: 0
    }
    render() {
      return (
          <ListItem style={{ flex: 1, height: 75, width: "103%", alignSelf: "center", marginRight: 10, backgroundColor: "#fff", paddingVertical: 8 }}>
              <Left style={{flex: 0, flexDirection: "column", width: "40%", alignItems: "flex-start", justifyContent: "flex-start", marginLeft: 0, paddingLeft: 0}}>
                  <View style={{marginLeft: 16}}>
                  <Text style={{textAlign: "left", fontFamily: "Roboto_medium", paddingBottom: 10, paddingLeft: 5, marginLeft: 0, fontWeight: "400"}}>{this.props.orderId}{'   '}<Text style={{fontSize: 13, color: "#000", fontWeight: "400"}}>{this.props.time}</Text></Text>
                  </View>
                  <View style={{marginLeft: 16}}>
                  <Text style={{textAlign: "left", fontFamily: "Roboto_medium", paddingTop: 10, paddingLeft: 5, marginLeft:0, fontSize: 13, color: "#c0c0c0"}}>{this.props.customerName}</Text>
                  </View>
              </Left>
              <Right style={{flex: 0, flexDirection: "column", marginRight: 16, marginLeft: "20%", width: "35%"}}>
                  <Text style={{fontWeight: "500", fontSize: 13, paddingTop: 5}}>{this.props.amount}</Text>
                  <PopoverAtom position={this.props.position} tag={this.props.tag} check={this.props.check}/>
              </Right>
          </ListItem>
      );
    }
  }


  MainOrderListAtom.propTypes = {
    orderId: PropTypes.number,
    time: PropTypes.string,
    customerName: PropTypes.string,
    amount: PropTypes.number
  };  

export default MainOrderListAtom;