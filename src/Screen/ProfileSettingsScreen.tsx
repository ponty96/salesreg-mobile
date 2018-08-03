import gql from 'graphql-tag'
import React, { PureComponent } from 'react'
import CustomHeader from '../Components/CustomHeader'
import SettingsList from '../Components/SettingsList'
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
  public static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Profile settings"
          // tslint:disable-next-line:jsx-no-lambda
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }
  public handleLogOut = async () => {
    const {
      screenProps: { client }
    } = this.props
    await Auth.clearVault()
    await client.resetStore()
    client.mutate({ mutation: LogoutClientGQL })
    this.props.navigation.navigate('Login')
  }
  public render() {
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
