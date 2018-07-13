import React, { PureComponent } from 'react'
import { Text, View, ScrollView, FlatList, StyleSheet } from 'react-native'
import { Header, Right } from 'native-base'
import PickerAtom from '../Atom/PickerAtom'
import DebtListAtom from '../atom/DebtListAtom'
import TotalDebtAtom from '../atom/TotalDebtAtom'
import { debtList } from '../config/data'

interface IProps {
  onPress: () => void
}

interface IState {}

class DebtList extends PureComponent<IProps, IState> {
  renderItem = ({ item }: any) => {
    return <DebtListAtom items={item} onPress={this.props.onPress} />
  }

  render() {
    return (
      <View style={styles.customerListContainer}>
        <Header style={styles.customerListHeader}>
          <Right style={styles.customerListDirect}>
            <Text style={styles.customerListDropText}>Sort By:</Text>
            <PickerAtom
              list={[
                'Fasting selling',
                'Slowest selling',
                'Highest profit',
                'Lowest profit'
              ]}
              style={styles.pickerStyle}
              placeholder="Make a selection"
            />
          </Right>
        </Header>
        <ScrollView>
          <FlatList
            data={debtList}
            renderItem={this.renderItem}
            keyExtractor={(item: any) => item.key}
          />
        </ScrollView>
        <TotalDebtAtom limit={80000} totalAmount="80,000" />
      </View>
    )
  }
}

export default DebtList

const styles = StyleSheet.create({
  customerListContainer: {
    // backgroundColor: '#FFF',
    flex: 1,
    width: '100%'
  },
  customerListHeader: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40
  },
  customerListDirect: {
    flexDirection: 'row'
  },
  customerListDropText: {
    paddingBottom: 10,
    fontSize: 14
  },
  pickerStyle: {
    width: 130,
    height: 35
  }
})
