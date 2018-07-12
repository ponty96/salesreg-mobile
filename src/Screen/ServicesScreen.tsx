import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'

import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import { color } from '../Style/Color'
import SubHeaderAtom from '../Atom/SubHeaderAtom'

interface IProps {
  navigation: any
}

class ServicesScreen extends PureComponent<IProps> {
  SERVICES = [
    { key: '1 million Braids', price: '3000' },
    { key: 'Re-touching', price: '1000' },
    { key: 'Steaming', price: '800' },
    { key: 'DD', price: '400' }
  ]

  handleTouch = (item: { name: string; amount: string }) => {
    this.props.navigation.navigate('ShowService', {
      productName: item.name,
      price: item.amount
    })
    console.log(item.name)
  }

  renderList = ({ item }: any) => {
    return (
      <ServiceListItemAtom
        name={item.key}
        amount={item.price}
        onPress={() => this.handleTouch({ name: item.key, amount: item.price })}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <SubHeaderAtom list={['Lorem ipsum']} />
        <ScrollView>
          <FlatList data={this.SERVICES} renderItem={this.renderList} />
        </ScrollView>
      </View>
    )
  }
}

export default ServicesScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
