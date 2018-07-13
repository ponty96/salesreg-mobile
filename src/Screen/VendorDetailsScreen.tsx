import React, { PureComponent } from 'react'
import { View } from 'react-native'
import AboveCustomerDetailsAtom from '../Atom/AboveCustomerDetailsAtom'
import InnerTabAtom from '../Atom/VendorInnerTabAtom'
import CustomHeader from '../Components/CustomHeader'

interface IProps {
  navigation?: any
}

interface IState {
  item: any
  modalVisibility: boolean
}

class VendorDetailScreen extends PureComponent<IProps, IState> {
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
          title="Vendor"
          onBackPress={() => navigation.goBack()}
          showRight
          rightText="Edit"
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onPressRightButton={() => navigation.navigate('NewVendor')}
        />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AboveCustomerDetailsAtom
          customerName="John Doe"
          purchaseMade={46000}
          overDue={10000}
          redText="Outstanding"
        />
        <InnerTabAtom />
      </View>
    )
  }
}

export default VendorDetailScreen
