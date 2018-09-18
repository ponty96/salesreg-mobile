import React from 'react'
import { View } from 'react-native'
import PickerAtom from '../PickerAtom'
import countries from '../../utilities/data/countries'

interface IProps {
  countryCode: string
  placeholder: string
  label?: string
  handleSelection: (value: any) => void
}

interface IState {
  countryCode: string
  callingCode: string
}
export default class CountryPicker extends React.PureComponent<IProps, IState> {
  state = {
    countryCode: '',
    callingCode: ''
  }
  render() {
    return (
      <View>
        <PickerAtom
          selected={this.props.countryCode}
          label={this.props.label}
          required={true}
          list={this.parseCountries()}
          handleSelection={this.countrySelection}
          placeholder={this.props.placeholder || 'What country are you in?'}
        />
      </View>
    )
  }
  b

  parseCountries = () => {
    return Object.keys(countries).map(key => {
      const country = countries[key]
      return {
        icon: country.flag,
        mainLabel: country.name.common,
        value: key,
        subLabel: `+ ${country.callingCode || ''}`
      }
    })
  }
  countrySelection = value => {
    this.props.handleSelection(value)
  }
}
