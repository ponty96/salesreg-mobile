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
  password: string
  name: string
  confirm_password: string
  gender: string
  products: boolean
  services: boolean
}

class SigupForm2 extends PureComponent<IProps, IState> {
  state = {
    image: 'https://www.iconsdb.com/icons/preview/gray/shop-xxl.png',
    password: '',
    name: '',
    confirm_password: '',
    gender: '',
    products: false,
    services: false
  }

  signup = () => {
    console.log(
      this.state.image,
      this.state.password,
      this.state.name,
      this.state.confirm_password,
      this.state.gender
    )
  }

  getImage = (pic: any) => {
    this.setState({ image: pic })
  }

  getPassword = (pass: string) => {
    this.setState({
      password: pass
    })
  }

  getName = (name: string) => {
    this.setState({
      name
    })
  }

  getConfirm = (confirmPass: string) => {
    this.setState({
      confirm_password: confirmPass
    })
  }

  updateGender = (selectedGender: string) => {
    this.setState({
      gender: selectedGender
    })
  }

  navigate = (location: string) => {
    this.props.navigation.navigate(location)
  }

  flipCheckedState = (oldState: boolean, key: string) => {
    if (key === 'products') this.setState({ products: !oldState })
    else this.setState({ services: !oldState })
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
          getValue={this.getName}
          contStyle={styles.marginlessInput}
        />

        <InputAtom
          label="*Email"
          getValue={this.getName}
          keyboardType="email-address"
          contStyle={styles.marginlessInput}
        />

        <Text style={styles.whatYouSell}>*What are you selling?</Text>
        <View style={styles.checkBoxWrapper}>
          <CheckBox
            checked={this.state.products}
            onPress={() => {
              this.flipCheckedState(this.state.products, 'products')
            }}
            color={color.inactive}
          />
          <Text style={styles.checkBoxText}>
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
          <Text style={styles.checkBoxText}>Services(Service providers)</Text>
        </View>

        <Text style={styles.whatYouSell}>Transaction currency</Text>
        <View style={styles.pickerWrapper}>
          <PickerAtom list={['Naira(\u20A6)']} placeholder="Naira(\u20A6)" />
        </View>

        <InputAtom
          label="Give a description of your business"
          getValue={this.getName}
          contStyle={styles.marginlessInput}
        />

        <View style={styles.buttonsWrapper}>
          <ButtonAtom
            btnText="SIGN UP"
            onPress={this.signup}
            btnStyle={styles.longButton}
          />
          <Text style={styles.termsText}>
            Signing up means you agree with our{' '}
            <Text style={styles.redTermText}>Terms</Text> &{' '}
            <Text style={styles.redTermText}>Privacy policy</Text>
          </Text>
          <Text style={styles.haveAccount}>Or you have an account? </Text>
          <ButtonAtom
            btnText="LOGIN"
            transparent={true}
            funcValue={'Login'}
            onPress={this.navigate}
          />
        </View>
      </Form>
    )
  }
}

export default SigupForm2

const styles = StyleSheet.create({
  marginlessInput: {
    marginLeft: 0
  },
  buttonsWrapper: {
    marginTop: 20
  },
  whatYouSell: {
    marginTop: '10%',
    color: color.primary
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  checkBoxText: {
    marginLeft: 15
  },

  pickerWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1,
    width: '50%'
  },

  placeholderColor: {
    color: color.inactive
  },
  longButton: {
    alignSelf: 'stretch',
    paddingHorizontal: 0,
    justifyContent: 'center'
  },
  termsText: {
    color: color.menu,
    textAlign: 'center'
  },
  redTermText: {
    color: color.redButton
  },
  haveAccount: {
    marginTop: '4%',
    textAlign: 'center',
    color: color.menu
  },
  resetFormContainer: {
    marginTop: '4%'
  }
})
