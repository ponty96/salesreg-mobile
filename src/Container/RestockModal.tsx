import {Form, Icon, Radio, StyleProvider} from 'native-base';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ButtonAtom from '../Atom/ButtonAtom';
import InputAtom from '../Atom/InputAtom';
import styleLayout from '../Style/Layout';
import ModalAtom from './../Atom/ModalAtom';
import getTheme from './../native-base-theme/components';
import material from './../native-base-theme/variables/material';
import { marginlessInput, modalButton } from './../Style/exportStyles';
import styles from './../Style/Screen';

interface IRestockModalProps {
    getValue: (a: any, b: any) => void;
    closeModal: () => void;
    headerText: string;
    amount: string;
    placeholder: string;
    visibility: boolean;
}
interface IRestockModalState {
    packs: boolean;
    units: boolean;
    cost: any;
    quantity: any;
}

class RestockModal extends Component<IRestockModalProps, IRestockModalState> {
    public static defaultProps = {
        closeModal: PropTypes.func.isRequired,
        getValue: PropTypes.func,
        headerText: PropTypes.string.isRequired,
        visibility: false
    };
    public state = {
        cost: 0,
        packs: false,
        quantity: 0,
        units: true
    };

    public getQuantity = (quantity: number) => {
        this.setState({quantity});
    }

    public getCost = (cost: number) => {
        this.setState({cost});
    }

    public save = () => {
        if (this.props.getValue) {
            this.props.getValue(this.state.quantity, this.state.cost);
        }
    }

    public renderHeader = () => {
        return (
            <View
                style={styles.modalHeader}
            >
                <Text
                    style={styles.modalHeaderText}
                >
                    {this.props.headerText}
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.closeModal()}
                >
                    <Icon
                        name={'md-close'}
                        style={styles.modalCloseIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    public handleSelection = (value: string) => {
        if (value === 'units') {
            this.setState({units: true, packs: false});
        }

        if (value === 'packs') {
            this.setState({packs: true, units: false});
        }
    }

    public renderBody = () => {
        return (
            <StyleProvider style={getTheme(material)}>
            <View
                style={styles.modalBody}
            >
                <Form>
                    <View
                        style={styleLayout.rowD}
                    >
                        <Text>Enter quantity</Text>
                        <View
                            style={styleLayout.rowD}
                        >
                            <Radio
                                selected={this.state.units}
                                onPress={() => this.handleSelection('units')}
                                activeOpacity={1}
                                style={styleLayout.radioMarginRight}
                            />
                            <Text>In units</Text>
                        </View>
                        <View
                            style={styleLayout.rowD}
                        >
                            <Radio
                                selected={this.state.packs}
                                onPress={() => this.handleSelection('packs')}
                                style={styleLayout.radioMarginRight}
                                activeOpacity={1}
                            />
                            <Text>In packs</Text>
                        </View>
                    </View>
                    <InputAtom
                        label='Quantity'
                        keyboardType={'numeric'}
                        getValue={this.getQuantity}
                        contStyle={marginlessInput}
                    />

                    <InputAtom
                        label='Cost price per pack'
                        keyboardType={'numeric'}
                        getValue={this.getCost}
                        contStyle={marginlessInput}
                    />

                    <ButtonAtom
                        btnText='Save'
                        transparent={false}
                        disabled={false}
                        funcValue=''
                        textStyle={false}
                        onPress={this.save}
                        btnStyle={modalButton}
                    />
                </Form>
            </View>
            </StyleProvider>
        );
    }

    public render() {
        return (
            <ModalAtom
                visible={this.props.visibility}
                body={this.renderBody()}
                header={this.renderHeader()}
            />
        );
    }
}

export default RestockModal;
