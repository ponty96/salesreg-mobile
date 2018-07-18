import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import SubHeaderAtom from '../Atom/SubHeaderAtom'
import { textStyles } from '../Style/TextStyles'

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
          <Text style={textStyles.normalText}>
            {'Total: ' + '\u20A6'}
            <Text style={textStyles.greenText}>{TOTAL_AMOUNT}</Text>
          </Text>
        </SubHeaderAtom>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
