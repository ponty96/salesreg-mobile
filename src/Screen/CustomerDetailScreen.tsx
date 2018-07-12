import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { color } from '../Style/Color'
import AboveCustomerDetailsAtom from '../Atom/AboveCustomerDetailsAtom'
import InnerTabAtom from '../Atom/CustomerInnerTabAtom'

interface IProps {
  navigation?: any
}

interface IState {
  item: any
  modalVisibility: boolean
}

class CustomerDetailScreen extends PureComponent<IProps, IState> {
  state = {
    item: {
      image:
        'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
      name: 'Salomy',
      purchaseMade: '46,000.00',
      credit: '10,000.00',
      phoneNumber: '09034567889, 08067654323',
      address: '6 Salem street Morogbo, Lagos',
      email: 'salosalo@gmail.com',
      birthday: '03 March',
      marriageAniversary: '25 November',
      creditLimit: '7000.00',
      wallet: '0.00'
    },
    modalVisibility: false
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Customer Details',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewCustomer')
          }}
        >
          <View style={styles.headerItem}>
            <Icon
              name={'pencil'}
              style={styles.headerIconLogout}
              type={'MaterialCommunityIcons'}
            />
            <Text style={styles.headerText}>Edit</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AboveCustomerDetailsAtom
          customerName="Salomy"
          purchaseMade={43000}
          overDue={10000}
          redText="Overdue"
        />
        <InnerTabAtom />
      </View>
    )
  }
}

export default CustomerDetailScreen

const styles = StyleSheet.create({
  headerIconLogout: {
    color: color.secondary,
    padding: 8,
    fontSize: 28
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerText: {
    color: color.secondary,
    fontWeight: 'bold',
    paddingRight: 16,
    fontSize: 18
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  }
})
