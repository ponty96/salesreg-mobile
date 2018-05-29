import React, { Component } from 'react'
import { Icon } from 'native-base'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import UserProfile from '../Components/UserProfile'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {
  item: any
}

class UserProfileScreen extends Component<IProps, IState> {
  state = {
    item: this.props.navigation.state.params.data
  }

  static navigationOptions = ({ navigation }: any) => {
    const { params } = navigation.state
    return {
      title: params.name,
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditUserProfile', {
              data: params.data
            })
          }}
        >
          <View style={styles.headerItem}>
            <Icon
              name={'pencil'}
              style={styles.headerIconLogout}
              type={'MaterialCommunityIcons'}
            />
            <Text style={styles.headerText}>Edit</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <UserProfile item={this.state.item} navigation={this.props.navigation} />
    )
  }
}

export default UserProfileScreen

const styles = StyleSheet.create({
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
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
