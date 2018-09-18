import React from 'react'
import PickerAtom from '../PickerAtom'
import countries from '../../utilities/data/countries'

interface IProps {
  countryCode: string
  placeholder: string
  label?: string
  handleSelection: (value: any) => void
}

export default class CountryPicker extends React.PureComponent<IProps> {
  render() {
    return (
      <PickerAtom
        selected={this.props.countryCode}
        label={this.props.label}
        required={true}
        list={this.parseCountries()}
        handleSelection={this.props.handleSelection}
        placeholder={this.props.placeholder || 'What country are you in?'}
      />
    )
  }

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
}
