import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import CustomerFormAtom from '../Atom/CustomerFormAtom'
import SaveCancelButton from '../Container/SaveCancelButton'

interface IProps {
  navigation: any
  onPressSave: () => void
}

class EditCustomerForm extends PureComponent<IProps> {
  render() {
    return (
      <View style={styles.ababa}>
        <CustomerFormAtom
          header={'Customer ID'}
          name={'Customer Name'}
          navigation={this.props.navigation}
          type={'customer'}
          firstHeader={'Customer contact'}
          secondHeader={'Customer Address'}
          thirdHeader={'Customer pays me with'}
        />
        <SaveCancelButton
          navigation={this.props.navigation}
          createfunc={this.props.onPressSave}
          positiveButtonName="SAVE"
        />
      </View>
    )
  }
}

export default EditCustomerForm

const styles = StyleSheet.create({
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
