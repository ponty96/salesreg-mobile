import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import SaveButton from '../components/SaveButton';
import RequiredTextInput from '../components/RequiredTextInput';
import AddImage from '../components/AddImage';
import InputForText from '../components/InputForText';

export default class NewProductFormScreen extends Component {
  render() {
    return(
      <View style = {styles.screen}>
        <KeyboardAvoidingView behavior = 'position'>
          <AddImage pic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/120px-Portrait_Placeholder.png'
            label = 'Upload image'
          />
          <View style = {styles.wrapperForForm}>
            <View style = {styles.wrapperForProductName}>
              <RequiredTextInput  whatToInput = 'Product name' />
            </View>
            <View style = {styles.wrapperForQuantityAndCostPrice}>
              <View style = {styles.quantityWrapper}>
                <RequiredTextInput  whatToInput = 'Quantity' 
                  style = {styles.quantity}
                  keyboardType = 'numeric'
                  />
               </View>
              <View style = {styles.costPriceWrapper}>
                <RequiredTextInput  whatToInput = 'Total cost price'
                  keyboardType = 'numeric'
                />
              </View>
            </View>
          <View>
            <View style = {styles.wrapperForUnitCostPriceAndSellingPrice}>
              <View style = {styles.unitCostPriceWrapper}>
                <InputForText whatToInput = 'Unit cost price'
                  keyboardType = 'numeric'
                />
              </View>
              <View style = {styles.sellingPriceWrapper}>
                <RequiredTextInput whatToInput = 'Selling price'
                  keyboardType = 'numeric'
                />
              </View>
            </View>
          </View>
          <View style = {styles.wrapperForMinimumStockQuantity}>
            <InputForText whatToInput = 'Minimum stock quantity'
              keyboardType = 'numeric'
            />
          </View>
          </View>
          <View style = {styles.buttonsWrapper}>
              <View style = {styles.cancelButtonWrapper}>
                <SaveButton title = 'CANCEL' />
              </View>
              <View style = { styles.saveButtonWrapper }>
                <SaveButton title = 'SAVE' />
              </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wrapperForForm: {
    borderTop: 10
  },
  wrapperForProductName: {
      marginTop: 25,
      marginBottom: 15
  },
  wrapperForQuantityAndCostPrice: {
      flexDirection: 'row',
      marginBottom: 15
  },
  quantityWrapper: {
    flex: 1
  },
  costPriceWrapper: {
    flex: 1
  },
  wrapperForUnitCostPriceAndSellingPrice: {
    flexDirection: 'row',
    marginBottom: 15
  },
  unitCostPriceWrapper: {
    flex: 0.5
  },
  sellingPriceWrapper: {
    flex: 0.5
  },
  wrapperForMinimumStockQuantity: {
    marginBottom: 15
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  cancelButtonWrapper: {
    width: '50%'
  },
  saveButtonWrapper: {
    width: '50%'
  },
});