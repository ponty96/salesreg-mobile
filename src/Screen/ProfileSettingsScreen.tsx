import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import { color } from '../Style/Color'
import SettingsItem from '../Components/SettingsList'

interface IProps {
  navigation: any
}

interface IState {}

class ProfileSettingsScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Profile Settings',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
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

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
