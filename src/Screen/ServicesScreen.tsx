import React, { PureComponent } from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'

import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import { color } from '../Style/Color'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import FabAtom from '../Atom/FabAtom'

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

  handleTouch = () => {
    this.props.navigation.navigate('ShowService')
  }

  renderList = ({ item }: any) => {
    return (
      <ServiceListItemAtom
        name={item.key}
        amount={item.price}
        onPress={() => this.handleTouch()}
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
        <FabAtom
          routeName={'EditServices'}
          name={'circle-with-plus'}
          type={'Entypo'}
          navigation={this.props.navigation}
        />
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
