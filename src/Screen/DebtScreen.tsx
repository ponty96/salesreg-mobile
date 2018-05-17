import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import styles from './../Style/Screen';
import SettingsAtom from './../Atom/SettingsAtom';
import DebtLimitModal from './../Container/DebtLimitModal';
import DebtWarningModal from '../Container/DebtWarningModal';

interface IProps {

}

interface IState {

}

class DebtScreen extends Component<IProps, IState> {
    state = {
        limitModalVisibility: false,
        warningModalVisibility: false
    };

    static navigationOptions = ({ navigation }: any) => {
        return {
            title: 'Debt',
            headerLeft: <Icon
                        name={'md-arrow-back'}
                        style={styles.headerIcon}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
        };
    }

    renderLimitModal = () => {
        this.setState({
            limitModalVisibility: true
        });
    }

    renderWarningModal = () => {
        this.setState({
            warningModalVisibility: true
        });
    }

    closeLimitModal = () => {
        this.setState({
            limitModalVisibility: false
        });
    }

    closeWarningModal = () => {
        this.setState({
            warningModalVisibility: false
        });
    }

    render() {
        return (
            <View
                style={[styles.defaultPadding, styles.container]}
            >
                {this.state.limitModalVisibility
                    && <DebtLimitModal
                        visibility={this.state.limitModalVisibility}
                        closeModal={this.closeLimitModal}
                        placeholder={'0.00'}
                        headerText={'Total debt limit(N)'}
                    />
                }
                {this.state.warningModalVisibility
                    && <DebtWarningModal
                        visibility={this.state.warningModalVisibility}
                        closeModal={this.closeWarningModal}
                        currentAmount={2000}
                        debtLimit={66000}
                    />
                }
                <TouchableOpacity
                    onPress={() => this.renderLimitModal()}
                    activeOpacity={1}
                >
                    <SettingsAtom
                        item={{
                            name: 'Total debt limit',
                            child: 'The limit of the acceptable total amount of debt',
                            number: '20,000.00'
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.renderWarningModal()}
                    activeOpacity={1}
                >
                    <SettingsAtom
                        item={{
                            name: 'Debt warning level',
                            child: 'Set the level of total debt where you get a caution alert',
                            number: '0.00'
                        }}
                    />
                </TouchableOpacity>
                <SettingsAtom
                    rightIcon={true}
                    item={{
                        name: 'About debt limits',
                        child: 'See everything you need to know about debt limits'
                    }}
                />
            </View>
        );
    }
}

export default DebtScreen;