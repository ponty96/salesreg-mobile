import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Icon, Radio, StyleProvider} from 'native-base';

import ModalAtom from './../Atom/ModalAtom';
import InputAtom from '../Atom/InputAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from './../Style/Screen';
import styles1 from './../Style/exportStyles';
import getTheme from './../native-base-theme/components';
import material from './../native-base-theme/variables/material';
import styleLayout from "../Style/Layout";

class RestockModal extends Component {
    state = {
        quantity: undefined,
        cost: undefined,
        packs: false,
        units: true
    }

    static defaultProps = {
        visibility: false
    }

    getQuantity= (quantity) => {
        this.setState({quantity});
    }

    getCost= (cost) => {
        this.setState({cost});
    }

    save = () => {
        if (this.props.getValue) {
            this.props.getValue(this.state.quantity, this.state.cost);
        }
    }

    renderHeader = () => {
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
                    oonPress={() => this.props.closeModal()}
                >
                    <Icon
                        name={'md-close'}
                        style={styles.modalCloseIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    handleSelection = (value) => {
        if (value === 'units') {
            this.setState({units: true, packs: false})
        }

        if (value === 'packs') {
            this.setState({packs: true, units: false})
        }
    }

    renderBody = () => {
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
                        label="Quantity"
                        keyboardType={'numeric'}
                        getValue={this.getQuantity}
                        contStyle={styles1.marginlessInput}
                    />

                    <InputAtom
                        label="Cost price per pack"
                        keyboardType={'numeric'}
                        getValue={this.getCost}
                        contStyle={styles1.marginlessInput}
                    />

                    <ButtonAtom
                        btnText="Save"
                        onPress={this.save}
                        btnStyle={styles1.modalButton}
                    />
                </Form>
            </View>
            </StyleProvider>
        )
    }

    render() {
        return (
            <ModalAtom
                visible={this.props.visibility}
                body={this.renderBody()}
                header={this.renderHeader()}
            />
        );
    }
}

RestockModal.propTypes = {
    visibility: PropTypes.bool,
    headerText: PropTypes.string.isRequired,
    getValue: PropTypes.func,
    closeModal: PropTypes.func.isRequired
}

export default RestockModal;