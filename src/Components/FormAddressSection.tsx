import React, { PureComponent } from 'react'
import { View } from 'react-native'
import FormContainerAtom from '../Atom/FormContainerAtom'
import InputAtom from '../Atom/InputAtom'
import FormContainerWrappedAtom from '../Atom/FormContainerWrappedAtom'
import PickerAtom from '../Atom/PickerAtom'
import FormErrorTextAtom from '../Atom/FormErrorTextAtom'

interface IProps {
  street1: string
  city: string
  state: string
  country: string
  getValue: (key: string, value: any) => void
  fieldErrors: any
}

export default class FormAddressSection extends PureComponent<IProps> {
  render() {
    const { fieldErrors } = this.props
    return (
      <FormContainerAtom headerText="Address">
        <InputAtom
          label="Street"
          required={true}
          defaultValue={this.props.street1}
          error={fieldErrors && fieldErrors.street1}
          getValue={val => this.props.getValue('street1', val)}
          placeholder="e.g E close, 401 Road"
        />
        <InputAtom
          label="City"
          defaultValue={this.props.city}
          required={true}
          error={fieldErrors && fieldErrors.city}
          getValue={val => this.props.getValue('city', val)}
          placeholder="e.g Festac"
        />
        <FormContainerWrappedAtom>
          <View>
            <PickerAtom
              list={['Lagos']}
              placeholder="e.g Lagos"
              selected={this.props.state}
              handleSelection={state => this.props.getValue('state', state)}
              label="State"
            />
            {fieldErrors &&
              fieldErrors.state && (
                <FormErrorTextAtom errorText={fieldErrors.state} />
              )}
          </View>
          <View>
            <PickerAtom
              list={['Nigeria']}
              placeholder="e.g Nigeria"
              selected={this.props.country}
              required={true}
              handleSelection={country =>
                this.props.getValue('country', country)
              }
              label="Country"
            />
            {fieldErrors &&
              fieldErrors.country && (
                <FormErrorTextAtom errorText={fieldErrors.country} />
              )}
          </View>
        </FormContainerWrappedAtom>
      </FormContainerAtom>
    )
  }
}
