import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import CustomerFormAtom from '../Atom/CustomerFormAtom'
import SaveCancelButton from '../Container/SaveCancelButton'

interface IProps {
  navigation: any
}

interface IState {}

class EditVendorForm extends PureComponent<IProps, IState> {
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
          navigation={this.props.navigation}
          createfunc={() => console.log('Save button pressed.')}
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
