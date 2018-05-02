import React from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { Form, Header, Text, Left, Right, Icon, Card, CardItem } from "native-base";
import PropTypes from "prop-types";

import InputAtom from './InputAtom';
import { marginfulInput, marginlessInput } from './../Style/exportStyles';
import styles from './../Style/Form';

class OrderFormAtom extends React.Component {
    state = {
        product: "",
        customer: "",
        quantity: "",
        amountSold: "",
        amountPaid: "",
        balanceRem: "",
        balanceDueDate: "",
        purchaseDate: ""
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
                    <Card>
                    <Header style={styles.header}>
                        <Left style={{ flex: 1, width: "40%" }}><Text> Order ID: 123456 </Text></Left> 
                        <Right><Icon name="md-close"/></Right>
                    </Header>
                    <ScrollView>
                        <Form style={{ backgroundColor: "#fff" }}>
                            <InputAtom
                                label="Product name"
                                getValue={this.getProduct}
                                contStyle={marginfulInput}
                            />
                            <InputAtom
                                label="Customer who bought"
                                getValue={this.getCustomer}
                                contStyle={marginfulInput}
                            />
                            <View style={{flexDirection: "row", flex: 1}}>
                            <View style={{width: "49%"}}>
                            <InputAtom
                                label="Quantity"
                                getValue={this.getQuantity}
                                contStyle={marginfulInput}
                            />
                            </View>
                            <View style={{width: "49%"}}>
                            <InputAtom
                                label="Amount sold"
                                getValue={this.getAmountSold}
                                contStyle={marginfulInput}
                            />
                            </View>
                            </View>
                            <View style={{flexDirection: "row", flex: 1}}>
                            <View style={{width: "49%"}}>
                            <InputAtom
                                label="Amount paid"
                                getValue={this.getAmountPaid}
                                contStyle={marginfulInput}
                            />
                            </View>
                            <View style={{width: "49%"}}>
                            <InputAtom
                                label="Balance remaining"
                                getValue={this.getBalanceRem}
                                contStyle={marginfulInput}
                            />
                            </View>
                            </View>
                            <View style={{flexDirection: "row", flex: 1}}>
                            <View style={{flexDirection: "column", width: "49%"}}>
                            <InputAtom
                                label="Balance due date"
                                getValue={this.getBalanceDueDate}
                                contStyle={marginfulInput}
                            />
                            <Text style={styles.font}>DD-MM-YY</Text>
                            </View>
                            <View style={{flexDirection: "column", width: "49%" }}>
                            <InputAtom
                                label="Purchase date"
                                getValue={this.getPurchaseDate}
                                contStyle={marginfulInput}
                            />
                            <Text style={styles.font}>DD-MM-YY</Text>
                            </View>
                            </View>
                        </Form>
                    </ScrollView>
                    </Card>
                </KeyboardAvoidingView>
        );
    }
}

export default OrderFormAtom;