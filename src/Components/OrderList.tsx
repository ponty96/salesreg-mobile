import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import styles from './../Style/exportStyles';
import DateOrderAtom from '../Atom/DateOrderAtom';
import TotalOrderAtom from '../Atom/TotalOrderAtom';
import OrderListAtom from '../Atom/OrderListAtom';

interface IProps {
    navigation: any;
    items: any[];
}

interface IState {
    data: any[];
    stickyHeaderIndices: any[];
}

class OrderList extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      data: this.props.items,
      stickyHeaderIndices: []
    }
  }

  componentDidMount() {
    let arr: any[] = [];
    this.state.data.map(obj => {
      if (obj.header === 'start') {
        arr.push(this.state.data.indexOf(obj))
      }
    })
    arr.push(0)
    this.setState({
      stickyHeaderIndices: arr
    })
  }

  renderItem = ({ item }: any): any => {
    if (item.header === 'start') {
      return <DateOrderAtom date={item.date} />
    } else if (item.header === 'middle') {
      return <OrderListAtom items={item} />
    } else if (item.header === 'end') {
      return <TotalOrderAtom totalAmount={item.amount} profit={item.profit}/>
    }
  };

  render() {
    return (
      <View style={styles.orderListContainer}>
        {/*<FlatList*/}
          {/*ref={ref => (this.scrollView = ref)}*/}
          {/*onContentSizeChange={() => {*/}
            {/*this.scrollView.scrollToEnd({ animated: false })*/}
          {/*}}*/}
          {/*data={this.state.data}*/}
          {/*renderItem={this.renderItem}*/}
          {/*keyExtractor={item => item.key}*/}
          {/*stickyHeaderIndices={this.state.stickyHeaderIndices}*/}
        {/*/>*/}
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.key}
          stickyHeaderIndices={this.state.stickyHeaderIndices}
        />
      </View>
    )
  }
}

export default OrderList;
