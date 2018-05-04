import React from 'react';
import { View, Text } from 'react-native';
import ProductDetailAtom from '../Atom/ProductDetailAtom';

import SaveCancelButton from '../Container/SaveCancelButton';
import { ScrollView } from "react-native-gesture-handler";
import ButtonAtom from '../Atom/ButtonAtom';
import styles from "../Style/OrderList";

export default class ProductDetails extends React.Component {

    create = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.ababa}>
                <ScrollView>
                    <ProductDetailAtom />
                </ScrollView>
                <View style={styles.foota}>
                    <ButtonAtom 
                        btnText="Re-stock"
                        btnStyle={styles.btnP}
                        textStyle={styles.txtP} 
                    />
                </View>
            </View>
        );
    }
}