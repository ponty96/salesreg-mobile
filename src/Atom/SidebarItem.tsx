import * as React from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'
import { color } from '../Style/Color'

const sidebarItem = (prop: any) => (
  <View style={styles.header}>
    <Text style={styles.title}>{prop.title}</Text>
    <Button
      title={prop.category}
      onPress={() => {
        console.log(prop.title + 'button was clicked')
      }}
    />
  </View>
)

export default sidebarItem

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.modal
  },
  title: {
    marginLeft: '2%'
  }
})
