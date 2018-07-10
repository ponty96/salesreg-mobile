import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import EmptyList from '../Components/EmptyList'
import SelectStatusAtom from '../Atom/SelectStatusAtom'
import { color } from '../Style/Color'

export default class SalesOederStatusScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <EmptyList
          type={{
            Text:
              'This order cannot be deleted nor canceled after status changes from pending to any other state.',
            style: { marginBottom: 8 }
          }}
        />
        <SelectStatusAtom
          title="Pending"
          indicatorColor={{ backgroundColor: color.red }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
