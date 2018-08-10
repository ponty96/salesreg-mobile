import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import FormContainerAtom from '../Atom/FormContainerAtom'
import InputAtom from '../Atom/InputAtom'

export default class NewExpensesScreen extends Component {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Expenses"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  updateState = (key: string, value: any) => {
    this.setState({ [key]: value })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FormContainerAtom style={styles.formContainer}>
            <InputAtom
              label="Customer"
              getValue={val => this.updateState('customer', val)}
            />
          </FormContainerAtom>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    marginTop: 0,
    marginBottom: 0
  }
})
