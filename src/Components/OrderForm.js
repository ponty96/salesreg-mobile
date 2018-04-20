import React from "react";
import { View, KeyboardAvoidingView, ScrollView} from "react-native";
import { Form } from "native-base";
import PropTypes from "prop-types";

import OrderFormAtom from '../Atom/OrderFormAtom';
import InputAtom from '../Atom/InputAtom';
//import styles from './../Style/Layout'
import SaveCancelButton from "../Container/SaveCancelButton";
import {marginlessInput} from './../Style/exportStyles';

class OrderForm extends React.Component {
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
                <SaveCancelButton navigation={this.props.navigation} createfunc={this.create} feature="SAVE" />
            </View>
        );
    }
}

export default OrderForm;

const styles = StyleSheet.create({
    formViewContainer: {
        flex: 1,
        backgroundColor: "#fff"
    }
});