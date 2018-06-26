import * as React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { color } from '../Style/Color'

interface Category {
  title: string
  routeName: string
}

const sideBarItemAtom = (prop: {
  title: string
  categories: Category[]
  navigate: any
}) => {
  return (
    <View>
      <View style={styles.listHeader}>
        <Text style={styles.title}>{prop.title}</Text>
      </View>
      {prop.categories.map((category: Category, key: number) => {
        return (
          <TouchableOpacity
            style={styles.categoryWrapper}
            key={key}
            onPress={() => prop.navigate(category.routeName)}
          >
            <Text style={styles.category}>{category.title}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default sideBarItemAtom

const styles = StyleSheet.create({
  listHeader: {
    backgroundColor: color.dropdown,
    opacity: 0.2
  },
  title: {
    marginLeft: 32,
    color: color.subHeader,
    marginVertical: 2
  },
  categoryWrapper: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.3,
    borderBottomColor: color.listBorderColor,
    paddingVertical: 8,
    opacity: 0.8
  },
  category: {
    marginLeft: 32,
    backgroundColor: 'transparent',
    color: color.modal,
    marginVertical: 8
  }
})
