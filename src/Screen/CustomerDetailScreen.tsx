import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Icon } from 'native-base'

import ImageDisplayAtom from './../Atom/ImageDisplayAtom'
import DetailItemAtom from './../Atom/DetailItemAtom'
import GoldRatingsAtom from './../Atom/GoldRatingsAtom'
import ButtonAtom from './../Atom/ButtonAtom'
import GetAmountModal from './../Container/GetAmountModal'
import { color } from '../Style/Color'

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

  openModal = () => {
    this.setState({
      modalVisibility: true
    })
  }

  closeModal = () => {
    this.setState({
      modalVisibility: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.modalVisibility && (
          <GetAmountModal
            visibility={this.state.modalVisibility}
            headerText={"Salomy's wallet"}
            closeModal={this.closeModal}
          />
        )}
        <ScrollView>
          <View style={styles.topCompartment}>
            <ImageDisplayAtom
              image={this.state.item.image}
              name={this.state.item.name}
            />
            <View style={styles.textWrapper}>
              <View style={styles.purchaseWrapper}>
                <Text style={styles.textTitle}>Total purchase made</Text>
                <Text style={styles.textContent}>
                  {'\u20A6'} {this.state.item.purchaseMade}
                </Text>
              </View>
              <View style={styles.purchaseWrapper}>
                <Text style={styles.textTitle}>debt</Text>
                <Text style={[styles.textContent, styles.redText]}>
                  {'\u20A6'} {this.state.item.credit}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.secondCompartment}>
            <Text style={styles.details}>Details</Text>
            <View style={styles.detailItemWrapper}>
              <DetailItemAtom
                icon="phone"
                detailText={this.state.item.phoneNumber}
                type="FontAwesome"
              />
            </View>

            <View style={styles.detailItemWrapper}>
              <DetailItemAtom
                icon="map-marker"
                detailText={this.state.item.address}
                type="FontAwesome"
              />
            </View>

            <View style={styles.detailItemWrapper}>
              <DetailItemAtom
                icon="envelope"
                detailText={this.state.item.email}
                type="FontAwesome"
              />
            </View>

            <View style={styles.detailItemWrapper}>
              <DetailItemAtom
                icon="birthday-cake"
                detailText={this.state.item.birthday}
                type="FontAwesome"
              />
            </View>

            <View style={styles.detailItemWrapper}>
              <DetailItemAtom
                icon="ring"
                detailText={this.state.item.marriageAniversary}
                type="MaterialCommunityIcons"
              />
            </View>
          </View>
          <View style={styles.secondCompartment}>
            <View style={styles.compartmentItemWrapper}>
              <Text style={styles.compartmentItem}>Rating</Text>
              <GoldRatingsAtom />
            </View>
          </View>

          <View style={styles.secondCompartment}>
            <View style={[styles.compartmentItemWrapper, styles.creditLimit]}>
              <Text style={styles.compartmentItem}>Credit Limit</Text>
              <Text style={[styles.textContent, styles.redText]}>
                {'\u20A6'} {this.state.item.creditLimit}
              </Text>
            </View>
          </View>

          <View style={[styles.compartmentItemWrapper, styles.creditLimit]}>
            <View style={styles.walletWrapper}>
              <Text style={styles.compartmentItem}>Wallet</Text>
              <Text style={[styles.compartmentItem, styles.walletText]}>
                {this.state.item.wallet}
              </Text>
            </View>
            <ButtonAtom btnText="Add to wallet" onPress={this.openModal} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default CustomerDetailScreen

const styles = StyleSheet.create({
  secondCompartment: {
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom,
    paddingBottom: 10
  },
  compartmentItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: 25
  },
  compartmentItem: {
    marginLeft: 35,
    color: color.inactive
  },
  creditLimit: {
    paddingTop: 15
  },
  walletText: {
    color: 'blue',
    marginTop: 15
  },
  walletWrapper: {
    marginBottom: 5
  },
  bottomPadding: {
    paddingBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  detailItemWrapper: {
    marginVertical: 10
  },
  details: {
    marginTop: 20,
    marginLeft: 25,
    color: color.inactive,
    marginBottom: 5
  },
  redText: { color: color.primary },
  textContent: {
    fontWeight: '400',
    fontSize: 14
  },
  purchaseWrapper: {
    alignItems: 'flex-end'
  },
  textTitle: {
    color: color.inactive,
    fontWeight: '400',
    fontSize: 14
  },
  textWrapper: {
    marginRight: 20,
    marginTop: 25,
    justifyContent: 'space-between'
  },
  topCompartment: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    justifyContent: 'space-between',
    paddingBottom: 30
  },
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
