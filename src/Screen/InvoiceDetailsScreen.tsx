import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, Alert, FlatList } from 'react-native'
import ListItemAtom from '../Atom/ListItemAtom'
import CustomHeader from '../Components/CustomHeader'
import { color } from '../Style/Color'
import { Icon, Button } from 'native-base'
import ListItemWithImage from '../Components/ListItemWithImage'
import SalesOrderListAtom from '../Atom/SalesOrderListAtom'

export default class InvoiceDetailsScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Invoice"
          onBackPress={() => navigation.goBack()}
          showRight
          firstRightIcon="credit-card-multiple"
          firstRightIconType="MaterialCommunityIcons"
          rightText="Pay"
          onPressRightButton={() => Alert.alert('Pay button pressed.')}
        >
          <Button
            transparent={true}
            onPress={() => Alert.alert('Clicked on edit.')}
            style={styles.rightWrapper}
          >
            <Icon
              name="pencil"
              type="MaterialCommunityIcons"
              style={styles.whiteIcon}
            />
            <Text style={styles.edit}>Edit</Text>
          </Button>
        </CustomHeader>
      )
    }
  }

  renderItemList = ({ item }: any) => {
    return (
      <SalesOrderListAtom
        firstTopLeftText={item.product}
        topRightText={'\u20A6 ' + item.price}
        bottomLeftText={item.quantity}
        topLeftTextStyle={[styles.listLabel, styles.item]}
        bottomLeftTextStyle={styles.item}
        rightTopTextStyle={styles.itemPrice}
        style={styles.itemListWrapper}
        activeOpacity={1}
      />
    )
  }

  render() {
    const DATA: Array<{ product: string; quantity: string; price: string }> = [
      {
        product: 'Item 1',
        quantity: '4 X 5000 each',
        price: '20,000.00'
      },
      {
        product: 'Item 2',
        quantity: '1 X 3000 each',
        price: '3000.00'
      },
      {
        product: 'Item 3',
        quantity: '4 X 1000 each',
        price: '4000.00'
      }
    ]

    return (
      <ScrollView style={styles.container}>
        <ListItemAtom
          label="INVOICE ID"
          value="#00023"
          labelStyle={styles.listLabel}
          rightTextStyle={[styles.transactionID, styles.transactionValue]}
          listItemStyle={styles.listWrapper}
        />
        <ListItemWithImage
          label="Issued to"
          bottomText="Chito Omenemeh"
          picStyle={styles.avatar}
        />
        <ListItemAtom
          label="Issued date"
          value="04 / 11 / 2018"
          labelStyle={styles.listLabel}
          rightTextStyle={[styles.transactionID, styles.normalText]}
          listItemStyle={styles.listWrapper}
        />
        <FlatList
          data={DATA}
          renderItem={this.renderItemList}
          ListEmptyComponent={undefined}
          keyExtractor={(item: any) => item.product}
        />
        <ListItemAtom
          label="TOTAL"
          value={'\u20A6 ' + '27,350.00'}
          listItemStyle={styles.totalWrapper}
          rightTextStyle={[
            styles.transactionID,
            styles.transactionValue,
            styles.whiteText
          ]}
        />
        <ListItemAtom
          label="AMOUNT PAID"
          value={'\u20A6 ' + '6,000.00'}
          labelStyle={styles.listLabel}
          rightTextStyle={[
            styles.transactionID,
            styles.transactionValue,
            styles.greenText
          ]}
          listItemStyle={styles.listWrapper}
        />
        <ListItemAtom
          label="Balance due"
          value={'\u20A6 ' + '21,000.00'}
          labelStyle={styles.listLabel}
          rightTextStyle={[
            styles.transactionID,
            styles.transactionValue,
            styles.redText
          ]}
          listItemStyle={styles.listWrapper}
        />
        <ListItemAtom
          label="Balance due date"
          value={'24 - 11 - 2018'}
          labelStyle={styles.listLabel}
          rightTextStyle={[
            styles.transactionID,
            styles.transactionValue,
            styles.dueValue
          ]}
          listItemStyle={styles.listWrapper}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  listLabel: {
    color: color.principal,
    fontFamily: 'SourceSansPro'
  },
  transactionID: {
    color: color.principal,
    fontFamily: 'SourceSansPro_Semibold',
    marginRight: 16
  },
  rightWrapper: {
    flexDirection: 'row',
    marginRight: 0
  },
  whiteIcon: {
    color: color.secondary,
    width: 25,
    left: 20
  },
  edit: {
    fontFamily: 'SourceSansPro',
    color: color.secondary,
    alignSelf: 'center',
    fontSize: 14,
    marginLeft: 8
  },
  listWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor
  },
  avatar: {
    alignSelf: 'flex-end'
  },
  normalText: {
    fontFamily: 'SourceSansPro'
  },
  item: {
    marginLeft: 16
  },
  itemPrice: {
    marginTop: 24,
    color: color.selling,
    marginRight: 12
  },
  itemListWrapper: {
    marginHorizontal: 0,
    marginBottom: 0
  },
  totalWrapper: {
    backgroundColor: color.selling
  },
  transactionValue: {
    marginTop: 0
  },
  whiteText: {
    color: color.secondary
  },
  greenText: {
    color: color.selling
  },
  redText: {
    color: color.red
  },
  dueValue: {
    fontFamily: 'SourceSansPro'
  }
})
