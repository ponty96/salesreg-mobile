import * as React from 'react'
import { Item, Label } from 'native-base'
import { View, StyleSheet } from 'react-native'

import { RegularText, DemiBoldText } from '../TextAtom'
import { color } from '../../Style/Color'
import RadioAtom from '../RadioAtom'

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

export default class RadioButtonAtom extends React.PureComponent<IProps> {
  render() {
    return (
      <View>
        <Item
          stackedLabel={true}
          style={[
            {
              marginTop: 24,
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
            {this.props.required && (
              <RegularText style={styles.required}>*</RegularText>
            )}
            <DemiBoldText style={styles.labelText}>
              {this.props.label}
            </DemiBoldText>
          </Label>
          <View style={{ width: '100%' }}>
            {this.props.options.map((option, index: number) => [
              <RadioAtom
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
        <RegularText
          style={[
            styles.underneathText,
            this.props.underneathStyle,
            {
              color: this.props.error ? 'red' : color.principal
            }
          ]}
        >
          {this.props.error || this.props.underneathText}
        </RegularText>
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
    fontSize: 14,
    marginBottom: 0,
    marginTop: 2,
    paddingVertical: 12
  }
})
