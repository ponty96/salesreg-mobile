import React, { Component } from 'react'
import { View, FlatList, ScrollView, StyleSheet } from 'react-native'
import { employeeList } from '../config/data'
import EmptyList from './EmptyList'
import EmployeeListAtom from '../Atom/EmployeeListAtom'

interface IProps {
  items: any[]
  onPress: () => void
  screenType: string
}

interface IState {}

class EmployeeList extends Component<IProps, IState> {
  renderItem = ({ item }: any) => {
    return <EmployeeListAtom items={item} onPress={this.props.onPress} />
  }

  render() {
    return (
      <View style={styles.customerListContainer}>
        <ScrollView>
          <FlatList
            data={employeeList}
            renderItem={this.renderItem}
            ListEmptyComponent={
              <EmptyList
                type={{
                  Text: this.props.screenType,
                  verifyMainList: 'employee'
                }}
              />
            }
          />
        </ScrollView>
      </View>
    )
  }
}

export default EmployeeList

const styles = StyleSheet.create({
  customerListContainer: {
    flex: 1
  }
})
