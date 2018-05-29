import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import ProductDetailAtom from '../Atom/ProductDetailAtom';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonAtom from '../Atom/ButtonAtom';
import RestockModal from './../Container/RestockModal';

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
        {this.state.visibility && (
          <RestockModal
            visibility={this.state.visibility}
            closeModal={this.closeModal}
            headerText={'Re-stock No.5 Channel perfume'}
          />
        )}
        <ScrollView>
          <ProductDetailAtom />
        </ScrollView>
        <View style={styles.foota}>
          <ButtonAtom
            btnText="Re-stock"
            btnStyle={styles.btnP}
            textStyle={styles.txtP}
            onPress={this.openModal}
          />
        </View>
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
