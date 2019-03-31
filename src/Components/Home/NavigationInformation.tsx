import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Content } from 'native-base'

import OrderAnalytics from './Dashboard/OrderAnalytics'
import SalesAnalytics from './Dashboard/SalesAnalytics'
import VisitorsAnalytics from './Dashboard/VisitorsAnalytics'
import ExpenseAnalytics from './Dashboard/ExpenseAnalytics'

const NavigationalInformation = () => (
  <View style={styles.container}>
    <Content>
      <SalesAnalytics />
      <OrderAnalytics />
      <VisitorsAnalytics />
      <ExpenseAnalytics />
    </Content>
  </View>
)

export default NavigationalInformation

const styles = StyleSheet.create({
  container: { backgroundColor: '#eee', flex: 1 }
})
