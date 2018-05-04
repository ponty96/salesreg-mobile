import React from 'react';
import { View, Text } from "react-native";
import { Thumbnail, ListItem, Left, Right } from "native-base";

import { aboveAccordionStyles } from './../Style/exportStyles';

export default class ProductDetailAtom extends React.Component {
  render() {
    return (
        <View>
            <View style={aboveAccordionStyles.containerP}>
                <View style={aboveAccordionStyles.pictureViewP}>
                    <Thumbnail source={{ uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7" }} style={aboveAccordionStyles.dpP} />
                    <Text style={aboveAccordionStyles.pictureText}>No.5 Chanel</Text>
                </View>
                <View style={aboveAccordionStyles.moneyView}>
                    <View>
                        <Text style={aboveAccordionStyles.greyFont}>Stock quantity(in units)</Text>
                        <Text style={aboveAccordionStyles.boldFont}>23</Text>
                    </View>
                    <View>
                        <Text style={aboveAccordionStyles.greyFont}>Stock quantity(in packs)</Text>
                        <Text style={aboveAccordionStyles.boldFont}>0.76</Text>
                    </View>
                </View>
            </View>
            <View>
                <ListItem style={aboveAccordionStyles.whiteList}>
                    <Left><Text style={aboveAccordionStyles.blackTextL}>Pack quantity</Text></Left>
                    <Right><Text style={aboveAccordionStyles.blackTextR}>30</Text></Right>
                </ListItem>
                <ListItem style={aboveAccordionStyles.whiteList}>
                    <Left><Text style={aboveAccordionStyles.blackTextL}>Cost price per pack</Text></Left>
                    <Right><Text style={aboveAccordionStyles.blackTextR}>#34,000.00</Text></Right>
                </ListItem>
                <ListItem style={aboveAccordionStyles.whiteList}>
                    <Left><Text style={aboveAccordionStyles.blackTextL}>Unit cost price</Text></Left>
                    <Right><Text style={aboveAccordionStyles.blackTextR}>#1,133.00</Text></Right>
                </ListItem>
                <ListItem style={aboveAccordionStyles.whiteList}> 
                    <Left><Text style={aboveAccordionStyles.blackTextL}>Seling price</Text></Left>
                    <Right><Text style={aboveAccordionStyles.redTextR}>#2,100.00</Text></Right>
                </ListItem>
                <ListItem style={aboveAccordionStyles.whiteList}>
                    <Left><Text style={aboveAccordionStyles.blackTextL}>Minimum stock quantity</Text></Left>
                    <Right><Text style={aboveAccordionStyles.blackTextR}>5</Text></Right>
                </ListItem>
            </View>
        </View>
    );
  }
}