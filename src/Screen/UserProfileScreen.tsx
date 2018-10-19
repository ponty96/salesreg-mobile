import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import Auth from '../services/auth'
import GenericProfileDetails from '../Components/Generic/ProfileDetails'

interface IProps {
  navigation: any
}

interface IState {
  list: any
  fullName: string
  profilePicture: string
}

class UserProfileScreen extends Component<IProps, IState> {
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

  componentWillMount() {
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
        {
          section: 'Gender',
          value: user.gender
        },
        {
          section: 'Phone',
          value: user.phone ? user.phone.number : ''
        },
        {
          section: 'Date of Birth',
          value: user.dateOfBirth
        }
      ],
      fullName: `${user.firstName} ${user.lastName}`,
      profilePicture: user.profilePicture
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

export default UserProfileScreen
