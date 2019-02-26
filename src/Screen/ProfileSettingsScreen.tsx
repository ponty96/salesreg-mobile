import React, { PureComponent } from 'react'
import SettingsList from '../Components/SettingsList'
import Header from '../Components/Header/BaseHeader'
import gql from 'graphql-tag'
import Auth from '../services/auth'
import { UserContext } from '../context/UserContext'
import { persistor } from '../client'

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
          onPressRightIcon={() => navigation.navigate('Notifications')}
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
    await persistor.purge()
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
                section: 'Manage Categories',
                routeName: 'Categories',
                showRightCaret: true,
                description: 'Manage your store categories',
                icon: 'apps',
                iconType: 'MaterialCommunityIcons'
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
                section: 'Charge Calculator',
                routeName: 'ChargeCalculator',
                showRightCaret: true,
                description:
                  'Calculate the amount of profit you can make on a single sales',
                icon: 'calculator',
                iconType: 'MaterialCommunityIcons'
              },
              {
                section: 'Log Out',
                routeName: 'Login',
                showRightCaret: false,
                onPress: () => this.handleLogOut(resetUserContext),
                description: '',
                iconType: 'MaterialIcons',
                icon: 'power-settings-new'
              }
            ]}
          />
        )}
      </UserContext.Consumer>
    )
  }
}
export default ProfileSettingsScreen
