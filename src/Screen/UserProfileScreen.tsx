import React, { Component } from 'react'

import UserProfile from '../Components/UserProfile'
import Header from '../Components/Header/DetailsScreenHeader'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  list: any
  fullName: string
}

class UserProfileScreen extends Component<IProps, IState> {
  state = {
    list: {},
    fullName: ''
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="User profile"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => navigation.navigate('EditUserProfile')}
        />
      )
    }
  }

  componentDidMount() {
    this.updateState()
  }

  updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      list: {
        Gender: user.gender || '',
        Phone: user.phone ? user.phone.number : '',
        Email: user.email,
        Address: user.location ? this.parseLocation(user.location) : ''
      },
      fullName: `${user.firstName} ${user.lastName}`
    })
  }

  parseLocation = ({ street1, city, state, country }) => {
    return `${street1} ${city} ${state} ${country}`
  }
  render() {
    return <UserProfile list={this.state.list} name={this.state.fullName} />
  }
}

export default UserProfileScreen
