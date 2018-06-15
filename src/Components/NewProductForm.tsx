import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import ProductFormAtom from '../Atom/ProductFormAtom'
import SaveCancelButton from '../Container/SaveCancelButton'
import { ScrollView } from 'react-native-gesture-handler'

interface IProps {
  navigation: any
}

interface IState {}

class NewProductForm extends PureComponent<IProps, IState> {
  create = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
          <ProductFormAtom navigation={this.props.navigation} />
        </ScrollView>
        <SaveCancelButton
          navigation={this.props.navigation}
          createfunc={this.create}
          positiveButtonName="SAVE"
        />
      </View>
    )
  }
}

export default NewProductForm

const styles = StyleSheet.create({
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
