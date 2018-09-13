import React, { PureComponent } from 'react';
import { Form, Icon } from 'native-base';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import InputAtom from '../Atom/InputAtom';
import PickerAtom from '../Atom/PickerAtom';
import { color } from '../Style/Color';

interface IProps {
  onPress: (formValue: any) => void;
  onUpdateState?: (key: string, val: any) => void;
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
  gender: string;
}

interface IState {}

class SigupForm extends PureComponent<IProps, IState> {
  render() {
    return (
      <Form>
        <InputAtom
          label="Full name"
          contStyle={styles.nameInput}
          defaultValue={this.props.name}
          getValue={val => this.props.onUpdateState('name', val)}
          inputStyle={styles.elevateInput}
          required={true}
        />

        <InputAtom
          label="Email Address"
          contStyle={styles.input}
          defaultValue={this.props.email}
          getValue={val => this.props.onUpdateState('email', val)}
          inputStyle={styles.elevateInput}
          required={true}
        />

        <View style={styles.pickerWrapper}>
          <PickerAtom
            list={['male', 'female']}
            style={styles.faintPicker}
            placeholder="*Gender"
            selected={this.props.gender}
            handleSelection={val => this.props.onUpdateState('gender', val)}
          />
        </View>
        <View style={styles.pickerUnderline} />

        <InputAtom
          label="Password"
          secureTextEntry={true}
          contStyle={styles.input}
          defaultValue={this.props.password}
          getValue={val => this.props.onUpdateState('password', val)}
          underneathText="Must be at least 6 characters"
          underneathStyle={styles.underneathText}
          inputStyle={styles.elevateInput}
          required={true}
        />

        <InputAtom
          label="Reenter-password"
          secureTextEntry={true}
          contStyle={styles.reenter}
          defaultValue={this.props.passwordConfirmation}
          getValue={val =>
            this.props.onUpdateState('passwordConfirmation', val)
          }
          inputStyle={styles.elevateInput}
          required={true}
        />

        <View>
          <TouchableOpacity
            style={styles.nextButtonContainer}
            onPress={() => this.props.onPress(this.state)}
          >
            <Text
              style={[
                styles.nextText,
                { fontFamily: 'SourceSansPro_Semibold' }
              ]}
            >
              NEXT{' '}
            </Text>
            <Icon
              name="trending-flat"
              type="MaterialIcons"
              style={styles.nextIcon}
            />
          </TouchableOpacity>
        </View>
      </Form>
    );
  }
}

export default SigupForm;

const styles = StyleSheet.create({
  nameInput: {
    marginLeft: 0,
    marginTop: 16
  },
  elevateInput: {
    marginBottom: 5
  },
  input: {
    marginLeft: 0,
    marginTop: 0
  },
  faintPicker: {
    height: 35
  },
  pickerWrapper: {
    marginTop: 16,
    width: '50%',
    opacity: 0.5,
    marginBottom: 5
  },
  pickerUnderline: {
    width: '50%',
    borderBottomColor: color.textBorderBottom,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  nextButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginVertical: 32
  },
  nextText: {
    color: color.button,
    fontSize: 16
  },
  nextIcon: {
    color: color.button
  },
  underneathText: {
    marginBottom: 0
  },
  reenter: {
    marginTop: 10,
    marginLeft: 0
  }
});
