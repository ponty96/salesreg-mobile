import React from "react";
import { View, KeyboardAvoidingView, ScrollView} from "react-native";
import { Form, Header, Text } from "native-base";
import PropTypes from "prop-types";

import InputAtom from '../Atom/InputAtom';
import styles from './../Style/Layout'
import {marginlessInput} from './../Style/exportStyles';

class OrderFormAtom extends React.Component {
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
                <KeyboardAvoidingView behavior={'padding'} style={styles.itemsContainer}>
                    <ScrollView>
                        <Header />
                        <Form style={styles.defaultPadding}>
                            <InputAtom
                                label="Product name"
                                getValue={this.getProduct}
                                required={true}
                                contStyle={marginlessInput}
                            />

                            <InputAtom
                                label="Customer who bought"
                                getValue={this.getCustomer}
                                required={true}
                                contStyle={marginlessInput}
                            />
                            <View style={{flexDirection: "row", flex: 1}}>
                            <InputAtom
                                label="Quantity"
                                getValue={this.getQuantity}
                                contStyle={marginlessInput}
                            />

                            <InputAtom
                                label="Amount sold"
                                getValue={this.getAmountSold}
                                contStyle={marginlessInput}
                            />
                            </View>
                            <View style={{flexDirection: "row", flex: 1}}>
                            <InputAtom
                                label="Amount paid"
                                getValue={this.getAmountPaid}
                                contStyle={marginlessInput}
                            />

                            <InputAtom
                                label="Balance remaining"
                                getValue={this.getBalanceRem}
                                contStyle={marginlessInput}
                            />
                            </View>
                            <View style={{flexDirection: "row", flex: 1}}>
                            <View style={{flexDirection: "column"}}>
                            <InputAtom
                                label="Balance due date"
                                getValue={this.getBalanceDueDate}
                                contStyle={marginlessInput}
                            />
                            <Text>DD-MM-YY</Text>
                            </View>
                            <View style={{flexDirection: "column"}}>
                            <InputAtom
                                label="Purchase date"
                                getValue={this.getPurchaseDate}
                                contStyle={marginlessInput}
                            />
                            <Text>DD-MM-YY</Text>
                            </View>
                            </View>
                        </Form>
                    </ScrollView>
                </KeyboardAvoidingView>
        );
    }
}

OrderFormAtom.propTypes = {
    navigation: PropTypes.object.isRequired
}

export default OrderFormAtom;

const n = StyleSheet.create({
    row: {

    },
    font: {
        
    }
});