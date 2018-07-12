import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { color } from '../Style/Color'
import ServiceListAtom from '../Atom/ServiceListAtom'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

export default class ServiceScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Service"
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          rightText="Edit"
          onPressRightButton={() => navigation.navigate('EditServices')}
          onBackPress={() => navigation.goBack()}
          showRight
        />
      )
    }
  }

  render() {
    const productName: string = '1 million braids'
    let price: string = '2000.00'
    price = '\u20A6 ' + price
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[
              styles.headerText,
              { fontFamily: 'SourceSansPro_Semibold' }
            ]}
          >
            {productName}
          </Text>
        </View>
        <ServiceListAtom
          priceOrNumberSold={price}
          label="Selling price"
          priceColor={{ color: color.selling }}
        />
        <ServiceListAtom priceOrNumberSold="100" label="Amount sold" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    borderBottomColor: color.dropdown,
    borderBottomWidth: 1
  },
  headerText: {
    marginVertical: 32,
    fontSize: 14,
    color: color.button,

    marginLeft: 32
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
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
  edit: {
    fontFamily: 'SourceSansPro',
    marginRight: 32,
    color: color.secondary
  }
})
