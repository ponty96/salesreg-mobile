import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { /*List,*/ } from 'native-base'
import Icon from '../Atom/Icon'

import FabAtom from '../Atom/FabAtom'
// import ListItemAtom from '../atom/ListItemAtom'
import DeleteModal from '../container/DeleteBuzModal'
import { userData } from '../config/default'
import { color } from '../Style/Color'
// import GetAmountModal from './../Container/GetAmountModal';
// import RestockModal from './../Container/RestockModal';
// import WarningModal from './../Container/WarningModal';
// import PaymentModal from './../Container/PaymentModal';

interface IProps {
  items: any[]
  navigation: any
  auth: string
}

interface IState {
  modalVisibility: boolean
}

class BusinessListScreen extends Component<IProps, IState> {
  static defaultProps = {
    items: userData.business,
    auth: 'Sme'
  }

  state = {
    modalVisibility: false
  }

  static navigationOptions = ({ navigation }: any) => {
    let itemsLength = 2
    let right =
      itemsLength > 0 ? (
        <Icon name={'ios-search'} style={styles.headerIcon} />
      ) : (
        <TouchableOpacity
          style={styles.headerItem}
          activeOpacity={1}
          onPress={() => navigation.navigate('Auth')}
        >
          <Icon
            name={'logout'}
            style={styles.headerIconLogout}
            type={'MaterialCommunityIcons'}
          />
          <Text style={styles.headerText}>Logout</Text>
        </TouchableOpacity>
      )
    let left = itemsLength > 0 && (
      <Icon
        name={'menu'}
        onPress={() => navigation.navigate('DrawerToggle')}
        style={styles.headerIcon}
      />
    )
    return {
      title: 'Ayo',
      headerRight: right,
      headerLeft: left
    }
  }

  handleNavigation = (data: any) => {
    this.props.navigation.navigate('ViewBusiness', { data })
  }

  handleDelete = (value: any) => {
    console.log(value)
    this.setState({
      modalVisibility: false
    })
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

  renderEmpty = () => {
    return (
      <View style={styles.emptyHolder}>
        <Text style={styles.emptyHeader}>{`Welcome ${this.props.auth}!`}</Text>
        <Text>
          You have no business yet. Press the&nbsp;
          <Text style={styles.redText}>red round button&nbsp;</Text>
          below, to add your businesses.
        </Text>
      </View>
    )
  }

  /*renderList = () => {
    return (
      <List>
        {this.props.items.map((item: any, index: number) => {
          return (
            <ListItemAtom
              item={item}
              key={index}
              type={'business'}
              bodyfunction={this.handleNavigation}
              rightIconFunc={this.openModal}
            />
          )
        })}
      </List>
    )
  }*/

  render() {
    // do change the list to the appropriate molecule

    // adding to wallet and paying of deb can use GetAmount
    // <GetAmountModal
    // visibility={true}
    // headerText={"Salomy's debt"}
    // />

    // customer and business debit limit can use the below modal
    // <WarningModal
    //    visibility={true}
    //    type={'business'}
    //    name={'Salomy'}
    //    limit={7000}
    // />

    // for restocking modal
    // {/*<RestockModal*/}
    //     {/*visibility={true}*/}
    //     {/*headerText={"Re-stock No.5 Channel perfume"}*/}
    // {/*/>*/}

    // for payment modal
    {
      /*<PaymentModal*/
    }
    {
      /*visibility={true}*/
    }
    {
      /*headerText={"Pay for order 234432"}*/
    }
    {
      /*/>*/
    }

    // slet empty = this.props.items.length <= 0
    return (
      <View style={[styles.plainContainer]}>
        {this.state.modalVisibility && (
          <DeleteModal
            visibility={this.state.modalVisibility}
            closeModal={this.closeModal}
            getValue={this.handleDelete}
            headerText={'Delete Kay5Attractions'}
          />
        )}
        <FabAtom
          routeName={'NewBusiness'}
          name={'md-add'}
          params={{
            itemsLength: this.props.items.length
          }}
          navigation={this.props.navigation}
        />
        // {/*empty ? this.renderEmpty() : this.renderList()*/}
      </View>
    )
  }
}

export default BusinessListScreen

const styles = StyleSheet.create({
  plainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: color.secondary
  },
  redText: {
    color: color.primary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  headerText: {
    color: color.secondary,
    fontWeight: 'bold',
    paddingRight: 16,
    fontSize: 18
  },
  emptyHolder: {
    backgroundColor: color.grey,
    paddingHorizontal: 16,
    paddingVertical: 32
  },
  emptyHeader: {
    marginBottom: 16,
    color: color.primary,
    fontSize: 18
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerIconLogout: {
    color: color.secondary,
    padding: 8,
    fontSize: 28
  }
})
