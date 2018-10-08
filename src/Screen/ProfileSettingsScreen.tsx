import React, { PureComponent } from 'react'
import SettingsList from '../Components/SettingsList'
import Header from '../Components/Header/BaseHeader'
import gql from 'graphql-tag'
import Auth from '../services/auth'

interface IProps {
  navigation: any
  screenProps: any
}

const LogoutClientGQL = gql`
  mutation logout {
    logout @client
  }
`

class ProfileSettingsScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Profile settings"
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }
  handleLogOut = async () => {
    const {
      screenProps: { client }
    } = this.props
    await Auth.clearVault()
    await client.resetStore()
    client.mutate({ mutation: LogoutClientGQL })
    this.props.navigation.navigate('Login')
  }
  render() {
    const {
      navigation: { navigate }
    } = this.props
    return (
      <SettingsList
        navigate={navigate}
        categories={[
          {
            section: 'User Profile',
            routeName: 'UserProfile',
            showRightCaret: true
          },
          {
            section: 'Business Profile',
            routeName: 'BusinessProfile',
            showRightCaret: true
          },
          {
            section: 'Log Out',
            routeName: 'Login',
            showRightCaret: false,
            onPress: this.handleLogOut
          }
        ]}
      />
    )
  }
}
export default ProfileSettingsScreen
