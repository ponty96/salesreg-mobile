import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import { color } from '../../Style/Color'
import Icon from '../Icon'

interface IProps {
  section: string
  value: any
  iconName?: string
  body?: any
  type?: any
  onPress?: () => void
}

interface IState {
  bodyViewState: boolean
}

class ProfileListAtom extends Component<IProps, IState> {
  state = {
    bodyViewState: false
  }
  rightRightComponent = (value: any) => {
    if (this.props.type == 'currency') {
      return <Text style={styles.priceText}>{this.props.value}</Text>
    } else if (this.props.type == 'button') {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.buttonRow}>
            <Text style={styles.rightLabel}>{this.props.value}</Text>
            <Icon
              name="chevron-small-right"
              type="Entypo"
              onPress={this.props.onPress}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
      )
    } else if (typeof value == 'string') {
      return <Text style={styles.normalText}>{this.props.value}</Text>
    } else if (
      this.props.body ||
      (typeof value == 'object' && value !== null)
    ) {
      return (
        <Icon
          name={this.state.bodyViewState ? 'ios-arrow-up' : 'ios-arrow-down'}
          type="Ionicons"
          style={{
            fontSize: 28,
            color: color.textColor
          }}
        />
      )
    } else return <View />
  }
  renderBody = (value: any): JSX.Element => {
    if (
      typeof value == 'object' &&
      value !== null &&
      this.state.bodyViewState
    ) {
      return (
        <View style={{ backgroundColor: '#fff' }}>
          {value.map((val, index) => (
            <View key={index} style={styles.row}>
              {/* <Text style={styles.normalText}>{key}</Text> */}
              <Text style={styles.normalText}>{val}</Text>
            </View>
          ))}
        </View>
      )
    } else if (this.props.body && this.state.bodyViewState) {
      return <View style={{ backgroundColor: '#fff' }}>{this.props.body}</View>
    } else {
      return <View />
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.setState({ bodyViewState: !this.state.bodyViewState })
        }
      >
        <View style={styles.column}>
          <View style={styles.labelSection}>
            <View style={styles.left}>
              {this.props.iconName && (
                <View
                  style={{
                    marginRight: 8
                  }}
                >
                  <Icon
                    type="MaterialCommunityIcons"
                    name={this.props.iconName}
                    style={{
                      fontSize: 28,
                      color: color.textColor
                    }}
                  />
                </View>
              )}
              <Text style={styles.label}>{this.props.section}</Text>
            </View>
            {this.rightRightComponent(this.props.value)}
          </View>
          {this.renderBody(this.props.value)}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ProfileListAtom

const styles = StyleSheet.create({
  column: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: color.list,
    // flex: 1,
    marginLeft: 0,
    paddingLeft: 0,
    minHeight: 55
  },
  labelSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderColor: '#000'
  },
  showBorder: {
    borderBottomWidth: 1,
    borderBottomColor: color.list
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    flexDirection: 'column'
  },
  label: {
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold',
    color: color.textColor
  },
  normalText: {
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium',
    color: color.textColor
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 16,
    marginBottom: 8
  },
  hideBorder: {
    borderBottomWidth: 0
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'AvenirNext-Medium',
    color: color.selling
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center'
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
