import React, { Component } from 'react'
import { View } from 'react-native'
import { Icon } from 'native-base'

import DebtList from '../Components/DebtList'
import styles from './../Style/Screen'

interface IProps {
  navigation: any
}

interface IState {}

class DebtsScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    const { params } = navigation.state
    let right = <Icon name={'ios-search'} style={styles.headerIcon} />
    let left = params &&
      params.items &&
      params.items.length > 0 && (
        <Icon
          name={'menu'}
          onPress={() => navigation.navigate('DrawerToggle')}
          style={styles.headerIcon}
        />
      )
    return {
      title: 'Kay5iveAttractions',
      headerRight: right,
      headerLeft: left
    }
  }

  render() {
    const { params } = this.props.navigation.state
    const items = params.data.debts

    return (
      <View style={styles.centerContainer}>
        <DebtList items={items} />
      </View>
    )
  }
}

export default DebtsScreen
