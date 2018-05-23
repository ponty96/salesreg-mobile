import React, { PureComponent } from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
// import { Text, View, FlatList, ScrollView } from 'react-native';
import { Header, Right } from 'native-base'

import PickerAtom from '../Atom/PickerAtom'
import DebtListAtom from '../Atom/DebtListAtom'
import TotalDebtAtom from '../Atom/TotalDebtAtom'
import styles from '../Style/exportStyles'
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
