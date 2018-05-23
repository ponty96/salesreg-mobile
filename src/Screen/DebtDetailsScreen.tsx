import React, { Component } from 'react'
import { View } from 'react-native'
import { Icon } from 'native-base'

import styles from './../Style/Screen'
import InnerDebtList from '../Components/InnerDebtList'

interface IProps {}

interface IState {}

class DebtDetailsScreen extends Component<IProps, IState> {
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
