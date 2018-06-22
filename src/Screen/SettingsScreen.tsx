import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import { color } from '../Style/Color'
import SettingsItem from '../Components/SettingsList'

interface IProps {
  navigation: any
}

interface IState {}

class SettingsScreen extends PureComponent<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Settings',
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
            section: 'Profile',
            routeName: 'Profile'
          }
        ]}
      />
    )
  }
}

export default SettingsScreen

const styles = StyleSheet.create({
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
