import React, { PureComponent } from 'react'
import SettingsItem from '../Components/SettingsList'
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
  render() {
    const {
      navigation: { navigate }
    } = this.props
    return (
      <SettingsItem
        navigate={navigate}
        categories={[
          {
            section: 'User Profile',
            routeName: 'UserProfile'
          },
          {
            section: 'Business Profile',
            routeName: 'BusinessProfile'
          }
        ]}
      />
    )
  }
}
export default ProfileSettingsScreen
