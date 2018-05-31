import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import NewBusinessForm from '../Components/NewBusinessForm'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {
  item: any
}

class NewBusinessScreen extends Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    const { params = { itemsLength: 1 } } = navigation.state
    let itemsLength = params.itemsLength
      ? params.itemsLength
      : params.item
        ? 1
        : 0
    let right = itemsLength < 1 && (
      <View style={styles.headerItem}>
        <Icon
          name={'logout'}
          style={styles.headerIconLogout}
          type={'MaterialCommunityIcons'}
        />
        <Text style={styles.headerText}>Logout</Text>
      </View>
    )
    let left = itemsLength > 0 && (
      <Icon
        name={'menu'}
        onPress={() => navigation.navigate('DrawerToggle')}
        style={styles.headerIcon}
      />
    )
    return {
      title: 'Ayo',
      headerRight: right,
      headerLeft: left
    }
  }

  componentWillMount() {
    this.setState({
      item: this.props.navigation.getParam('data', undefined)
    })
  }

  render() {
    return this.state.item ? (
      <NewBusinessForm
        item={this.state.item}
        navigation={this.props.navigation}
      />
    ) : (
      <NewBusinessForm navigation={this.props.navigation} />
    )
  }
}

export default NewBusinessScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  headerText: {
    color: color.secondary,
    fontWeight: 'bold',
    paddingRight: 16,
    fontSize: 18
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
  }
})
