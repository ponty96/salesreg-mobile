import React, { PureComponent } from 'react';
import { Form } from 'native-base';
import { View, Text } from 'react-native';

import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from '../Style/Form';
import styles1 from '../Style/exportStyles';
import ImageAtom from '../Atom/ImageAtom';

interface IProps {
  navigation: any;
}

interface IState {
  image: string;
  password: string;
  name: string;
  confirm_password: string;
  gender: string;
}

class SigupForm2 extends PureComponent<IProps, IState> {
  state = {
    image: '',
    password: '',
    name: '',
    confirm_password: '',
    gender: ''
  };

  signup = () => {
    console.log(
      this.state.image,
      this.state.password,
      this.state.name,
      this.state.confirm_password,
      this.state.gender
    );
  };

  getImage = (pic: any) => {
    this.setState({ image: pic });
  };

  getPassword = (pass: string) => {
    this.setState({
      password: pass
    });
  };

  getName = (name: string) => {
    this.setState({
      name
    });
  };

  getConfirm = (confirmPass: string) => {
    this.setState({
      confirm_password: confirmPass
    });
  };

  updateGender = (selectedGender: string) => {
    this.setState({
      gender: selectedGender
    });
  };

  navigate = (location: string) => {
    this.props.navigation.navigate(location);
  };

  render() {
    return (
      <Form>
        <ImageAtom
          getValue={this.getImage}
          source={this.state.image}
          placeholder=""
          imgStyle={styles.imgContainer}
        />
        <InputAtom
          label="Business Name"
          getValue={this.getName}
          contStyle={styles1.marginlessInput}
        />

        <InputAtom
          label="Business Address"
          getValue={this.getName}
          contStyle={styles1.marginlessInput}
        />

        <InputAtom
          label="Email"
          getValue={this.getName}
          keyboardType="email-address"
          contStyle={styles1.marginlessInput}
        />

        <InputAtom
          label="About (Give a description of your business)"
          getValue={this.getName}
          contStyle={styles1.marginlessInput}
        />

        <View style={styles.buttonsWrapper}>
          <ButtonAtom
            btnText="SIGN UP"
            onPress={this.signup}
            btnStyle={styles.fullWidth}
            textStyle={styles.longButtonCenteredText}
          />
          <Text>
            Signing up means you agree with out <Text>Terms</Text> &{' '}
            <Text>Privacy Policy</Text>
          </Text>
          <Text>Or do you have an account? </Text>
          <ButtonAtom
            btnText="I have an account already"
            transparent={true}
            funcValue={'Login'}
            onPress={this.navigate}
          />
        </View>
      </Form>
    );
  }
}

export default SigupForm2;
