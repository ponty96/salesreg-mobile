import React from 'react'
import { View } from 'react-native'

import OrderFormAtom from '../Atom/OrderFormAtom'
import SaveCancelButton from '../Container/SaveCancelButton'
import styles from './../Style/OrderList'

class NewOrderForm extends React.Component {
  state = {}

  create = () => {
    this.props.navigation.goBack()
  }

  navigate = location => {
    this.props.navigation.navigate(location)
  }

  render() {
    return (
      <View style={styles.formViewContainer1}>
        <OrderFormAtom />
        <SaveCancelButton
          navigation={this.props.navigation}
          createfunc={this.create}
          positiveButtonName="SAVE"
        />
      </View>
    )
  }
}

export default NewOrderForm
