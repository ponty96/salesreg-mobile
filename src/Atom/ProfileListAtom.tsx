import React, { Component } from 'react'
import { ListItem, Left } from 'native-base'
import { Text, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  section: string
  value: string
}

class ProfileListAtom extends Component<IProps, any> {
  render() {
    return (
      <ListItem style={styles.list}>
        <Left style={styles.left}>
          <Text style={styles.blueText}>{this.props.section}</Text>
          <Text style={styles.normalText}>{this.props.value}</Text>
        </Left>
      </ListItem>
    )
  }
}

export default ProfileListAtom

const styles = StyleSheet.create({
  list: {
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: '#FFF',
    minHeight: 55,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: color.list
  },
  left: {
    marginLeft: 32,
    flexDirection: 'column'
  },
  blueText: {
    color: color.button,
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
    paddingBottom: 5
  },
  normalText: {
    fontSize: 14,
    fontFamily: 'Source Sans Pro'
  }
})
