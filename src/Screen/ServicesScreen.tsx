import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import ServiceListItemAtom from '../Atom/ServiceListItemAtom'
import { color } from '../Style/Color'
import SubHeaderAtom from '../Atom/SubHeaderAtom'

interface IProps {
  navigation: any
}

interface IState {}

class ServicesScreen extends PureComponent<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <SubHeaderAtom list={['Lorem ipsum']} />
        <ServiceListItemAtom
          name="1 million Braids"
          amount={'\u20A6' + ' 3000'}
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
    flex: 1
  }
})
