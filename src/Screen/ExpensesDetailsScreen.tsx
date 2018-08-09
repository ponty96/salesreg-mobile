import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CustomHeader from '../Components/CustomHeader'

export class ExpensesDetailsScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Expense"
          onBackPress={() => navigation.goBack()}
          showRight
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          rightText="Edit"
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Personality</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
