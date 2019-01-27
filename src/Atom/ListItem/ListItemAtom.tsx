import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { color } from '../../Style/Color'
import Icon from '../Icon'

interface IProps {
  label: string
  value: string
  rightTextStyle?: object
  listItemStyle?: object
  labelStyle?: object
  redText?: boolean
  greenText?: boolean
  quantity?: string
  icon?: JSX.Element
}

interface IState {
  bodyViewState: boolean
}

class ListItemAtom extends React.PureComponent<IProps, IState> {
  state = {
    bodyViewState: false
  }

  renderBody = (value: any): JSX.Element => {
    if (
      typeof value == 'object' &&
      value !== null &&
      this.state.bodyViewState
    ) {
      return (
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 10 }}>
          {value.map((val, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.normalText}>{val}</Text>
            </View>
          ))}
        </View>
      )
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
        <View>
          <View style={[styles.wrapper, this.props.listItemStyle]}>
            <Text style={[styles.text, this.props.labelStyle]}>
              {this.props.label}
            </Text>
            {typeof this.props.value == 'object' &&
            this.props.value !== null ? (
              <Icon
                name={
                  this.state.bodyViewState ? 'ios-arrow-up' : 'ios-arrow-down'
                }
                type="Ionicons"
                style={{
                  fontSize: 28,
                  color: color.textColor
                }}
              />
            ) : (
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                {this.props.quantity ? (
                  <Text style={{ color: color.textColor }}>
                    {this.props.quantity}
                  </Text>
                ) : (
                  <Text />
                )}
                <Text
                  style={[
                    styles.text,
                    this.props.rightTextStyle,
                    this.props.redText ? { color: color.red } : undefined,
                    this.props.greenText ? { color: color.selling } : undefined
                  ]}
                >
                  {this.props.value}
                  {this.props.icon}
                </Text>
              </View>
            )}
          </View>
          {this.renderBody(this.props.value)}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ListItemAtom

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0.5,
    height: 64
  },
  text: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Semibold',
    color: color.secondary,
    justifyContent: 'center',
    textAlign: 'right',
    alignItems: 'center'
  },
  normalText: {
    fontSize: 14,
    fontFamily: 'SourceSansPro-Semibold',
    color: color.textColor
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 16,
    marginBottom: 8
  }
})
