import React, { Component } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import { textStyles } from '../Style/TextStyles'
import FormContainerAtom from '../Atom/FormContainerAtom'
import InputAtom from '../Atom/InputAtom'
import { color } from '../Style/Color'

export default class NewSalesOrderScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    const ORDER_NUMBER = '234432'
    return {
      header: (
        <CustomHeader
          title={'Order: ' + ORDER_NUMBER}
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  render() {
    const TOTAL_AMOUNT: string = '0.00'
    return (
      <View style={styles.container}>
        <SubHeaderAtom
          screen="sales order"
          image={require('../../assets/Icons/gray-icons/grey-order.png')}
        >
          <Text style={[textStyles.normalText, styles.rightSubheader]}>
            {'Total: ' + '\u20A6'}
            <Text style={textStyles.greenText}>{TOTAL_AMOUNT}</Text>
          </Text>
        </SubHeaderAtom>
        <FormContainerAtom style={styles.formContainer}>
          <InputAtom label="Customer" />
        </FormContainerAtom>
        <FormContainerAtom style={styles.formContainer}>
          <InputAtom label="Item name" />
          <View style={styles.innerInputViewForTwo}>
            <View style={styles.wrappedInputLeft}>
              <InputAtom
                label="Quantity"
                // getValue={val => this.updateState('birthday', val)}
              />
            </View>
            <View style={[styles.wrappedInputLeft, { paddingRight: 12 }]}>
              <InputAtom
                label="Price/each"
                // getValue={val => this.updateState('maritalStatus', val)}
              />
            </View>
          </View>
          <View style={[styles.wrappedInputLeft, { paddingLeft: 0 }]}>
            <InputAtom label="Amount" />
          </View>
        </FormContainerAtom>
        <Text
          style={[
            textStyles.normalText,
            textStyles.blueText,
            styles.textsToAdd
          ]}
        >
          + Add Item
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rightSubheader: {
    marginRight: 8
  },
  formContainer: {
    marginTop: 0,
    marginBottom: 0
  },
  doubleItemView: {
    // flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between'
  },
  inputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  innerInputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center'
  },
  wrappedInputLeft: {
    width: '50%',
    paddingLeft: 12
  },
  textsToAdd: {
    marginLeft: 16,
    marginVertical: 16
  }
})
