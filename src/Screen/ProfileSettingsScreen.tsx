import React, { PureComponent } from 'react'
import SettingsList from '../Components/SettingsList'
import Header from '../Components/Header/BaseHeader'
import gql from 'graphql-tag'
import Auth from '../services/auth'
import { UserContext } from '../context/UserContext'

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
          title="Settings"
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
    }
  }
  handleLogOut = async resetUserContext => {
    const {
      screenProps: { client }
    } = this.props
    await Auth.clearVault()
    await client.resetStore()
    client.mutate({ mutation: LogoutClientGQL })
    resetUserContext()
    this.props.navigation.navigate('Login')
  }
  render() {
    const {
      navigation: { navigate }
    } = this.props

    return (
      <UserContext.Consumer>
        {({ resetUserContext }) => (
          <SettingsList
            navigate={navigate}
            categories={[
              {
                section: 'Your Profile',
                routeName: 'UserProfile',
                showRightCaret: true,
                description: 'View and edit your Profile',
                icon: 'md-person'
              },
              {
                section: 'Your Business Profile',
                routeName: 'BusinessProfile',
                showRightCaret: true,
                description: "View and edit your business's information",
                icon: 'business',
                iconType: 'MaterialIcons'
              },
              {
                section: 'Log Out',
                routeName: 'Login',
                showRightCaret: false,
                onPress: () => this.handleLogOut(resetUserContext),
                description: '',
                icon: 'md-power'
              }
            ]}
          />
        )}
      </UserContext.Consumer>
    )
  }
}
export default ProfileSettingsScreen
