import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { List, ListItem, Icon } from 'native-base';

import FabAtom from './../Atom/FabAtom';
import styles from './../Style/Screen';
import DeleteModal from './../Container/DeleteBuzModal';
import GetAmountModal from './../Container/GetAmountModal';
import DebtLimitModal from './../Container/DebtLimitModal';
import WarningModal from './../Container/WarningModal';
import DebtWarningModal from "../Container/DebtWarningModal";

class BusinessListScreen extends Component {
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
                <ListItem
                    onPress={() => this.props.navigation.navigate('ViewBusiness',
                        {
                            name: 'Kay5iveAttractions',
                            id: 'ID here for getting data at the new scrren'
                        }
                    )
                    }
                >
                    <Text>Views</Text>
                </ListItem>
            </List>
        );
    }

    render() {
        // do change the list to the appropriate molecule

        //<DeleteModal
            //visibility={true}
            //headerText={'Delete Kay5Attractions'}
        ///>

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
        return (
            <View style={ styles.plainContainer }>
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
                    this.props.items.length > 0
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