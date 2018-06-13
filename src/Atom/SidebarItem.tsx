import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { color } from '../Style/Color'

const sidebarItem = (prop: { title: string; category: string }) => (
  <View>
    <View style={styles.header}>
      <Text style={styles.title}>{prop.title}</Text>
    </View>
    <TouchableOpacity style={styles.categoryWrapper}>
      <Text style={styles.category}>{prop.category}</Text>
    </TouchableOpacity>
  </View>
)

export default sidebarItem

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.inactive
  },
  title: {
    marginLeft: '4%',
    color: color.label,
    marginVertical: '2%'
  },
  categoryWrapper: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor
  },
  category: {
    marginLeft: '4%',
    backgroundColor: 'transparent',
    color: color.modal,
    marginVertical: '4%'
  }
})
