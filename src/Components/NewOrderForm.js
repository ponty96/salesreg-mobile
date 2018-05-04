import React from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import PropTypes from "prop-types";

import OrderFormAtom from '../Atom/OrderFormAtom';
import SaveCancelButton from "../Container/SaveCancelButton";
import {marginlessInput} from './../Style/exportStyles';
import styles from './../Style/OrderList';

class NewOrderForm extends React.Component {
    state = {
    }

    create = () => {
        this.props.navigation.goBack();
    }

    navigate = (location) => {
        this.props.navigation.navigate(location)
    }

    render() {
        return (
            <View style={styles.formViewContainer1}>
                <OrderFormAtom />
                <SaveCancelButton navigation={this.props.navigation} createfunc={this.create} positiveButtonName="SAVE" />
            </View>
        );
    }
}

export default NewOrderForm;