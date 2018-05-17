import React from "react";
import { View, Text } from "react-native";
import { Thumbnail, ListItem, Left, Right } from "native-base";

import styles from "../Style/exportStyles";

export default class ProductDetailAtom extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.aboveAccordionContainerP}>
          <View style={styles.aboveAccordionPictureViewP}>
            <Thumbnail
              source={{
                uri:
                  "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
              }}
              style={styles.aboveAccordionStyles.dpP}
            />
            <Text style={styles.aboveAccordionPictureText}>No.5 Chanel</Text>
          </View>
          <View style={styles.aboveAccordionMoneyView}>
            <View>
              <Text style={styles.aboveAccordionGreyFont}>
                Stock quantity(in units)
              </Text>
              <Text style={styles.aboveAccordionBoldFont}>23</Text>
            </View>
            <View>
              <Text style={styles.aboveAccordionGreyFont}>
                Stock quantity(in packs)
              </Text>
              <Text style={styles.aboveAccordionBoldFont}>0.76</Text>
            </View>
          </View>
        </View>
        <View>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>Pack quantity</Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>30</Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>
                Cost price per pack
              </Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>#34,000.00</Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>
                Unit cost price
              </Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>#1,133.00</Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>Seling price</Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionRedTextR}>#2,100.00</Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>
                Minimum stock quantity
              </Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>5</Text>
            </Right>
          </ListItem>
        </View>
      </View>
    );
  }
}
