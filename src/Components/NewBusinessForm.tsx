import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Form } from 'native-base';

import InputAtom from '../Atom/InputAtom';
import ImageAtom from '../Atom/ImageAtom';
import styles from './../Style/Layout';
import SaveCancelButton from '../Container/SaveCancelButton';
import styles1 from './../Style/exportStyles';

interface IProps {
    navigation: any;
    item?: any;
}

interface IState {
    address: string;
    name: string;
    email: string;
    about: string;
    image: string;
}

class NewBusinessForm extends PureComponent<IProps, IState> {
  state = {
    address: '',
    name: '',
    email: '',
    about: '',
    image: ''
  }

  create = () => {
    console.log(
      this.state.address,
      this.state.name,
      this.state.email,
      this.state.about,
      this.state.image
    );
    this.props.navigation.goBack()
  };

  getAddress = (address: any) => {
    this.setState({ address })
  };

  getEmail = (email: any) => {
    this.setState({ email })
  };

  getName = (name: any) => {
    this.setState({ name })
  };

  getAbout = (about: any) => {
    this.setState({ about })
  };

  getImage = (image: any) => {
    this.setState({ image })
  };

  navigate = (location: any) => {
    this.props.navigation.navigate(location)
  };

  render() {
    return (
      <View style={styles.formViewContainer}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={styles.itemsContainer}
        >
          <ScrollView>
            <Form style={styles.defaultPadding}>
              <ImageAtom
                getValue={this.getImage}
                source={this.props.item ? this.props.item.image : undefined}
              />

              <InputAtom
                label="Business name"
                getValue={this.getName}
                required={true}
                defaultValue={
                  this.props.item ? this.props.item.businessName : undefined
                }
                contStyle={styles1.marginlessInput}
              />

              <InputAtom
                label="Business address"
                getValue={this.getAddress}
                required={true}
                defaultValue={
                  this.props.item ? this.props.item.address : undefined
                }
                contStyle={styles1.marginlessInput}
              />

              <InputAtom
                label="Email"
                getValue={this.getEmail}
                defaultValue={
                  this.props.item ? this.props.item.email : undefined
                }
                contStyle={styles1.marginlessInput}
              />

              <InputAtom
                label="About(give description of your business)"
                getValue={this.getAbout}
                contStyle={styles1.marginlessInput}
                defaultValue={
                  this.props.item ? this.props.item.description : undefined
                }
              />
            </Form>
          </ScrollView>
        </KeyboardAvoidingView>
        <SaveCancelButton
          navigation={this.props.navigation}
          createfunc={this.create}
          positiveButtonName={this.props.item ? 'SAVE' : 'CREATE'}
        />
      </View>
    )
  }
}

export default NewBusinessForm
