import React, { PureComponent } from 'react';
import { View, ListView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import OrderDetailListAtom from '../Atom/OrderDetailListAtom';
import TopOrderDetailAtom from '../Atom/TopOrderDetailAtom';
import BottomOrderDetailAtom from '../Atom/BottomOrderDetailAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from '../Style/OrderList';
import { orderDetails } from '../config/data';

const users = orderDetails;

interface IProps {
    navigation: any;
}

interface IState {
    userDataSource: any;
}

class OrderDetails extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      userDataSource: ds.cloneWithRows(users)
    }
  }

  onPress = () => {}

  renderRow(user: any) {
    return <OrderDetailListAtom items={user} />
  }

  render() {
    return (
      <View style={styles.containerDetails}>
        <ScrollView>
          <TopOrderDetailAtom uri={undefined} status={'false'}/>
          <ListView
            dataSource={this.state.userDataSource}
            renderRow={this.renderRow.bind(this)}
          />
          <BottomOrderDetailAtom />
        </ScrollView>
        <View style={styles.footerDetails}>
          <ButtonAtom
            btnText="Cancel Order"
            transparent={true}
            btnStyle={styles.butt}
            textStyle={styles.textyy}
          />
        </View>
      </View>
    )
  }
}

export default OrderDetails;