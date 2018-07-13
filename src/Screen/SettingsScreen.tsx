import React, { PureComponent } from 'react'
import SettingsList from '../Components/SettingsList'
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
      <SettingsList
        navigate={navigate}
        categories={[
          {
            section: 'Profile',
            routeName: 'Profile',
            showRightCaret: true
          }
        ]}
      />
    )
  }
}

export default SettingsScreen
