import React from "react";
import { View, KeyboardAvoidingView, ScrollView} from "react-native";
import { Form } from "native-base";
import PropTypes from "prop-types";

import InputAtom from '../Atom/InputAtom';
import ImageAtom from '../Atom/ImageAtom';
import styles from './../Style/Layout'
<<<<<<< HEAD
import SaveCancelButton from "../Container/SaveCancelButton";
=======
import SaveCancelButton from "../Container/SaveCancleButton";
>>>>>>> d7b2b7fc99bf6b9c83679e5059527c970638f88d
import {marginlessInput} from './../Style/exportStyles';

class NewBusinessForm extends React.Component {
    state = {
        address: undefined,
        name: undefined,
        email: undefined,
        about: undefined,
        image: undefined
    }

    create = () => {
        console.log(
            this.state.address, this.state.name,
            this.state.email, this.state.about,
            this.state.image
        );
        this.props.navigation.goBack();
    }

    getAddress = (address) => {
        this.setState({address});
    }

    getEmail = (email) => {
        this.setState({email});
    }

    getName = (name) => {
        this.setState({name});
    }

    getAbout = (about) => {
        this.setState({about});
    }

    getImage = (image) => {
        this.setState({image});
    }

    navigate = (location) => {
        this.props.navigation.navigate(location)
    }

    render() {
        return (
            <View style={styles.formViewContainer}>
                <KeyboardAvoidingView behavior={'padding'} style={styles.itemsContainer}>
                    <ScrollView>
                        <Form style={styles.defaultPadding}>
                            <ImageAtom
                                getValue={this.getImage}
                            />

                            <InputAtom
                                label="Business name"
                                getValue={this.getName}
                                required={true}
                                contStyle={marginlessInput}
                            />

                            <InputAtom
                                label="Business address"
                                getValue={this.getAddress}
                                required={true}
                                contStyle={marginlessInput}
                            />

                            <InputAtom
                                label="Email"
                                getValue={this.getEmail}
                                contStyle={marginlessInput}
                            />

                            <InputAtom
                                label="About(give description of your business)"
                                getValue={this.getAbout}
                                contStyle={marginlessInput}
                            />

                        </Form>
                    </ScrollView>
                </KeyboardAvoidingView>
<<<<<<< HEAD
                <SaveCancelButton navigation={this.props.navigation} createfunc={this.create} feature="CREATE" />
=======
                <SaveCancelButton navigation={this.props.navigation} createfunc={this.create}/>
>>>>>>> d7b2b7fc99bf6b9c83679e5059527c970638f88d
            </View>
        );
    }
}

NewBusinessForm.propTypes = {
    navigation: PropTypes.object.isRequired
}

export default NewBusinessForm;