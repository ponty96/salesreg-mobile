import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import { color } from '../Style/Color'
import ServiceListAtom from '../Atom/ServiceListAtom'

interface IProps {
  navigation: any
}

export default class ServiceScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Service',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditServices')
          }}
        >
          <View style={styles.headerItem}>
            <Icon
              name={'pencil'}
              style={styles.headerIconLogout}
              type={'MaterialCommunityIcons'}
            />
            <Text style={styles.edit}>Edit</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { navigation } = this.props
    const productName = navigation.getParam('productName', 'Default value')
    let price = navigation.getParam('price', 'Default')
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
