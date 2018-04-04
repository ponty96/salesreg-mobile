import React, { Component } from 'react'
import { View } from 'react-native'
import { Icon } from 'native-base'

import FabAtom from './../Atom/FabAtom'
import styles from './../Style/Screen'
import { color } from './../Style/Color'
import ProductList from './../Components/ProductList'

class ProductScreen extends Component {

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        let right = <Icon
                        name={'ios-search'}
                        style={styles.headerIcon}
                    />
        let left = (params && params.items && params.items.length > 0)
                    ?   <Icon
                            name={'menu'}
                            onPress={() => navigation.navigate('DrawerToggle')}
                            style={styles.headerIcon}
                        />
                    :   null;
        return {
            title: 'Kay5iveAttractions',
            headerRight: right,
            headerLeft: left
        };
    };

    render() {
        // do change the list to the appropriate molecule
        return (
            <View style={ styles.centerContainer }>
                <FabAtom
                    routeName={'NewBusiness'}
                    name={'basket-fill'}
                    type={'MaterialCommunityIcons'}
                    navigation={this.props.navigation}
                />
                <ProductList />
            </View>
        )
    }
}

export default ProductScreen