import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'
import PropTypes from 'prop-types'

import styles from './../Style/Layout'

export default class DetailItemAtom extends Component {
  render() {
    return (
      <View style={styles.detailItemWrapper}>
        <Text>
          <Icon name={this.props.icon} type={this.props.type} />
        </Text>
        <Text style={styles.detailText}>{this.props.detailText}</Text>
      </View>
    )
  }
}

DetailItemAtom.propTypes = {
  detailText: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}
