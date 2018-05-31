import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import InnerDebtList from '../Components/InnerDebtList'
import { color } from '../Style/Color'

class DebtDetailsScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Debt Details',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      )
    }
  }

  render() {
    // do change the list to the appropriate molecule
    return (
      <View style={styles.centerContainer}>
        <InnerDebtList />
      </View>
    )
  }
}

export default DebtDetailsScreen

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
  }
})
