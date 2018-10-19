import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { color } from '../../Style/Color'
import Header from '../../Components/Header/DetailsScreenHeader'

interface IProps {
  navigation: any
}

const ListItem = ({ label, priceColor, amount }: any) => (
  <View style={styles.listContainer}>
    <Text style={styles.listText}>{label}</Text>
    <Text style={[styles.listText, priceColor]}>{amount}</Text>
  </View>
)
export default class ServiceScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const service = navigation.getParam('service', {})
    return {
      header: (
        <Header
          title="Service"
          onPressRightIcon={() =>
            navigation.navigate('EditServices', { service })
          }
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }

  render() {
    const service = this.props.navigation.getParam('service', {})
    const price = '\u20A6 ' + service.price
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[
              styles.headerText,
              { fontFamily: 'SourceSansPro-Semibold' }
            ]}
          >
            {service.name}
          </Text>
        </View>
        <ListItem
          amount={price}
          label="Selling price"
          priceColor={{ color: color.selling }}
        />
        <ListItem amount="100" label="Amount sold" />
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
    fontFamily: 'Source Sans Pro',
    marginRight: 32,
    color: color.secondary
  },
  listContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.dropdown,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listText: {
    fontFamily: 'Source Sans Pro',
    marginHorizontal: 32
  }
})
