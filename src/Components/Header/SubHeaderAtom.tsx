import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'

import { color } from '../../Style/Color'

interface IProps {
  total?: any
  list?: any[]
  image?: any
  rightLabel?: string | any
  screen?: string
  onPressArrow?: () => void
  children?: JSX.Element
  iconName?: string
  iconType?: any
}

class SubHeaderAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    total: '',
    iconName: 'md-cart'
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={[styles.row, { marginLeft: 6 }]}>
          <Icon
            name={this.props.iconName}
            type={this.props.iconType || 'Ionicons'}
            style={styles.cart}
          />
          <Text style={styles.text}>{this.props.total}</Text>
        </View>
        {this.props.rightLabel ? (
          <TouchableOpacity onPress={this.props.onPressArrow}>
            <View style={[styles.row, { marginRight: -7 }]}>
              <Text style={styles.rightLabel}>{this.props.rightLabel}</Text>
              <Icon
                name="chevron-small-right"
                type="Entypo"
                onPress={this.props.onPressArrow}
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    )
  }
}

export default SubHeaderAtom

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom,
    marginBottom: 6
  },
  text: {
    fontSize: 14,
    fontFamily: 'AvenirNext-Regular',
    marginLeft: 8,
    color: color.textColor
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cart: {
    fontSize: 20,
    color: color.textColor,
    marginRight: 6
  },
  rightLabel: {
    color: color.button,
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium'
  },
  arrowIcon: {
    fontSize: 28,
    color: color.button
  }
})
