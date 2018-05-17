import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { Icon } from 'native-base'

import styles from '../Style/Layout'
import screenStyles from '../Style/Screen'

class SettingsAtom extends Component {
  static defaultProps = {
    rightIcon: false
  }

  renderNumber = () => {
    return <Text style={screenStyles.redText}>{this.props.item.number}</Text>
  }

  renderRightIcon = () => {
    return (
      <View style={styles.itemRightIcon}>
        <Icon
          name={'chevron-right'}
          style={styles.itemIcon}
          type={'MaterialCommunityIcons'}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.sidebarListCont, styles.minimalPadding]}>
        <View style={styles.listTextCont}>
          <Text style={[styles.boldText, screenStyles.firstBox]}>
            {this.props.item.name}
          </Text>
          <Text style={styles.settingsChildText}>{this.props.item.child}</Text>
        </View>
        {this.props.rightIcon ? this.renderRightIcon() : this.renderNumber()}
      </View>
    )
  }
}

SettingsAtom.propTypes = {
  rightIcon: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}

export default SettingsAtom
