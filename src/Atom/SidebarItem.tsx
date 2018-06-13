import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { color } from '../Style/Color'

const renderList = (listItem: string, unique: number) => {
  return (
    <TouchableOpacity style={styles.categoryWrapper} key={unique}>
      <Text style={styles.category}>{listItem}</Text>
    </TouchableOpacity>
  )
}

const numberOfListItem = (listItems: string[]) => {
  return listItems.map((item, key) => renderList(item, key))
}

const sidebarItem = (prop: { title: string; categories: string[] }) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{prop.title}</Text>
      </View>
      {numberOfListItem(prop.categories)}
    </View>
  )
}

export default sidebarItem

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.inactive
  },
  title: {
    marginLeft: '2%',
    color: color.label,
    marginVertical: '2%'
  },
  categoryWrapper: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  category: {
    marginLeft: '4%',
    backgroundColor: 'transparent',
    color: color.modal,
    marginVertical: '5%'
  }
})
