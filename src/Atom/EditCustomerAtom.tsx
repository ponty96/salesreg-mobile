import * as React from 'react'
import { View, Text } from 'react-native'
import ImageAtom from './ImageAtom'
import InputAtom from './InputAtom'
import PickerAtom from './PickerAtom'
import GoldRatingsAtom from './GoldRatingsAtom'
import styles1 from './../Style/exportStyles'
import styles from '../Style/Form'
import { ScrollView } from 'react-native-gesture-handler'

interface IProps {
  navigation: any
  customerName: string
}

export default class EditCustomerAtom extends React.Component<IProps, any> {
  state = {
    product: '',
    image: '',
    phone: '',
    email: '',
    marriage: '',
    debt: 0,
    address: '',
    ucost: 0,
    birth: ''
  }

  create = () => {
    this.props.navigation.goBack()
  }

  getProduct = (product: string) => {
    this.setState({ product })
  }

  getImage = (pic: string) => {
    this.setState({
      image: pic
    })
  }
  getPhone = (phone: number) => {
    this.setState({ phone })
  }
  getAddress = (address: string) => {
    this.setState({ address })
  }
  getUCost = (ucost: number) => {
    this.setState({ ucost })
  }
  getBirth = (birth: string) => {
    this.setState({ birth })
  }
  getMarry = (marriage: string) => {
    this.setState({ marriage })
  }
  getDebt = (debt: number) => {
    this.setState({ debt })
  }
  getEmail = (email: string) => {
    this.setState({ email })
  }

  render() {
    return (
      <ScrollView>
        <View>
          <ImageAtom
            getValue={this.getImage}
            source={this.state.image}
            placeholder=""
            imgStyle={styles.imgContainer}
          />
          <View>
            <InputAtom
              label="  Name"
              getValue={this.getProduct}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Phone number(separate numbers with commas):"
              keyboardType="numeric"
              getValue={this.getPhone}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View style={styles.innerFirstPicker}>
            <PickerAtom list={['Gender', 'Male', 'Female']} />
          </View>
          <View>
            <InputAtom
              label="  Address"
              keyboardType="numeric"
              getValue={this.getAddress}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Type Email Address"
              keyboardType="email-address"
              getValue={this.getEmail}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerStart}>
              <InputAtom
                label="  Debt limit"
                keyboardType="numeric"
                getValue={this.getDebt}
                contStyle={styles1.marginlessInput}
              />
            </View>
            <View style={styles.innerEnd}>
              <InputAtom
                label="  Birthday"
                keyboardType="numeric"
                getValue={this.getBirth}
                contStyle={styles1.marginfulInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerFirstPicker}>
              <PickerAtom list={['Marital Status', 'Married', 'Single']} />
            </View>
            <View style={styles.innerEnd}>
              <InputAtom
                label="  Marriage Anniversary"
                keyboardType="numeric"
                getValue={this.getMarry}
                contStyle={styles1.marginlessInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
            </View>
          </View>
          <View style={styles.secondCompartment}>
            <View style={styles.compartmentItemWrapper}>
              <Text style={styles.compartmentItem}>
                Rating {this.props.customerName}
              </Text>
              <GoldRatingsAtom />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
