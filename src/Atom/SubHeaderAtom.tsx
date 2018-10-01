import * as React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { color } from '../Style/Color'
import Icon from './Icon'

interface IProps {
  total?: any
  list?: any[]
  image?: any
  rightLabel?: string
  screen?: string
  onPressArrow?: () => void
  children?: JSX.Element
}

class SubHeaderAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    total: ''
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.row}>
          <Icon name="md-cart" type="Ionicons" style={styles.cart} />
          <Text style={styles.text}>{this.props.total}</Text>
        </View>
        <TouchableOpacity onPress={this.props.onPressArrow}>
          <View style={styles.row}>
            <Text style={styles.rightLabel}>{this.props.rightLabel}</Text>
            <Icon
              name="chevron-small-right"
              type="Entypo"
              onPress={this.props.onPressArrow}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SubHeaderAtom

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 13,
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
    flexDirection: 'row'
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
    fontSize: 20,
    color: color.button
  }
})
