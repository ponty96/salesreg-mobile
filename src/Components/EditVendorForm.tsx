import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import CustomerFormAtom from '../Atom/CustomerFormAtom'
import SaveCancelButton from '../Container/SaveCancelButton'

interface IProps {
  navigation: any
}

interface IState {}

class EditVendorForm extends PureComponent<IProps, IState> {
  create = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.ababa}>
        <CustomerFormAtom
          navigation={this.props.navigation}
          type={'vendor'}
          firstHeader={'Vendor contact'}
          secondHeader={'Vendor Address'}
          thirdHeader={'I pays this Vendor with'}
        />
        <SaveCancelButton
          navigation={{ fakeObject: 'To stop giving errors' }}
          createfunc={this.create}
          positiveButtonName="SAVE"
        />
      </View>
    )
  }
}

export default EditVendorForm

const styles = StyleSheet.create({
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
