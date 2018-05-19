import React, { PureComponent } from 'react';
import { View } from 'react-native';
import ProductFormAtom from '../Atom/ProductFormAtom';

import SaveCancelButton from '../Container/SaveCancelButton';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../Style/OrderList';

interface IProps {
    navigation: any
}

interface IState {

}

class NewProductForm extends PureComponent<IProps, IState> {
  create = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.ababa}>
        <ScrollView>
            <ProductFormAtom navigation={this.props.navigation}/>
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

export default NewProductForm;