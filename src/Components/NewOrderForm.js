import React from "react";
import { View, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Form, Text } from "native-base";
import PropTypes from "prop-types";

import OrderFormAtom from '../Atom/OrderFormAtom';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import SaveCancelButton from "../Container/SaveCancelButton";
import {marginlessInput} from './../Style/exportStyles';

class NewOrderForm extends React.Component {
    state = {
        product: undefined,
        customer: undefined,
        quantity: undefined,
        amountSold: undefined,
        amountPaid: undefined,
        balanceRem: undefined,
        balanceDueDate: undefined,
        purchaseDate: undefined
    }

    create = () => {
        console.log(
            this.state.product, this.state.customer,
            this.state.quantity, this.state.amountSold,
            this.state.amountPaid, this.state.balanceRem, this.state.balanceDueDate, this.state.purchaseDate
        );
        this.props.navigation.goBack();
    }

    getProduct = (product) => {
        this.setState({product});
    }
    getCustomer = (customer) => {
        this.setState({customer});
    }
    getQuantity = (quantity) => {
        this.setState({quantity});
    }
    getAmountSold = (amountSold) => {
        this.setState({amountSold});
    }
    getAmountPaid = (amountPaid) => {
        this.setState({amountPaid});
    }
    getBalanceRem = (balanceRem) => {
        this.setState({balanceRem});
    }
    getBalanceDueDate = (balanceDueDate) => {
        this.setState({balanceDueDate});
    }
    getPurchaseDate = (purchaseDate) => {
        this.setState({purchaseDate});
    }

    navigate = (location) => {
        this.props.navigation.navigate(location)
    }

    render() {
        return (
            <View style={styles.formViewContainer}>
                <OrderFormAtom />
                <ButtonAtom
                    btnText="+Add another order"
                    transparent={true}
                />
                <SaveCancelButton navigation={this.props.navigation} createfunc={this.create} positiveButtonName="SAVE" />
            </View>
        );
    }
}

export default NewOrderForm;

const styles = StyleSheet.create({
    formViewContainer: {
        flex: 1,
        backgroundColor: "#F0F0F0"
    },
    newOrder: {
        flex: 1,
        justifyContent: "flex-end",
        height: 75,
        marginBottom: 0
    }
});