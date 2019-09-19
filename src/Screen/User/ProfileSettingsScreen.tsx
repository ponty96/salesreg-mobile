import React, { PureComponent } from 'react'
import gql from 'graphql-tag'

import SettingsList from '../../Components/SettingsList'
import Header from '../../Components/Header/BaseHeader'
import { UserContext } from '../../context/UserContext'
import { persistor } from '../../client'
import { disableMobileDeviceNotification } from '../../services/MobileDevice'

interface IProps {
  navigation: any
  screenProps: any
  user: any
  resetUserContext: (obj?: any) => void
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
          onPressRightIcon={() => navigation.navigate('Notifications')}
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
    }
  }

  handleLogOut = async () => {
    const {
      screenProps: { client },
      user
    } = this.props

    disableMobileDeviceNotification(client, user)
    this.props.resetUserContext()
    await persistor.purge()
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
            section: 'Your Profile',
            routeName: 'UserProfile',
            showRightCaret: true,
            description: 'View and edit your Profile',
            icon: 'person',
            iconType: 'MaterialIcons'
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
            section: 'Manage Subscription',
            routeName: 'SubscriptionDetails',
            showRightCaret: true,
            description: 'Manage your subscription',
            icon: 'payment',
            iconType: 'MaterialIcons'
          },
          {
            section: 'Manage Variant Options',
            routeName: 'Options',
            showRightCaret: true,
            description: 'Manage variant options e.g size, color',
            icon: 'package-variant',
            iconType: 'MaterialCommunityIcons'
          },
          {
            section: 'Manage Webstore',
            routeName: 'WebstoreOptions',
            showRightCaret: true,
            description: 'Manage your webstore options',
            icon: 'web',
            iconType: 'MaterialCommunityIcons'
          },
          {
            section: 'Log Out',
            routeName: 'Login',
            showRightCaret: false,
            onPress: this.handleLogOut,
            description: '',
            iconType: 'MaterialIcons',
            icon: 'power-settings-new'
          }
        ]}
      />
    )
  }
}

const _ProfileSettingsScreen: any = props => (
  <UserContext.Consumer>
    {({ user, resetUserContext }) => (
      <ProfileSettingsScreen
        {...props}
        user={user}
        resetUserContext={resetUserContext}
      />
    )}
  </UserContext.Consumer>
)

_ProfileSettingsScreen.navigationOptions =
  ProfileSettingsScreen.navigationOptions

export default _ProfileSettingsScreen
