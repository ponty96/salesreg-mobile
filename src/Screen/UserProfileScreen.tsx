import React, { Component } from 'react'

import UserProfile from '../Components/UserProfile'
import CustomHeader from '../Components/CustomHeader'

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
      header: (
        <CustomHeader
          title="User profile"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  render() {
    return <UserProfile list={this.state.list} businessName="Ayo Doe" />
  }
}

export default UserProfileScreen
