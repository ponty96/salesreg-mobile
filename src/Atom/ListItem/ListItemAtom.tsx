import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'native-base'

import { color } from '../../Style/Color'
import { RegularText } from '../../Atom/TextAtom'

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
              <RegularText style={styles.normalText}>{val}</RegularText>
            </View>
          ))}
        </View>
      )
    } else {
      return <View />
    }
  }

  renderWithToogle = () => (
    <TouchableWithoutFeedback
      onPress={() =>
        this.setState({ bodyViewState: !this.state.bodyViewState })
      }
    >
      <View>
        <View style={[styles.wrapper, this.props.listItemStyle]}>
          <RegularText style={[styles.text, this.props.labelStyle]}>
            {this.props.label}
          </RegularText>
          {typeof this.props.value == 'object' && this.props.value !== null ? (
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
                <RegularText style={{ color: color.textColor }}>
                  {this.props.quantity}
                </RegularText>
              ) : (
                <RegularText />
              )}
              <RegularText
                style={[
                  styles.text,
                  this.props.rightTextStyle,
                  this.props.redText ? { color: color.red } : undefined,
                  this.props.greenText ? { color: color.selling } : undefined
                ]}
              >
                {this.props.value}
                {this.props.icon}
              </RegularText>
            </View>
          )}
        </View>
        {this.renderBody(this.props.value)}
      </View>
    </TouchableWithoutFeedback>
  )

  renderWithoutToggle = () => (
    <View>
      <View style={[styles.wrapper, this.props.listItemStyle]}>
        <RegularText style={[styles.text, this.props.labelStyle]}>
          {this.props.label}
        </RegularText>
        {typeof this.props.value == 'object' && this.props.value !== null ? (
          <Icon
            name={this.state.bodyViewState ? 'ios-arrow-up' : 'ios-arrow-down'}
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
              <RegularText style={{ color: color.textColor }}>
                {this.props.quantity}
              </RegularText>
            ) : (
              <RegularText />
            )}
            <RegularText
              style={[
                styles.text,
                this.props.rightTextStyle,
                this.props.redText ? { color: color.red } : undefined,
                this.props.greenText ? { color: color.selling } : undefined
              ]}
            >
              {this.props.value}
              {this.props.icon}
            </RegularText>
          </View>
        )}
      </View>
      {this.renderBody(this.props.value)}
    </View>
  )

  render() {
    return typeof this.props.value == 'object' && this.props.value !== null
      ? this.renderWithToogle()
      : this.renderWithoutToggle()
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
