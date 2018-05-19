import React, { PureComponent } from 'react';
import { View } from 'react-native';

import OrderFormAtom from '../Atom/OrderFormAtom';
import SaveCancelButton from '../Container/SaveCancelButton';
import styles from './../Style/OrderList';

interface IProps {
    navigation: any;
}

interface IState {

}

class NewOrderForm extends PureComponent<IProps, IState> {
  create = () => {
    this.props.navigation.goBack()
  }

  navigate = (location: any) => {
    this.props.navigation.navigate(location)
  }

  render() {
    return (
      <View style={styles.formViewContainer1}>
        <OrderFormAtom navigation={this.props.navigation}/>
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
