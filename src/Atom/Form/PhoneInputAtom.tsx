import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import countries from '../../utilities/data/countries'
import InputAtom from './InputAtom'
import { color } from '../../Style/Color'

interface IProps {
  countryCode: string
  placeholder: string
  label?: string
  getValue: (defaultValuee: string) => void
  defaultValue: any
  error?: any
}

export default class PhoneInputAtom extends React.PureComponent<IProps> {
  render() {
    return (
      <View>
        <InputAtom
          label={this.props.label}
          placeholder="Eg 334343434"
          defaultValue={this.props.defaultValue}
          getValue={this.props.getValue}
          keyboardType="phone-pad"
          inlineElement={
            <View style={styles.callingCodeBox}>
              <Text style={styles.callingCodeText}>
                {this.getCallingCode()}
              </Text>
            </View>
          }
          error={this.props.error}
        />
      </View>
    )
  }

  getCallingCode = () => {
    const country = countries[this.props.countryCode]
    return country ? `+ ${country.callingCode}` : '-'
  }
}

const styles = StyleSheet.create({
  callingCodeBox: {
    paddingHorizontal: 16,
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: color.textBorderBottom,
    justifyContent: 'center',
    height: 20,
    top: 22
  },
  callingCodeText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'AvenirNext-Regular'
  }
})
