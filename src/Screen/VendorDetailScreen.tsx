import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Icon, Tabs, Tab } from 'native-base'

import ImageDisplayAtom from './../Atom/ImageDisplayAtom'
import DetailItemAtom from './../Atom/DetailItemAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation?: any
}

interface IState {
  item: any
}

class VendorDetailScreen extends PureComponent<IProps, IState> {
  state = {
    item: {
      image:
        'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
      name: 'Salomy',
      purchaseMade: '46,000.00',
      credit: '10,000.00',
      creditLimit: '7000.00',
      wallet: '0.00',
      phoneNumber: '09034567889, 08067654323',
      address: '6 Salem street Morogbo, Lagos',
      email: 'salosalo@gmail.com'
  }
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      title: 'Vendor Details',
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
            navigation.navigate('NewVendor')
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
      <View style={styles.container}>
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
                <Text style={styles.textTitle}>Outstanding</Text>
                <Text style={styles.redText}>
                  {'\u20A6'} {this.state.item.credit}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.secondCompartment}>
            <View style={styles.compactItemContaier}>
              <Icon style={styles.compactIcon} name={'md-call'} />
              <Text style={styles.compactText}>Make Call</Text>
            </View>
            <View style={styles.compactItemContaier}>
              <Icon style={styles.compactIcon} name={'md-mail'} />
              <Text style={styles.compactText}>Send email</Text>
            </View>
            </View>
          <Tabs
            initialPage={0}
            tabBarUnderlineStyle={styles.tabUnderLine}
          >
            <Tab
              heading="ACTIVITIES"
              tabStyle={styles.tab}
              textStyle={styles.tabText}
              activeTabStyle={styles.activeTab}
              activeTextStyle={styles.activeTabText}
            >
              <View style={styles.emptyHolder}>
                <Text style={styles.emptyText}>
                  {`No actives for ${this.state.item.name} yet. When you add invoice and invoice payments, you will see them here`}
              </Text>
            </View>
            </Tab>
            <Tab
              heading="DETAILS"
              tabStyle={styles.tab}
              textStyle={styles.tabText}
              activeTabStyle={styles.activeTab}
              activeTextStyle={styles.activeTabText}
            >
              <View>
                <DetailItemAtom title={'Phone'} value={this.state.item.phoneNumber} />
                <DetailItemAtom title={'Email'} value={this.state.item.email} />
                <DetailItemAtom title={'Home Address'} value={this.state.item.address} />
              </View>
            </Tab>
        </Tabs>
        </ScrollView>
      </View>
    )
  }
}

export default VendorDetailScreen

const styles = StyleSheet.create({
  secondCompartment: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.list,
    flexDirection: 'row'
  },
  flexAdjust: {
    flex: 1
  },
  compactIcon: {
    color: color.button,
    marginRight: 16
  },
  compactText: {
    fontSize: 16
  },
  compactItemContaier: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  redText: {
    color: color.limit,
    fontWeight: '400',
    fontSize: 14
  },
  textContent: {
    fontWeight: 'bold',
    fontSize: 24
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
    marginTop: 16,
    justifyContent: 'space-between'
  },
  topCompartment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16
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
  },
  tab: {
    backgroundColor: color.primary
  },
  tabText: {
    color: color.secondary
  },
  activeTab: {
    backgroundColor: color.primary
  },
  activeTabText: {
    color: color.active
  },
  tabUnderLine: {
    backgroundColor: color.active
  },
  emptyText: {
    padding: 16,
    backgroundColor: color.list
  },
  emptyHolder: {
    padding: 16
  }
})
