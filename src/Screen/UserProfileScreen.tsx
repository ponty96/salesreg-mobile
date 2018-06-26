import React, { Component } from 'react'
import { Icon } from 'native-base'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import UserProfile from '../Components/UserProfile'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {
  list: any
}

class UserProfileScreen extends Component<IProps, IState> {
  state = {
    // item: this.props.navigation.state.params.data
    list: [
      {
        section: 'Gender',
        value: 'Female'
      },
      {
        section: 'Phone',
        value: '09034567889'
      },
      {
        section: 'Email',
        value: 'ayo@gmail.com'
      },
      {
        section: 'Address',
        value: '6 Salem street Morogbo, Lagos'
      }
    ]
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: (
        <Text style={[{ fontFamily: 'SourceSansPro' }]}>User Profile</Text>
      ), // params.name
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
              data: 'Kay5ive Attractions' // params.data
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
    return <UserProfile list={this.state.list} businessName="Ayo Doe" />
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
