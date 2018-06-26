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
        <Text style={[styles.title, { fontFamily: 'SourceSansPro' }]}>
          {prop.title}
        </Text>
      </View>
      {prop.categories.map((category: Category, key: number) => {
        return (
          <TouchableOpacity
            style={styles.categoryWrapper}
            key={key}
            onPress={() => prop.navigate(category.routeName)}
          >
            <Text style={[styles.category, { fontFamily: 'SourceSansPro' }]}>
              {category.title}
            </Text>
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
    color: color.secondary,
    marginVertical: 2,
    fontSize: 14
  },
  categoryWrapper: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    borderBottomWidth: 0.3,
    borderBottomColor: color.listBorderColor
  },
  category: {
    marginLeft: 32,
    backgroundColor: 'transparent',
    color: color.secondary,
    marginVertical: 8,
    fontSize: 14
  }
})
