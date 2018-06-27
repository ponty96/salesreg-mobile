import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'native-base'
import MenuButton from 'react-native-menu-button'
import { color } from '../Style/Color'

/*interface IProps {
  navigation: any
}*/

export default class MenuAtom extends Component /*<IProps, any>*/ {
  handleOnSelect = (value /*: string*/) => {
    this.props.navigation.navigate(value)
  }
  render() {
    const menuGroup = [
      { key: '0', value: 'FeedBack', text: 'Feed Back' },
      { key: '1', value: 'Help', text: 'Help' },
      { key: '2', value: 'Settings', text: 'Settings' },
      { key: '3', value: 'Auth', text: 'Sign Out' }
    ]
    return (
      <MenuButton
        buttonStyle={styles.buttonStyle}
        button={<Icon name="md-more" style={styles.icon} />}
        optionsStyle={{ position: 'absolute', top: 28, right: 0 }}
        optionTextStyle={{ fontSize: 16 }}
        menuGroup={menuGroup}
        onSelect={this.handleOnSelect}
        optionSelectedStyle={{ backgroundColor: color.check }}
      />
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 35,
    height: 35,
    padding: 2
  },
  icon: {
    color: color.secondary,
    padding: 1,
    fontSize: 29
  }
})
