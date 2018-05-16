import React from "react";
import { View, KeyboardAvoidingView, ScrollView} from "react-native";
import { Form } from "native-base";
import PropTypes from "prop-types";

import InputAtom from '../Atom/InputAtom';
import ImageAtom from '../Atom/ImageAtom';
import styles from './../Style/Layout'
import SaveCancelButton from "../Container/SaveCancelButton";
import styles1 from './../Style/exportStyles';

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
                                source={this.props.item ? this.props.item.image : undefined}
                            />

                            <InputAtom
                                label="Business name"
                                getValue={this.getName}
                                required={true}
                                defaultValue={this.props.item ? this.props.item.businessName : undefined}
                                contStyle={styles1.marginlessInput}
                            />

                            <InputAtom
                                label="Business address"
                                getValue={this.getAddress}
                                required={true}
                                defaultValue={this.props.item ? this.props.item.address : undefined}
                                contStyle={styles1.marginlessInput}
                            />

                            <InputAtom
                                label="Email"
                                getValue={this.getEmail}
                                defaultValue={this.props.item ? this.props.item.email : undefined}
                                contStyle={styles1.marginlessInput}
                            />

                            <InputAtom
                                label="About(give description of your business)"
                                getValue={this.getAbout}
                                contStyle={styles1.marginlessInput}
                                defaultValue={this.props.item ? this.props.item.description : undefined}
                            />

                        </Form>
                    </ScrollView>
                </KeyboardAvoidingView>
                <SaveCancelButton
                    navigation={this.props.navigation}
                    createfunc={this.create}
                    positiveButtonName= {this.props.item ? 'SAVE' : 'CREATE'}
                />
            </View>
        );
    }
}

NewBusinessForm.propTypes = {
    navigation: PropTypes.object.isRequired,
    item: PropTypes.object
}

export default NewBusinessForm;