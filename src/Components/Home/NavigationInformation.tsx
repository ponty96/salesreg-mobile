import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import OrderAnalytics from './Dashboard/OrderAnalytics'
import SalesAnalytics from './Dashboard/SalesAnalytics'
import VisitorsAnalytics from './Dashboard/VisitorsAnalytics'
import ExpenseAnalytics from './Dashboard/ExpenseAnalytics'

const data = [
  { key: 'sales' },
  { key: 'order' },
  { key: 'visitors' },
  { key: 'expense' }
]

interface IState {
  currentViewableIndex: number
}

class NavigationalInformation extends React.PureComponent<any, IState> {
  private viewabilityConfig: any

  constructor(props) {
    super(props)

    this.viewabilityConfig = {
      waitForInteraction: false,
      viewAreaCoveragePercentThreshold: 95,
      minimumViewTime: 1000
    }

    this.state = {
      currentViewableIndex: 0
    }
  }

  viewableChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      this.setState({
        currentViewableIndex: viewableItems[0].index
      })
    }
  }

  renderItems = ({ item }) => {
    let { currentViewableIndex } = this.state

    if (item.key == 'sales') {
      return <SalesAnalytics shouldLoad={currentViewableIndex == 0 && true} />
    } else if (item.key == 'order') {
      return <OrderAnalytics />
    } else if (item.key == 'visitors') {
      return (
        <VisitorsAnalytics />
      )
    } else if (item.key == 'expense') {
      return <ExpenseAnalytics />
    }
    return null
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderItems}
          onViewableItemsChanged={this.viewableChanged}
          viewabilityConfig={this.viewabilityConfig}
        />
      </View>
    )
  }
}

export default NavigationalInformation

const styles = StyleSheet.create({
  container: { backgroundColor: '#eee', flex: 1 }
})
