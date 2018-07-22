import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Thumbnail, ListItem, Left, Right } from 'native-base';
import { color } from '../Style/Color';

interface IProps {
  product?: string;
  currentStockQuantity?: any;
  packs?: any;
  unitCostPrice?: any;
  sellingPrice?: any;
  minStockQuantity?: any;
}

export default class ProductDetailAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View>
        <View style={styles.aboveAccordionContainerP}>
          <View style={styles.aboveAccordionPictureViewP}>
            <Thumbnail
              source={{
                uri:
                  'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
              }}
              style={styles.aboveAccordiondpP}
            />
            <Text style={styles.aboveAccordionPictureText}>
              {this.props.product}
            </Text>
          </View>
          <View style={styles.aboveAccordionMoneyView}>
            <View style={styles.viewMarginRight}>
              <Text style={styles.aboveAccordionGreyFont}>
                Stock quantity(in currentStockQuantity)
              </Text>
              <Text style={styles.aboveAccordionBoldFont}>
                {this.props.currentStockQuantity}
              </Text>
            </View>
            <View style={styles.viewMarginRight}>
              <Text style={styles.aboveAccordionGreyFont}>
                Total Units Sold
              </Text>
              <Text style={styles.aboveAccordionBoldFont}>
                {this.props.packs}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>
                Unit cost price
              </Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>
                &#8358; {this.props.unitCostPrice}
              </Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>Selling Price</Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionGreenTextR}>
                &#8358; {this.props.sellingPrice}
              </Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>
                Minimum stock quantity
              </Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>
                {this.props.minStockQuantity}
              </Text>
            </Right>
          </ListItem>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aboveAccordionContainerP: {
    flexDirection: 'row',
    flex: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: '#f0f0f0',
    borderBottomColor: '#c0c0c0'
  },
  aboveAccordionPictureViewP: {
    flexDirection: 'column',
    width: '50%',
    height: 170,
    alignItems: 'flex-start',
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  aboveAccordiondpP: {
    height: 60,
    width: 60
  },
  aboveAccordionBoldFont: {
    fontFamily: 'SourceSansPro_Semibold',
    fontSize: 20,
    textAlign: 'right'
  },
  aboveAccordionWhiteList: {
    height: 65,
    width: '100%',
    backgroundColor: '#FFF',
    paddingLeft: 0,
    marginLeft: 0
  },
  aboveAccordionBlackTextL: {
    fontSize: 16,
    color: color.dropdown,
    paddingLeft: 16,
    fontFamily: 'SourceSansPro'
  },
  aboveAccordionBlackTextR: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'SourceSansPro'
  },
  aboveAccordionGreenTextR: {
    fontSize: 16,
    color: color.selling,
    fontFamily: 'SourceSansPro'
  },
  aboveAccordionRedTextR: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'SourceSansPro'
  },
  aboveAccordionGreyText: {
    fontSize: 16,
    color: color.dropdown,
    paddingLeft: 16,
    fontFamily: 'SourceSansPro'
  },
  aboveAccordionGreyFont: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'SourceSansPro'
  },
  aboveAccordionRedText: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'SourceSansPro'
  },
  aboveAccordionPictureText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '400',
    color: color.menu,
    fontFamily: 'SourceSansPro'
  },
  aboveAccordionMoneyView: {
    width: '50%',
    height: 170,
    alignItems: 'flex-end',
    justifyContent: 'center'
    // backgroundColor: '#FFF',
  },
  viewMarginRight: {
    marginRight: 16
  }
});
