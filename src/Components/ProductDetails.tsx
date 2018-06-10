import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import ProductDetailAtom from '../Atom/ProductDetailAtom';
import { ScrollView } from 'react-native-gesture-handler';
// import ButtonAtom from '../Atom/ButtonAtom';

interface IProps {
  navigation: any;
}

interface IState {
  visibility: boolean;
}

class ProductDetails extends PureComponent<IProps, IState> {
  state = {
    visibility: false
  };

  create = () => {
    this.props.navigation.goBack();
  };

  openModal = () => {
    this.setState({
      visibility: true
    });
  };

  closeModal = () => {
    this.setState({
      visibility: false
    });
  };

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <ProductDetailAtom />
        </ScrollView>
      </View>
    );
  }
}

export default ProductDetails;

const styles = StyleSheet.create({
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  },
  foota: {
    height: 80,
    padding: 16
  },
  btnP: {
    alignSelf: 'flex-end'
  },
  txtP: {
    color: '#fff',
    fontSize: 16
  }
});
