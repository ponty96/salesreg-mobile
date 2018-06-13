import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { color } from '../Style/Color'

const renderList = (listItem: string, unique: number) => {
  console.log(unique)
  return (
    <TouchableOpacity style={styles.categoryWrapper} key={unique}>
      <Text style={styles.category}>{listItem}</Text>
    </TouchableOpacity>
  )
}

const numberOfListItem = (listItems: string[]) => {
  return listItems.map((item, key) => renderList(item, key))
}

const sidebarItem = (prop: { title: string }) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{prop.title}</Text>
      </View>
      {numberOfListItem(['Home', 'Products & Services', 'Employees'])}
    </View>
  )
}

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
