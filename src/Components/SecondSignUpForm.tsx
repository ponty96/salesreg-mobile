import React, { PureComponent } from 'react'
import { Form, CheckBox } from 'native-base'
import { View, Text, StyleSheet } from 'react-native'
import InputAtom from '../Atom/InputAtom'
import ButtonAtom from '../Atom/ButtonAtom'
import ImageAtom from '../Atom/ImageAtom'
import { color } from '../Style/Color'
import PickerAtom from '../Atom/PickerAtom'

interface IProps {
  navigation: any
}

interface IState {
  image: string
  businessName: string
  businessAddress: string
  email: string
  amount: string
  products: boolean
  services: boolean
  description: string
}

class SecondSigupForm extends PureComponent<IProps, IState> {
  state = {
    image: 'https://www.iconsdb.com/icons/preview/gray/shop-xxl.png',
    businessName: '',
    businessAddress: '',
    email: '',
    amount: '',
    products: false,
    services: false,
    description: ''
  }

  signup = () => {
    console.log(
      this.state.image,
      this.state.businessName,
      this.state.businessAddress,
      this.state.email,
      this.state.amount
    )
  }

  getImage = (pic: any) => {
    this.setState({ image: pic })
  }

  getName = (businessName: string) => {
    this.setState({
      businessName
    })
  }

  getAddress = (businessAddress: string) => {
    this.setState({
      businessAddress
    })
  }

  getEmail = (email: string) => {
    this.setState({
      email
    })
  }

  updateAmount = (amount: string) => {
    this.setState({
      amount
    })
  }

  navigate = (location: string) => {
    this.props.navigation.navigate(location)
  }

  flipCheckedState = (oldState: boolean, key: string) => {
    if (key === 'products') this.setState({ products: !oldState })
    else this.setState({ services: !oldState })
  }

  getDescription = (description: string) => {
    this.setState({
      description
    })
  }

  render() {
    return (
      <Form style={styles.resetFormContainer}>
        <ImageAtom
          getValue={this.getImage}
          source={this.state.image}
          placeholder=""
          shop={true}
        />

        <InputAtom
          label="*Business name"
          getValue={this.getName}
          contStyle={styles.marginlessInput}
        />

        <InputAtom
          label="*Business address"
          getValue={this.getAddress}
          contStyle={styles.marginlessInput}
        />

        <InputAtom
          label="*Email"
          getValue={this.getEmail}
          keyboardType="email-address"
          contStyle={styles.marginlessInput}
        />

        <Text style={[styles.whatYouSell, { fontFamily: 'SourceSansPro' }]}>
          *What are you selling?
        </Text>
        <View style={styles.checkBoxWrapper}>
          <CheckBox
            checked={this.state.products}
            onPress={() => {
              this.flipCheckedState(this.state.products, 'products')
            }}
            color={color.inactive}
          />
          <Text style={[styles.checkBoxText, { fontFamily: 'SourceSansPro' }]}>
            Products(Traders, manufacturers, producers)
          </Text>
        </View>

        <View style={styles.checkBoxWrapper}>
          <CheckBox
            checked={this.state.services}
            onPress={() => {
              this.flipCheckedState(this.state.services, 'services')
            }}
            color={color.inactive}
          />
          <Text style={[styles.checkBoxText, { fontFamily: 'SourceSansPro' }]}>
            Services(Service providers)
          </Text>
        </View>

        <Text style={[styles.whatYouSell, { fontFamily: 'SourceSansPro' }]}>
          Transaction currency
        </Text>
        <View style={styles.pickerWrapper}>
          <PickerAtom list={['Naira(\u20A6)']} placeholder={`Naira(\u20A6)`} />
        </View>

        <InputAtom
          label="Give a description of your business"
          getValue={this.getDescription}
          contStyle={styles.marginlessInput}
        />

        <View style={styles.buttonsWrapper}>
          <ButtonAtom
            btnText="SIGN UP"
            onPress={this.signup}
            btnStyle={styles.longButton}
            textStyle={[
              styles.signUp,
              { fontFamily: 'SourceSansPro_Semibold' }
            ]}
          />
          <Text style={[styles.termsText, { fontFamily: 'SourceSansPro' }]}>
            Signing up means you agree with our{' '}
            <Text style={[styles.redTermText, { fontFamily: 'SourceSansPro' }]}>
              Terms
            </Text>{' '}
            &{' '}
            <Text style={[styles.redTermText, { fontFamily: 'SourceSansPro' }]}>
              Privacy policy
            </Text>
          </Text>
          <Text style={[styles.haveAccount, { fontFamily: 'SourceSansPro' }]}>
            Or you have an account?{' '}
          </Text>
          <ButtonAtom
            btnText="LOGIN"
            transparent={true}
            funcValue={'Login'}
            onPress={this.navigate}
            textStyle={[styles.login, { fontFamily: 'SourceSansPro_Semibold' }]}
          />
        </View>
      </Form>
    )
  }
}

export default SecondSigupForm

const styles = StyleSheet.create({
  marginlessInput: {
    marginLeft: 0
  },
  btnColor: {
    color: color.button
  },
  buttonsWrapper: {
    marginTop: 16
  },
  whatYouSell: {
    marginTop: 32,
    color: color.button,
    fontSize: 14
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    marginTop: 16
  },
  checkBoxText: {
    marginLeft: 16,
    fontSize: 14
  },
  pickerWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1.5,
    width: '50%'
  },
  placeholderColor: {
    color: color.inactive
  },
  longButton: {
    alignSelf: 'stretch',
    paddingHorizontal: 0,
    justifyContent: 'center',
    height: 50
  },
  termsText: {
    color: color.menu,
    textAlign: 'center',
    fontSize: 12
  },
  redTermText: {
    color: color.button
  },
  haveAccount: {
    marginTop: 16,
    textAlign: 'center',
    color: color.menu,
    fontSize: 14
  },
  resetFormContainer: {
    marginTop: 16
  },
  login: {
    color: color.button,
    fontSize: 16
  },
  signUp: {
    fontSize: 16
  }
})
