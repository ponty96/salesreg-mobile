import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { List, Icon } from 'native-base';

import FabAtom from './../Atom/FabAtom';
import styles from './../Style/Screen';
import ListItemAtom from './../Atom/ListItemAtom';
import DeleteModal from './../Container/DeleteBuzModal';
import GetAmountModal from './../Container/GetAmountModal';
import DebtLimitModal from './../Container/DebtLimitModal';
import WarningModal from './../Container/WarningModal';
import DebtWarningModal from "../Container/DebtWarningModal";

class BusinessListScreen extends Component {
    state = {
        modalVisibility: false
    }

    static defaultProps = {
        items: ['a', 'b'],
        auth: 'Sme'
    }

    static navigationOptions = ({ navigation }) => {
        let itemsLength = 2;
        let right = (itemsLength > 0)
                    ?   <Icon
                            name={'ios-search'}
                            style={styles.headerIcon}
                        />
                    :   <View style={styles.headerItem}>
                            <Icon
                                name={'logout'}
                                style={styles.headerIconLogout}
                                type={'MaterialCommunityIcons'}
                            />
                            <Text style={styles.headerText}>Logout</Text>
                        </View>;
        let left = (itemsLength > 0) && <Icon
                            name={'menu'}
                            onPress={() => navigation.navigate('DrawerToggle')}
                            style={styles.headerIcon}
                        />;
        return {
            title: 'Ayo',
            headerRight: right,
            headerLeft: left
        };
    };

    handleNavigation = () => {
        this.props.navigation.navigate('ViewBusiness');
    }

    handleDelete = (value) => {
        console.log(value);
        this.setState({
            modalVisibility: false
        });
    }

    openModal = () => {
        this.setState({
            modalVisibility: true
        });
    }

    closeModal = () => {
        this.setState({
            modalVisibility: false
        });
    }

    renderEmpty = () => {
        return (
            <View style={ styles.emptyHolder }>
                <Text style={styles.emptyHeader}>
                    {`Welcome ${this.props.auth}!`}
                </Text>
                <Text>
                    You have no business yet. Press the&nbsp;
                <Text style={styles.redText}>
                    red round button&nbsp;
                </Text>
                    below, to add your businesses.
                </Text>
            </View>
        );
    }

    renderList = () => {
        return (
            <List>
                <ListItemAtom
                    item={
                        {
                            name: 'kay5',
                        }
                    }
                    type={'business'}
                    bodyfunction={this.handleNavigation}
                    rightIconFunc={this.openModal}
                />
            </List>
        );
    }

    render() {
        // do change the list to the appropriate molecule

        //adding to wallet and paying of deb can use GetAmount
        //<GetAmountModal
            //visibility={true}
            //headerText={"Salomy's debt"}
        ///>

        //customer and business debit limit can use the below modal
        //<WarningModal
        //    visibility={true}
        //    type={'business'}
        //    name={'Salomy'}
        //    limit={7000}
        ///>

        //<DebtLimitModal
            //visibility={true}
            //headerText={"Total debt limit(N)"}
        ///>


        //<DebtWarningModal
        //    visibility={true}
        //    currentAmount={2000}
        //    debtLimit={66000}
        ///>

        let empty = this.props.items.length <= 0;
        return (
            <View style={[styles.plainContainer]}>
                {this.state.modalVisibility && <DeleteModal
                    visibility={this.state.modalVisibility}
                    closeModal={this.closeModal}
                    getValue={this.handleDelete}
                    headerText={'Delete Kay5Attractions'}
                />}
                <FabAtom
                    routeName={'NewBusiness'}
                    name={'md-add'}
                    params={
                        {
                            itemsLength: this.props.items.length
                        }
                    }
                    navigation={this.props.navigation}
                />
                {
                    empty
                    ? this.renderEmpty()
                    : this.renderList()
                }
            </View>
        )
    }
}

BusinessListScreen.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    authName: PropTypes.string
}

export default BusinessListScreen