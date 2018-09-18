import * as React from 'react'
import { Item, Label, Text } from 'native-base'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  required?: boolean | false
  label: string
  defaultValue: string
  options: any[]
  getValue?: (a: string | number) => void
  underneathText?: string
  underneathStyle?: object
  error?: any
}

const Radio = (props: any) => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View style={styles.radio}>
      <Text style={[styles.radioText]}>{props.option}</Text>
      <View style={[styles.circle, props.isSelected && styles.selected]} />
    </View>
  </TouchableWithoutFeedback>
)
export default class RadioButtonAtom extends React.PureComponent<IProps> {
  render() {
    return (
      <View>
        <Item
          stackedLabel={true}
          style={[
            {
              marginTop: 24,
              height: 70,
              width: '100%',
              marginLeft: 0,
              borderBottomWidth: 0
            }
          ]}
        >
          <Label
            style={{
              color: color.textColor,
              padding: 0
            }}
          >
            {this.props.required && <Text style={styles.required}>*</Text>}
            <Text style={styles.labelText}>{this.props.label}</Text>
          </Label>
          <View style={{ width: '100%' }}>
            {this.props.options.map((option, index: number) => [
              <Radio
                key={`radio-${index}`}
                option={option}
                onPress={() => this.props.getValue(option)}
                isSelected={this.props.defaultValue == option}
              />,
              index + 1 < this.props.options.length && (
                <View
                  key={index + 1}
                  style={{
                    borderBottomColor: color.textBorderBottom,
                    borderBottomWidth: 1
                  }}
                />
              )
            ])}
          </View>
        </Item>
        {this.renderUnderNeathText()}
      </View>
    )
  }

  renderUnderNeathText = () => {
    if (this.props.error || this.props.underneathText) {
      return (
        <Text
          style={[
            styles.underneathText,
            this.props.underneathStyle,
            {
              fontFamily: 'AvenirNext-Regular',
              color: this.props.error ? 'red' : color.principal
            }
          ]}
        >
          {this.props.error || this.props.underneathText}
        </Text>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  label: {
    padding: 3,
    fontSize: 16,
    top: 0
  },
  labelText: {
    fontFamily: 'AvenirNext-Medium',
    padding: 0,
    fontSize: 16,
    color: color.textColor
  },
  required: {
    color: color.inactive,
    fontSize: 14
  },
  underneathText: {
    marginLeft: 0,
    color: color.textColor,
    fontSize: 12,
    marginBottom: 0,
    marginTop: 2,
    paddingLeft: 8,
    fontFamily: 'AvenirNext-Regular'
  },
  radio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 18
  },
  radioText: {
    fontFamily: 'AvenirNext-Regular',
    color: color.principal,
    fontSize: 16
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 14,
    backgroundColor: color.textBorderBottom,
    borderWidth: 2,
    borderColor: color.textBorderBottom
  },
  selected: {
    backgroundColor: color.green,
    borderColor: color.green
  }
})
