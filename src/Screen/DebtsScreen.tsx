import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import DebtList from '../components/DebtList'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

class DebtsScreen extends Component<IProps> {
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

  onPress = () => {
    this.props.navigation.navigate('DebtDetails')
  }

  render() {
    // const { params } = this.props.navigation.state
    // const items = params.data.debts

    return (
      <View style={styles.centerContainer}>
        <DebtList onPress={this.onPress} />
      </View>
    )
  }
}

export default DebtsScreen

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
