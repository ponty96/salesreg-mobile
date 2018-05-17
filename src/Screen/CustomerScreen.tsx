import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';

import styles from './../Style/Screen';
import FabAtom from './../Atom/FabAtom';
import CustomerList from './../Components/CustomerList';

interface IProps {
    navigation: any;
}

interface IState {

}

class CustomerScreen extends Component<IProps, IState> {

    static navigationOptions = ({ navigation }: any) => {
        const { params } = navigation.state;
        let right = <Icon
                        name={'ios-search'}
                        style={styles.headerIcon}
                    />;
        let left = (params && params.items && params.items.length > 0)
                    &&   <Icon
                            name={'menu'}
                            onPress={() => navigation.navigate('DrawerToggle')}
                            style={styles.headerIcon}
                        />;
        return {
            title: 'Kay5iveAttractions',
            headerRight: right,
            headerLeft: left
        };
    }

    render() {
        const { params } = this.props.navigation.state;
        const items = params.data.customers;

        return (
            <View style={ styles.centerContainer }>
                <CustomerList items={items}/>
                <FabAtom
                    routeName={'NewCustomer'}
                    name={'md-person-add'}
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}

export default CustomerScreen;