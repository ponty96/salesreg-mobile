import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericProfileDetails from '../Components/Generic/ProfileDetails'
import { UserContext } from '../context/UserContext'

interface IProps {
  navigation: any
  user: any
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

  componentDidMount() {
    this.updateState()
  }

  updateState = () => {
    const { user } = this.props
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

const _UserProfileScreen = props => (
  <UserContext.Consumer>
    {user => <UserProfileScreen {...props} user={user} />}
  </UserContext.Consumer>
)

export default _UserProfileScreen
