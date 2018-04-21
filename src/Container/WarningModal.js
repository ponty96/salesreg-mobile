import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Icon} from 'native-base';

import ModalAtom from './../Atom/ModalAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from './../Style/Screen';
import { modalWarningButton } from './../Style/exportStyles';

class DebtLimit extends Component {
    state = {
        visibility: this.props.visibility
    }

    static defaultProps = {
        visibility: false
    }

    grant = () => {
        console.log('grant is pressed');
    }

    stop = () => {
        console.log('stop is pressed');
    }

    renderHeader = () => {
        return (
            <View
                style={styles.modalHeader}
            >
                <Icon
                    name={'md-warning'}
                    style={styles.modalWarningIcon}
                />
                <Text
                    style={styles.modalHeaderText}
                >
                    {(this.props.type === 'customer') && 'Customer debt limit warning'}
                    {(this.props.type === 'business') && 'Total debt limit warning'}
                </Text>
                <TouchableOpacity
                    onPress={() => this.setState({visibility: !this.state.visibility})}
                >
                    <Icon
                        name={'md-close'}
                        style={styles.modalCloseIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderBody = () => {
        return (
            <View
                style={styles.modalWarningBody}
            >
                <View
                    style={{paddingHorizontal: 16}}
                >
                    {(this.props.type === 'customer') &&
                        <Text>
                            {this.props.name} has reached her debt limit of N
                            <Text
                                style={styles.redText}
                            >
                                {this.props.limit}
                            </Text>.
                            Do you want to continue granting debt to her?
                        </Text>
                    }
                    {(this.props.type === 'business') &&
                        <Text>
                            {this.props.name} has reached a credit limit of N
                            <Text
                                style={styles.redText}
                            >
                                {this.props.limit}
                            </Text>.
                            Do you want to continue granting debt to customers?
                        </Text>
                    }
                </View>
                <Form
                    style={styles.modalButtonContainer}
                >
                    <ButtonAtom
                        btnText="Grant debt"
                        transparent={true}
                        btnStyle={modalWarningButton}
                        onPress={this.grant}
                    />

                    <ButtonAtom
                        btnText="Stop debt"
                        onPress={this.stop}
                        btnStyle={modalWarningButton}
                    />
                </Form>
            </View>
        )
    }

    renderFooter = () => {
        return (
            <View
                style={styles.modalHeader}
            >
                {(this.props.type === 'customer') &&
                    <Icon
                        name={'info'}
                        style={styles.modalCloseIcon}
                        type={'Entypo'}
                    />
                }
                <Text
                    style={
                        [
                            styles.modalHeaderText,
                            (this.props.type === 'business') && styles.modalBusinessFooter
                        ]
                    }
                >
                    {(this.props.type === 'customer') &&
                        <Text>
                            {this.props.name}'s debt will appear in&nbsp;
                            <Text
                                style={styles.redText}
                            >
                                red
                            </Text>
                            &nbsp;until her debt falls below&nbsp;
                            <Text
                                style={styles.redText}
                            >
                                N{this.props.limit}.
                            </Text>
                        </Text>
                    }
                    {(this.props.type === 'business') &&
                        <Text>
                            Total debt will appear in&nbsp;
                            <Text
                                style={styles.redText}
                            >
                                red
                            </Text>
                            &nbsp;until the debt falls below &nbsp;
                            <Text
                                style={styles.redText}
                            >
                                N{this.props.limit}.
                            </Text>
                        </Text>
                    }
                </Text>
            </View>
        );
    }

    render() {
        return (
            <ModalAtom
                visible={this.state.visibility}
                body={this.renderBody()}
                header={this.renderHeader()}
                footer={this.renderFooter()}
            />
        );
    }
}

DebtLimit.propTypes = {
    visibility: PropTypes.bool,
    type: PropTypes.oneOf(['customer', 'business']).isRequired,
    getValue: PropTypes.func,
    name: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired
}

export default DebtLimit;