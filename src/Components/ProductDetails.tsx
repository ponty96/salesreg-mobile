import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ProductDetailAtom from '../Atom/ProductDetailAtom';

import { ScrollView } from 'react-native-gesture-handler';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from '../Style/OrderList';

interface IProps {
    navigation: any;
}

interface IState {

}

class ProductDetails extends PureComponent<IProps, IState> {
  create = () => {
    this.props.navigation.goBack()
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
    )
  }
}

export default ProductDetails;