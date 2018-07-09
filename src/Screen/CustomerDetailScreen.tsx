import React, { PureComponent } from 'react'
import { View } from 'react-native'
import AboveCustomerDetailsAtom from '../Atom/AboveCustomerDetailsAtom'
import InnerTabAtom from '../Atom/CustomerInnerTabAtom'
import CustomHeader from '../Components/CustomHeader'

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
      header: (
        <CustomHeader
          title="Customer"
          onBackPress={() => navigation.goBack()}
          right
          rightText="Edit"
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onPressRightButton={() => navigation.navigate('EditCustomerDetails')}
        />
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
