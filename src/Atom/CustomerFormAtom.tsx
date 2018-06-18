import * as React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { Card, CardItem } from 'native-base'

import InputAtom from './InputAtom'
import ButtonAtom from './ButtonAtom'
import { color } from './../Style/Color'

interface ICustomerFormProps {
  navigation: any
}

export default class CustomerFormAtom extends React.Component<
  ICustomerFormProps,
  any
> {
  state = {
    product: '',
    image: '',
    quantity: 0,
    pquantity: 0,
    costPP: 0,
    birth: '',
    marriage: '',
    debt: 0
  }

  addFromContact = () => {
    console.log('add from contact');
  }
 // TODO: change all function to suite the new form fields
  create = () => {
    this.props.navigation.goBack()
  }

  getProduct = (product: string) => {
    this.setState({ product })
  }

  getImage = (pic: any) => {
    this.setState({ image: pic })
  }
  getSQuantity = (quantity: number) => {
    this.setState({ quantity })
  }
  getPQuantity = (pquantity: number) => {
    this.setState({ pquantity })
  }
  getCostPP = (costPP: number) => {
    this.setState({ costPP })
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.cardTitle}>Customer ID</Text>
        <Card style={styles.cardContainer}>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Contact name'}
              required={true}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Company name'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem>
            <ButtonAtom
              btnText={'+ Add from contacts'}
              transparent={true}
              onPress={this.addFromContact}
              textStyle={styles.transparentBtnText}
              btnStyle={styles.leftSidedButton}
            />
          </CardItem>
        </Card>
        <Text style={styles.cardTitle}>Customer Contact</Text>
        <Card style={styles.cardContainer}>
          <CardItem style={styles.cardItem}>
            <Text style={styles.leftLabel}>Phone</Text>
            <InputAtom
              floatingLabel={false}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text style={styles.leftLabel}>Mobile</Text>
            <InputAtom
              floatingLabel={false}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text style={styles.leftLabel}>Fax</Text>
            <InputAtom
              floatingLabel={false}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Text style={styles.leftLabel}>Email</Text>
            <InputAtom
              floatingLabel={false}
              placeholder={'example@host.com'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
        </Card>
        <Text style={styles.cardTitle}>Customer Address</Text>
        <Card style={styles.cardContainer}>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Office Address'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Home Address'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
        </Card>
        <Text style={styles.cardTitle}>Billing Address</Text>
        <Card style={styles.cardContainer}>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Address line 1'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Address line 2'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'City'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'State'}
              getValue={this.getProduct}
              contStyle={[styles.marginlessInput, styles.twoColumnInput]}
            />
            <InputAtom
              label={'Country'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Fax'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
        </Card>
        <Text style={styles.cardTitle}>Customer pays me with</Text>
        <Card style={styles.cardContainer}>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'NGN Nigeria naira'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
        </Card>
        <Text style={styles.cardTitle}>Other details</Text>
        <Card style={styles.cardContainer}>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Birth day'}
              getValue={this.getProduct}
              contStyle={[styles.marginlessInput, styles.twoColumnInput]}
            />
            <InputAtom
              label={'Marital Status'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Marriage Anniversary'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
            <Text> </Text>
          </CardItem>
        </Card>
        <Text style={styles.cardTitle}>Likes</Text>
        <Card style={styles.cardContainer}>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Like'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem>
            <ButtonAtom
              btnText={'+ Add Like'}
              transparent={true}
              onPress={this.addFromContact}
              textStyle={styles.transparentBtnText}
              btnStyle={styles.leftSidedButton}
            />
          </CardItem>
        </Card>
        <Text style={styles.cardTitle}>Dislikes</Text>
        <Card style={styles.cardContainer}>
          <CardItem style={styles.cardItem}>
            <InputAtom
              label={'Dis likes'}
              getValue={this.getProduct}
              contStyle={styles.marginlessInput}
            />
          </CardItem>
          <CardItem>
            <ButtonAtom
              btnText={'+ Add Dislike'}
              transparent={true}
              onPress={this.addFromContact}
              textStyle={styles.transparentBtnText}
              btnStyle={styles.leftSidedButton}
            />
          </CardItem>
        </Card>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    marginVertical: 16
  },
  inputView: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    flex: 1
  },
  innerStart: {
    width: '50%',
    flex: 1,
    alignSelf: 'flex-start'
  },
  innerEnd: {
    width: '50%',
    flex: 1,
    alignSelf: 'center'
  },
  underText: {
    marginRight: '50%',
    fontSize: 10
  },
  innerFirstPicker: {
    flex: 1,
    alignSelf: 'center'
  },
  innerLastEnd: {
    width: '50%',
    flex: 0,
    alignSelf: 'flex-end',
    paddingTop: 20
  },
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  cardTitle: {
    alignSelf: 'center',
    marginVertical: 8,
    color: color.label
  },
  cardContainer: {
    paddingBottom: 16
  },
  cardItem: {
    paddingBottom: 0
  },
  flexAdjust: {
    flex: 1
  },
  marginlessInput: {
    marginLeft: 0
  },
  twoColumnInput: {
    marginRight: 16
  },
  transparentBtnText: {
    color: color.button
  },
  leftSidedButton: {
    paddingLeft: 0
  },
  leftLabel: {
    marginRight: 16,
    color: color.label
  }
})
