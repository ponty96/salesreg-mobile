import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Header, Left, Right, Icon, Text } from 'native-base'
import PickerAtom from './PickerAtom'

import styles from '../Style/exportStyles'

class SubHeaderAtom extends React.Component {
  static defaultProps = {
    total: '800'
  }

  render() {
    return (
      <Header style={styles.subHeaderHeader}>
        <Left style={styles.subHeaderRow}>
          <Icon style={styles.subHeaderIconColor} name="md-briefcase" />
          <Text style={styles.subHeaderPad}>{this.props.total}</Text>
        </Left>
        <Right style={styles.subHeaderRow}>
          <Text style={styles.subHeaderFont}>Sort By:</Text>
          <PickerAtom list={this.props.list} style={styles.pickerStyle} />
        </Right>
      </Header>
    )
  }
}

SubHeaderAtom.propTypes = {
  total: PropTypes.string
}

export default SubHeaderAtom
