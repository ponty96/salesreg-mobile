import React from 'react'
import { View, Text } from 'react-native'
import ProductFormAtom from '../Atom/ProductFormAtom'

import SaveCancelButton from '../Container/SaveCancelButton'
import { ScrollView } from 'react-native-gesture-handler'
import styles from '../Style/OrderList'

export default class NewProductForm extends React.Component {
  create = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <ProductFormAtom />
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
