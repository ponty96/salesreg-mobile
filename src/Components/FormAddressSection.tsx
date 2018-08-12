import React, { PureComponent } from 'react';
import FormContainerAtom from '../Atom/FormContainerAtom';
import InputAtom from '../Atom/InputAtom';
import FormContainerWrappedAtom from '../Atom/FormContainerWrappedAtom';
import PickerAtom from '../Atom/PickerAtom';

interface IProps {
  street1: string;
  city: string;
  state: string;
  country: string;
  getValue: (key: string, value: any) => void;
  fieldErrors: any;
}

export default class FormAddressSection extends PureComponent<IProps> {
  render() {
    const { fieldErrors } = this.props;
    return (
      <FormContainerAtom headerText="Address">
        <InputAtom
          label="* Street"
          defaultValue={this.props.street1}
          error={fieldErrors && fieldErrors['street1']}
          getValue={val => this.props.getValue('street1', val)}
        />
        <InputAtom
          label="* City"
          defaultValue={this.props.city}
          error={fieldErrors && fieldErrors['city']}
          getValue={val => this.props.getValue('city', val)}
        />
        <FormContainerWrappedAtom>
          <PickerAtom
            list={['Lagos']}
            placeholder="State"
            selected={this.props.state}
            handleSelection={state => this.props.getValue('state', state)}
          />
          <PickerAtom
            list={['Nigeria']}
            placeholder="Country"
            selected={this.props.country}
            handleSelection={country => this.props.getValue('country', country)}
          />
        </FormContainerWrappedAtom>
      </FormContainerAtom>
    );
  }
}
