import React, { Component } from 'react'

import Header from '../../Components/Header/DetailsScreenHeader'
import GenericProfileDetails from '../../Components/Generic/ProfileDetails'
import Auth from '../../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  list: any
  fullName: string
  profilePicture: string
}

export default class UserProfileScreen extends Component<IProps, IState> {
  state = {
    list: [],
    fullName: '',
    profilePicture: ''
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
      list: [
        {
          section: 'Email',
          value: user.email
        },
        // {
        //   section: 'Phone',
        //   value: user.phone ? user.phone.number : ''
        // },
        {
          section: 'Date of Birth',
          value: user.dateOfBirth
        }
      ],
      fullName: `${user.firstName} ${user.lastName}`,
      profilePicture: user.profilePicture || ''
    })
  }

  render() {
    return (
      <GenericProfileDetails
        headerText={this.state.fullName}
        sections={this.state.list}
        image={this.state.profilePicture}
      />
    )
  }
}
