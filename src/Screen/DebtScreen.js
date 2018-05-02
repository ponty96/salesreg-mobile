import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import styles from './../Style/Screen';
//import styles from './../Style/Layout';
import SettingsAtom from './../Atom/SettingsAtom';
import DebtLimitModal from './../Container/DebtLimitModal';
import DebtWarningModal from "../Container/DebtWarningModal";

class DebtScreen extends Component {
    state = {
        limitModalVisibility: false,
        warningModalVisibility: false
    };

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'Debt',
            headerLeft: <Icon
                        name={'md-arrow-back'}
                        style={screenStyles.headerIcon}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />,
        };
    };

    renderLimitModal = () => {
        this.setState({
            limitModalVisibility: !this.state.limitModalVisibility
        });
    }

    renderWarningModal = () => {
        this.setState({
            warningModalVisibility: !this.state.warningModalVisibility
        });
    }

    render() {
        return (
            <View
                style={[styles.defaultPadding, {backgroundColor: '#fff', flex: 1}]}
            >
                {this.state.limitModalVisibility
                    && <DebtLimitModal
                        visibility={this.state.limitModalVisibility}
                        headerText={"Total debt limit(N)"}
                    />
                }
                {this.state.warningModalVisibility
                    && <DebtWarningModal
                        visibility={this.state.warningModalVisibility}
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
        )
    }
}

export default DebtScreen;