import React, { PureComponent } from 'react'
import SettingsItem from '../Components/SettingsList'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation: any
}

interface IState {}

class SettingsScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Settings"
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
            section: 'Profile',
            routeName: 'Profile'
          }
        ]}
      />
    )
  }
}

export default SettingsScreen
