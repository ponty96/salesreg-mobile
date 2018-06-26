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

class BusinessProfileScreen extends Component<IProps, IState> {
  state = {
    // item: this.props.navigation.state.params.data
    list: [
      {
        section: 'Location',
        value: '6 Salem street Morogbo, Lagos'
      },
      {
        section: 'Email',
        value: 'ayo@gmail.com'
      },
      {
        section: 'Category',
        value: 'Product, Services'
      },
      {
        section: 'Currency',
        value: 'Naira \u20A6'
      },
      {
        section: 'Description',
        value:
          // tslint:disable-next-line:max-line-length
          'Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard of dummy text since the 1500s, when an unknown printer took a gallery'
      }
    ]
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: (
        <Text style={[{ fontFamily: 'SourceSansPro' }]}>Business Profile</Text>
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
            navigation.navigate('EditBusinessProfile', {
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
    return (
      <UserProfile list={this.state.list} businessName="Kay5ive Attractions" />
    )
  }
}

export default BusinessProfileScreen

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
