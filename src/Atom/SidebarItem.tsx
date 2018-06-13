import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { color } from '../Style/Color'

const sidebarItem = (prop: {
  title: string
  categories: string[]
  onPress: any
}) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{prop.title}</Text>
      </View>
      {prop.categories.map((item: string, key: number) => {
        return (
          <TouchableOpacity
            style={styles.categoryWrapper}
            key={key}
            onPress={prop.onPress}
          >
            <Text style={styles.category}>{item}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default sidebarItem

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.inactive
  },
  title: {
    marginLeft: '6%',
    color: color.subHeader,
    marginVertical: '2%'
  },
  categoryWrapper: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  category: {
    marginLeft: '6%',
    backgroundColor: 'transparent',
    color: color.modal,
    marginVertical: '5%'
  }
})
