import React, { PureComponent } from 'react'
import SettingsList from '../Components/SettingsList'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}
class ProfileSettingsScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Profile settings"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }
  handleLogOut = () => {
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
