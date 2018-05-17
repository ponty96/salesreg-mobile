import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import EditCustomerAtom from '../Atom/EditCustomerAtom'
import styles from '../Style/OrderList'
import SaveCancelButton from '../Container/SaveCancelButton'

export default class NewCustomerForm extends React.Component {
  create = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <EditCustomerAtom />
        </ScrollView>
        <SaveCancelButton
          navigation={{ fakeObject: 'To stop giving errors' }}
          createfunc={this.create}
          positiveButtonName="SAVE"
        />
      </View>
    )
  }
}
