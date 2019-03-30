import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Content } from 'native-base'

import OrderAnalytics from './Dashboard/OrderAnalytics'
import SalesAnalytics from './Dashboard/SalesAnalytics'

const NavigationalInformation = () => (
  <View style={styles.container}>
    <Content>
      <SalesAnalytics />
      <OrderAnalytics />
    </Content>
  </View>
)

export default NavigationalInformation

const styles = StyleSheet.create({
  container: { backgroundColor: '#eee', flex: 1 }
})
