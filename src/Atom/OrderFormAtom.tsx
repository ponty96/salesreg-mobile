import * as React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Header, Text, Left, Right, Icon } from 'native-base';
import InputAtom from './InputAtom';
import NewOrderCardAtom from './NewOrderCardAtom';
import ButtonAtom from './ButtonAtom';
import styles from './../Style/Form';
import styles1 from '../Style/exportStyles';

interface IProps {
    navigation: any
}
interface IState {
    customer: string
    textInput: any
}

class OrderFormAtom extends React.Component<IProps, IState> {
    state: IState = {
        customer: '',
        textInput: []
    };

    getCustomer = (customer: string) => {
        this.setState({customer});
    }
    makePayment = () => {console.log(); };
    removeTextInput = () => {
        this.state.textInput.pop();
        let textInput = this.state.textInput;
        this.setState({
          textInput
        });
    }
    addTextInput = (key: any) => {
        let textInput = this.state.textInput;
        textInput.push(<NewOrderCardAtom key={key} onPress={this.removeTextInput}/>);
        this.setState({ textInput });
    }
    navigate = (location: string) => {
        this.props.navigation.navigate(location);
    }

    render() {
        return (
                <KeyboardAvoidingView behavior={'padding'} style={styles.itemsContainer1}>
                    <Header style={styles.headerOrder}>
                        <Left style={styles.leftOrder}><Icon style={styles.iconOrder} name='md-cart'/><Text>0</Text></Left>
                        <Right><Text>Total: <Text style={styles.redColorText}>#0.00</Text></Text></Right>
                    </Header>
                    <ScrollView>
                        <View style={styles.innerItemContainer}>
                            <View style={styles.cusName}>
                                <InputAtom
                                    label='Customer'
                                    getValue={this.getCustomer}
                                    contStyle={styles1.marginfulInput}
                                />
                            </View>
                            <NewOrderCardAtom onPress={this.makePayment}/>
                                {this.state.textInput.map((value: any) => {
                                return value;
                                })}
                                <ButtonAtom
                                onPress={() => this.addTextInput(this.state.textInput.length)}
                                btnText='+ Pay debt'
                                transparent={true}
                                btnStyle={styles.btn1}
                                textStyle={styles.txt1}
                                />
                        </View>
                    </ScrollView>
                    <View style={styles.bottomSide}>
                        <View style={styles.innerBottom}>
                            <Text style={styles.bottomGrey}>Amount paid</Text>
                            <Text style={styles.bottomRed}>#0.00</Text>
                        </View>
                        <ButtonAtom
                            onPress={this.makePayment}
                            btnText='Make Payment'
                            btnStyle={styles.btn2}
                            textStyle={styles.txt2}
                        />
                    </View>
                </KeyboardAvoidingView>
        );
    }
}

export default OrderFormAtom;