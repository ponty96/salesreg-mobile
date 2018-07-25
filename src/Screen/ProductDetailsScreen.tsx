import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { Thumbnail, ListItem, Left, Right } from 'native-base';
import { color } from '../Style/Color';
import CustomHeader from '../Components/CustomHeader';

interface IProps {
  navigation?: any;
}

class ProductDetailsScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Product"
          onBackPress={() => navigation.goBack()}
          showRight
          rightText="Edit"
          firstRightIcon="pencil"
          onPressRightButton={() => navigation.navigate('NewProduct')}
          firstRightIconType="MaterialCommunityIcons"
        />
      )
    };
  };

  render() {
    // do change the list to the appropriate molecule
    const product = this.props.navigation.getParam('product', {});
    return (
      <View style={styles.centerContainer}>
        <View style={styles.ababa}>
          <ScrollView>
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
                    {product.name}
                  </Text>
                </View>
                <View style={styles.aboveAccordionMoneyView}>
                  <View style={styles.viewMarginRight}>
                    <Text style={styles.aboveAccordionGreyFont}>
                      Stock quantity(in units)
                    </Text>
                    <Text style={styles.aboveAccordionBoldFont}>
                      {product.number}
                    </Text>
                  </View>
                  <View style={styles.viewMarginRight}>
                    <Text style={styles.aboveAccordionGreyFont}>
                      Total Units Sold
                    </Text>
                    <Text style={styles.aboveAccordionBoldFont}>{300}</Text>
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
                      &#8358; {parseFloat(product.costPrice)}
                    </Text>
                  </Right>
                </ListItem>
                <ListItem style={styles.aboveAccordionWhiteList}>
                  <Left>
                    <Text style={styles.aboveAccordionBlackTextL}>
                      Selling Price
                    </Text>
                  </Left>
                  <Right>
                    <Text style={styles.aboveAccordionGreenTextR}>
                      &#8358; {parseFloat(product.sellingPrice)}
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
                      {product.minimumStockQuantity}
                    </Text>
                  </Right>
                </ListItem>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  headerText: {
    color: color.secondary,
    fontWeight: 'bold',
    paddingRight: 16,
    fontSize: 18
  },
  headerIconLogout: {
    color: color.secondary,
    padding: 8,
    fontSize: 28
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  },
  foota: {
    height: 80,
    padding: 16
  },
  btnP: {
    alignSelf: 'flex-end'
  },
  txtP: {
    color: '#fff',
    fontSize: 16
  },
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
